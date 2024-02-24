import express, { Request, Response } from "express";
import cinema from "./cinema";
import movies from "./movies";
import user from "./user";
import admin from "./admin";

const router = express.Router();

// * Generic
router.get("/", (req: Request<{}, {}, {}>, res: Response) => {
  res.send({
    message: "Welcome to cinema API",
  });
});

// * Cinema

router.post("/cinemas", cinema.addCinema);
router.put("/cinemas/:id", cinema.updateCinema);
router.delete("/cinemas/:id", cinema.deleteCinema);

// * Admin

router.post("/cinemas/:cinemaId/admins", admin.registerAdmin);
router.get("/cinemas/:cinemaId/admins/:userId", admin.getAdminData);
router.put("/cinemas/:cinemaId/admins/:userId", admin.updateAdmin);
router.delete("/cinemas/:cinemaId/admins/:userId", admin.deleteAdmin)

// * Movies

router.get("/cinemas/:idCinema/movies", movies.getAllMovies);
router.post("/cinemas/:idCinema/movies", movies.addMovie);
router.post("cinemas/:idCinema/movies/picture", movies.addPicture);
router.put("/cinemas/:idCinema/movies/:idMovie", movies.updateMovie);
router.delete("/cinemas/:idCinema/movies/:idMovie", movies.deleteMovie);

// * User

router.post("/users", user.registerUser);
router.put("/users/:id", user.updateUser);
router.delete("/users/:id", user.deleteUser);

export default router;
