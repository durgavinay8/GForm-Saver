import asyncHandler from "express-async-handler";
import CustomError from "../utils/CustomError.js";
import stream from "stream";
import { google } from "googleapis";
import { oAuth2Client } from "../config/googleConfig.js";
import { getGoogleRefreshTokenById } from "../services/dbHelper.js";

//@desc Upload new PDF
//@route POST '/api/form-pdf'
//@access private
export const uploadPdf = asyncHandler(async (req, res, next) => {
  if (!req.file) return next(new CustomError("Missing file to upload!", 400));
  oAuth2Client.setCredentials({
    refresh_token: await getGoogleRefreshTokenById(req.userId),
    access_token: req.googleAccessToken,
  });
  const drive = google.drive({
    version: "v3",
    auth: oAuth2Client,
  });

  const bufferStream = new stream.PassThrough();
  bufferStream.end(req.file.buffer);
  const response = await drive.files.create({
    requestBody: {
      name: req.body.fileName || new Date().toISOString(),
    },
    media: {
      mimeType: "application/pdf",
      body: bufferStream,
    },
  });
  return res.status(204).json({
    message: "Successfully upload the file",
    isSuccess: true,
  });
});
