import express from "express";
import {
  createFilledForm,
  getAllFilledForms,
  updateFilledForm,
  deleteFilledForm,
} from "../controllers/formMetadataController.js";
const router = express.Router();

router
  .get("/", getAllFilledForms)
  .post("/", createFilledForm)
  .put("/", updateFilledForm)
  .delete("/", deleteFilledForm);

export default router;
