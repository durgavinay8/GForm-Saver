import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import {
  getAccessToken,
  getRefreshToken,
  getModifiedGoogleToken,
} from "../services/authServices.js";
import jwt from "jsonwebtoken";
import { oAuth2Client } from "../config/googleConfig.js";
import CustomError from "../utils/CustomError.js";

//@desc fetches google api tokens and manage them
//@route POST '/api/oauth/callback'
//@access public
export const handleLogin = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;
  if (!req.body.code)
    return next(new CustomError("Missing Authentication code!", 400));
  try {
    const { tokens } = await oAuth2Client.getToken(req.body.code);
  } catch (error) {
    return next(new CustomError("Invalid Authentication code", 400));
  }
  const decodedToken = jwt.decode(tokens.id_token);
  if (!decodedToken.email_verified)
    return next(new CustomError("Email not verified", 403));

  const updatedUser = await User.findOneAndUpdate(
    { googleUserId: decodedToken.sub },
    {
      $set: {
        name: decodedToken.name,
        email: decodedToken.email,
        googleUserId: decodedToken.sub,
        profileUrl: decodedToken.picture,
        googleRefreshToken: tokens.refresh_token,
      },
    },
    { upsert: true, new: true, select: "-filledForms" }
  );

  if (!updatedUser) return next(new CustomError("User update failed!", 500));

  const myAccessToken = getAccessToken({
    userId: updatedUser._id,
    email: decodedToken.email,
  });
  const myNewRefreshToken = getRefreshToken({
    userId: updatedUser._id,
    email: decodedToken.email,
  });
  const myNewRefreshTokenArray = !cookies?.refreshToken
    ? updatedUser.myRefreshTokens
    : updatedUser.myRefreshTokens.filter((rt) => rt !== cookies.refreshToken);
  if (cookies?.refreshToken) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
  }
  updatedUser.myRefreshTokens = [...myNewRefreshTokenArray, myNewRefreshToken];
  await updatedUser.save();

  res.cookie("refreshToken", myNewRefreshToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "None",
    secure: true,
  });
  res.cookie(
    "googleAccessToken",
    getModifiedGoogleToken(tokens.access_token, updatedUser._id),
    {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    }
  );
  return res.status(200).send(
    JSON.stringify({
      accessToken: myAccessToken,
      name: decodedToken.name,
      email: decodedToken.email,
      profileUrl: decodedToken.picture,
      googleAccessToken: tokens.access_token,
    })
  );
});
