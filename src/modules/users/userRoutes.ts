import express from "express";
import { API_VERSION } from "../../config";
import userController from "./userController";
import verifyToken from "../../middleware/isAuthenticated";
const router = express.Router();

const BASE_URL = `/${API_VERSION}`;

router.post(`${BASE_URL}/users`, userController.registerUser);
router.get(`${BASE_URL}/users/:id`, verifyToken, userController.getUserData);

export default router;
