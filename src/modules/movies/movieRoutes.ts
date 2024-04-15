import express from "express";
import { API_VERSION } from "../../config";
import movieController from "./movieController";
import { checkAdminExistence } from "../../middleware/isUserAdmin";
import multer from "multer";
import verifyToken from "../../middleware/isAuthenticated";

const storageMulter = multer.memoryStorage(); // Store image data in memory as a Buffer
const upload = multer({ storage: storageMulter });
const router = express.Router();

router.post(
  `/${API_VERSION}/movies`,
  checkAdminExistence,
  movieController.registerMovie,
);
router.post(
  `/${API_VERSION}/movies/picture`,
  [checkAdminExistence, upload.single("file")],
  movieController.addPicture,
);
router.put(
  `/${API_VERSION}/movies/:idMovie`,
  // checkAdminExistence,
  movieController.updateMovie,
);
router.delete(
  `/${API_VERSION}/movies/:idMovie`,
  checkAdminExistence,
  movieController.deleteMovie,
);
router.get(`/${API_VERSION}/movies`, movieController.getAllMovies);
router.post(`/${API_VERSION}/movies/logs`, movieController.saveUpdatesMovie);
router.post(
  `/${API_VERSION}/movies/like`,
  verifyToken,
  movieController.likeMovie,
);
router.post(
  `/${API_VERSION}/movies/dislike`,
  verifyToken,
  movieController.dislikeMovie,
);
export default router;
