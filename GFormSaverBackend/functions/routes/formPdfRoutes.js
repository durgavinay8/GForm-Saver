import express from "express";
import { checkGoogleAccessToken } from "../middlewares/jwtHandler.js";
import { uploadPdf } from "../controllers/formPdfController.js";
import multer from "multer";

/*
const fileFilter = (req, file, cb) => {
  if (file.mimeType === "application/pdf") cb(null, "files");
  else {
    console.log("Not a pdf file: ", file.mimeType);
    cb(new CustomError("files other than pdf are not supported!", 400), false);
  }
};
*/
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 1,
    fieldSize: 25 * 1024 * 1024, //25mb
  },
});

const router = express.Router();

router.use(checkGoogleAccessToken);
router.post("/", upload.single("fileData"), uploadPdf);

export default router;

//upload.single("fileData")
