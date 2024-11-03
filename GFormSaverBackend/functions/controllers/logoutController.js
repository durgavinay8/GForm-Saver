import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const handleLogout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.refreshToken)
    return res.status(204).json({
      message: "No refresh token in cookies!",
    });
  const refreshToken = cookies.refreshToken;
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
  let userId,
    isExpired = false;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        if (err.name !== "TokenExpiredError") {
          return res.status(204).json({
            message: "Invalid Refresh Token!",
          });
        }
        isExpired = true;
        userId = jwt.decode(refreshToken).userId;
      } else {
        userId = decoded.userId;
      }
    }
  );
  const foundUser = await User.findOne({
    _id: new mongoose.Types.ObjectId(userId),
  });
  if (!foundUser) return res.sendStatus(204); //User not found with the decoded userId
  if (foundUser.myRefreshTokens.includes(refreshToken)) {
    foundUser.myRefreshTokens = foundUser.myRefreshTokens.filter(
      (rt) => rt !== refreshToken
    );
    await foundUser.save();
  }
  return res.status(204).json({
    message: "successfully logged out",
  });
});
