import express from "express";
import { API_VERSION } from "../../config";
import adminController from "./adminController";
const router = express.Router();

router.post(`/${API_VERSION}/admins`, adminController.registerAdmin);

export default router;
