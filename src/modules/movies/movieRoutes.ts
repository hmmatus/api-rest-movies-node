import express from "express";
import { API_VERSION } from "../../config";
import movieController from "./movieController";

const router = express.Router();

router.post(`/${API_VERSION}/movies`, movieController.registerMovie);
router.post(`/${API_VERSION}/movies/picture`, movieController.addPicture);
router.put(`/${API_VERSION}/movies/:idMovie`, movieController.updateMovie);
router.delete(`/${API_VERSION}/movies/:idMovie`, movieController.deleteMovie);

export default router;
