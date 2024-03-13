import express from "express";
import { API_VERSION } from "../../config";
import adminController from "./adminController";
import verifyToken from "../../middleware/isAuthenticated";
const router = express.Router();

router.post(`/${API_VERSION}/admins`, adminController.registerAdmin);
router.get(
  `/${API_VERSION}/admins/:id`,
  verifyToken,
  adminController.getUserData,
);

export default router;
