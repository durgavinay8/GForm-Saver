import multer from "multer";
import { constants } from "../constants.js";

export default function errorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  console.error(err);
  let errRes = {
    message: err.message,
  };
  switch (res.statusCode) {
    case constants.BAD_REQUEST:
      errRes.title = "Bad Request";
      break;
    case constants.NOT_FOUND:
      errRes.title = "Not Found";
      break;
    case constants.UNAUTHORIZED:
      errRes.title = "Unauthorzed";
      break;
    case constants.FORBIDDEN:
      errRes.title = "Forbidden";
      break;
    case constants.SERVER_ERROR:
      errRes.title = "Internal Server Error";
      break;
  }
  return res.status(err.statusCode).json(errRes);
}
