import express from "express";
import ServerlessHttp from "serverless-http";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";
import connectDb from "./config/dbConnection.js";
import formMetadataRoutes from "./routes/formMetadataRoutes.js";
import formPdfRoutes from "./routes/formPdfRoutes.js";
import { validateAccessToken } from "./middlewares/jwtHandler.js";
import CustomError from "./utils/CustomError.js";
import authRoutes from "./routes/authRoutes.js";
import { corsOptions } from "./config/corsOptions.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(connectDb);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/oauth", authRoutes);
app.use(validateAccessToken);
app.use("/api/form-metadata", formMetadataRoutes);
app.use("/api/form-pdf", formPdfRoutes);

app.all("*", (req, res, next) => {
  return next(new CustomError("Can't find the URL on the server!", 500));
});

app.use(errorHandler);

export const handler = ServerlessHttp(app);