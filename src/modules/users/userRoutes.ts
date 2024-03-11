import express from "express";
import { API_VERSION } from "../../config";
import userController from "./userController";
const router = express.Router();

router.post(`/${API_VERSION}/users`, userController.registerUser);

export default router;
