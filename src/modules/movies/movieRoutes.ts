import express from "express";
import { API_VERSION } from "../../config";
import movieController from "./movieController";

const router = express.Router();

router.post(`/${API_VERSION}/movies`, movieController.registerMovie);
router.post(`/${API_VERSION}/movies/picture`, movieController.addPicture);

export default router;
