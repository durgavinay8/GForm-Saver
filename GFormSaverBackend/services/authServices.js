import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { oAuth2Client } from "../config/googleConfig.js";

export const getAccessToken = (payload) =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

export const getRefreshToken = (payload) =>
  jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });

export const refreshGoogleTokens = asyncHandler(
  async (accessToken, refreshToken, userId) => {
    try {
      if (accessToken) {
        const decoded = jwt.verify(
          accessToken,
          process.env.GOOGLE_TOKEN_SECRET
        );
        if (decoded.userId != userId) {
          return "refreshTokenExpired"; //TODO: Not apt for userId match fail
        }
        accessToken = decoded.accessToken;
      }
      oAuth2Client.setCredentials({
        refresh_token: refreshToken,
        access_token: accessToken || "",
      });
      const { token } = await oAuth2Client.getAccessToken();
      return token;
    } catch (error) {
      console.error("Error refreshing google access token: ", error);
      return "refreshTokenExpired";
    }
  }
);

export const getModifiedGoogleToken = (accessToken, userId) =>
  jwt.sign(
    {
      accessToken,
      userId,
    },
    process.env.GOOGLE_TOKEN_SECRET
  );

export const deModifyGoogleToken = (accessToken, userId) => {
  try {
    const decoded = jwt.verify(accessToken, process.env.GOOGLE_TOKEN_SECRET);
    return decoded.userId != userId ? "error" : decoded.accessToken;
  } catch (error) {
    return "error";
  }
};
