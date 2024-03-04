import express from "express";
import { API_VERSION } from "../../config";
import movieController from "./movieController";
import { checkAdminExistence } from "../../middleware/isUserAdmin";

const router = express.Router();

router.post(
  `/${API_VERSION}/movies`,
  checkAdminExistence,
  movieController.registerMovie
);
router.post(
  `/${API_VERSION}/movies/picture`,
  checkAdminExistence,
  movieController.addPicture
);
router.put(
  `/${API_VERSION}/movies/:idMovie`,
  // checkAdminExistence,
  movieController.updateMovie
);
router.delete(
  `/${API_VERSION}/movies/:idMovie`,
  checkAdminExistence,
  movieController.deleteMovie
);
router.get(`/${API_VERSION}/movies`, movieController.getAllMovies);
router.post(`/${API_VERSION}/movies/logs`, movieController.saveUpdatesMovie);
router.post(`/${API_VERSION}/movies/like`, movieController.likeMovie);

export default router;
