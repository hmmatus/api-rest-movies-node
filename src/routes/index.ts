import express, { Request, Response } from "express";
import cinema from "./cinema";
import movies from "./movies";
import user from "./user";
import admin from "./admin";
import multer from "multer";
import verifyToken from "../middlewares/auth";
import { payments } from "./payments";
const storageMulter = multer.memoryStorage(); // Store image data in memory as a Buffer
const upload = multer({ storage: storageMulter });

const router = express.Router();

// * Generic
router.get("/", (req: Request<{}, {}, {}>, res: Response) => {
  res.send({
    message: "Welcome to cinema API",
  });
});

// * Cinema
router.get("/cinemas", cinema.getAllCinemas);
router.post("/cinemas", cinema.addCinema);
router.put("/cinemas/:id", cinema.updateCinema);
router.delete("/cinemas/:id", cinema.deleteCinema);

// * Admin

// router.post("/cinemas/:idCinema/admins", admin.registerAdmin);
// router.get("/cinemas/:idCinema/admins/:userId", admin.getAdminData);
// router.put("/cinemas/:idCinema/admins/:userId", admin.updateAdmin);
// router.delete("/cinemas/:idCinema/admins/:userId", admin.deleteAdmin)

// * Movies

router.get("/cinemas/:idCinema/movies", movies.getAllMovies);
router.get("/cinemas/:idCinema/movies/:idMovie", movies.getMovieById);
router.post("/cinemas/:idCinema/movies", movies.addMovie);
router.post(
  "/cinemas/movies/picture",
  upload.single("file"),
  movies.addPicture
);
router.put("/cinemas/:idCinema/movies/:idMovie", movies.updateMovie);
router.delete("/cinemas/:idCinema/movies/:idMovie", movies.deleteMovie);

// * Payment & Rent
router.post("/payments", verifyToken, payments.makePayment);

// * User
router.get("/users/:userId", verifyToken, user.getUserData);
router.post("/users", user.registerUser);
router.put("/users/:id", user.updateUser);
router.delete("/users/:id", user.deleteUser);
// router.post("/users/login", user.loginUser);

export default router;
