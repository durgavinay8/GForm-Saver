import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import CustomError from "../utils/CustomError.js";
import {
  getAccessToken,
  getRefreshToken,
  refreshGoogleTokens,
  getModifiedGoogleToken,
} from "../services/authServices.js";
import jwt, { decode } from "jsonwebtoken";
import { mongoose } from "mongoose";

//@desc Refreshes the access token
//@route GET '/api/oauth/refresh'
//@access public
export const handleRefreshToken = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken)
    return next(new CustomError("No refresh token in cookies", 401));

  const refreshToken = cookies.refreshToken;
  const googleAccessToken = cookies.googleAccessToken;
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.clearCookie("googleAccessToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  let decodedToken,
    isExpired = false;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        if (err.name !== "TokenExpiredError")
          return next(new CustomError("Invalid Refresh Token!", 401));

        isExpired = true;
        decodedToken = jwt.decode(refreshToken);
      } else {
        decodedToken = decoded;
      }
    }
  );
  const foundUser = await User.findOne({
    _id: new mongoose.Types.ObjectId(decodedToken.userId),
  }).select("-filledForms");
  if (!foundUser) return next(new CustomError("User not found!", 404));

  if (!foundUser.myRefreshTokens.includes(refreshToken)) {
    /*User found but the given refresh token is not present in the database
    Detected refresh token reuse*/
    foundUser.myRefreshTokens = [];
    await foundUser.save();
    return next(new CustomError("Refresh token reuse detected!", 401));
  }
  const newRefreshTokenArray = foundUser.myRefreshTokens.filter(
    (rt) => rt !== refreshToken
  ); //Creating a new array of refresh tokens removing the received one
  foundUser.myRefreshTokens = [...newRefreshTokenArray];
  await foundUser.save();

  if (isExpired)
    return next(new CustomError("Server's refresh token expired!", 401));

  //Refresh token is still valid
  //Refresh the google's access token
  const refreshedGoogleToken = await refreshGoogleTokens(
    googleAccessToken,
    foundUser.googleRefreshToken,
    decodedToken.userId
  );
  if (refreshedGoogleToken === "refreshTokenExpired")
    return next(new CustomError("Google's refresh token expired!", 401));

  const modifiedGoogleToken = getModifiedGoogleToken(
    refreshedGoogleToken,
    decodedToken.userId
  );

  const myAccessToken = getAccessToken({
    userId: foundUser._id,
    email: foundUser.email,
  });
  const myRefreshToken = getRefreshToken({
    userId: foundUser._id,
    email: decodedToken.email,
  });

  foundUser.myRefreshTokens.push(myRefreshToken);
  await foundUser.save();

  res.cookie("refreshToken", myRefreshToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "None",
    secure: true,
  });
  res.cookie("googleAccessToken", modifiedGoogleToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
    sameSite: "None",
    secure: true,
  });

  return res.status(200).send(
    JSON.stringify({
      accessToken: myAccessToken,
      name: foundUser.name,
      email: foundUser.email,
      profileUrl: foundUser.profileUrl,
      googleAccessToken: refreshedGoogleToken,
    })
  );
});
