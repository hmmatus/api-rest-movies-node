import express, {Request, Response} from "express"
import cinema from "./cinema";
import movies from "./movies";
import user from "./user";

const router = express.Router();

// * Generic
router.get("/", (req: Request<{}, {}, {}>, res: Response) => {
  res.send({
    message: "Welcome to cinema API"
  })
});

// * Cinema

router.post("/cinemas", cinema.addCinema);
router.put("/cinemas/:id",cinema.updateCinema);
router.delete("/cinemas/:id", cinema.deleteCinema);

// * Movies

router.get("/cinemas/:idCinema/movies", movies.getAllMovies);
router.post("/cinemas/:idCinema/movies", movies.addMovie);
router.post("cinemas/:idCinema/movies/picture", movies.addPicture)
router.put("/cinemas/:idCinema/movies/:idMovie", movies.updateMovie);
router.delete("/cinemas/:idCinema/movies/:idMovie", movies.deleteMovie);

// * User

router.post("/users", user.registerUser);
router.put("/users/:id", user.updateUser);
router.delete("/cinemas/:idCinema/movies/:idMovie", user.deleteUser);

export default router;