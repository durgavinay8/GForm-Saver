import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const getGoogleRefreshTokenById = asyncHandler(async (userId) => {
  const user = await User.findOne({ _id: userId }, { googleRefreshToken: 1 });
  if (!user) return next(new CustomError("User not found!", 404));
  return user.googleRefreshToken;
});
