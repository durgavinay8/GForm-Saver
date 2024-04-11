import { oAuth2Client } from "../config/googleConfig.js";
import CustomError from "../utils/CustomError.js";
import { deModifyGoogleToken } from "../services/authServices.js";
import { getGoogleRefreshTokenById } from "../services/dbHelper.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const validateAccessToken = (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader?.startsWith("Bearer")) {
    const accessToken = authHeader.split(" ")[1];
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return next(new CustomError("Invalid Access Token!", 401));
      req.userId = decoded.userId;
    });
    return next();
  }
  return next(new CustomError("Missing Access Token!", 400));
};

export const checkGoogleAccessToken = asyncHandler(async (req, res, next) => {
  let googleAccessToken =
    req.cookies?.googleAccessToken || req.headers.googleaccesstoken;
  if (typeof googleAccessToken === "undefined" || !googleAccessToken)
    return next(new CustomError("Missing Google's Access Token!", 400));
  googleAccessToken = deModifyGoogleToken(googleAccessToken, req.userId);
  if (googleAccessToken === "error")
    return next(new CustomError("Forbidden!", 401));
  oAuth2Client.setCredentials({
    refresh_token: await getGoogleRefreshTokenById(req.userId),
    access_token: googleAccessToken || "",
  });
  /*
  const isTokenExpired = oAuth2Client.isTokenExpiring(googleAccessToken);
  console.log("isTokenExpired: ", isTokenExpired);
  if (isTokenExpired)
    return next(new CustomError("Expired Google's Access Token!", 400));
  */
  const { token } = await oAuth2Client.getAccessToken();
  req.googleAccessToken = token;
  next();
});
