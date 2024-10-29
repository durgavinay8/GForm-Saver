import express from "express";
import { handleLogin } from "../controllers/authController.js";
import { handleRefreshToken } from "../controllers/refreshTokenController.js";
import { handleLogout } from "../controllers/logoutController.js";
import { validateAccessToken } from "../middlewares/jwtHandler.js";

const router = express.Router();

router.post("/callback", handleLogin);
router.get("/refresh", handleRefreshToken);
router.delete("/logout", validateAccessToken, handleLogout);

export default router;
