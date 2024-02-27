import { Request, Response } from "express";
import { FileI, MovieI } from "../models/movie.model";
import { addMovieDB, deleteMovieDB, editMovieDB, getAllMoviesFromDB, getMovieById, uploadMovieImg } from "../controllers/movieController";

const movies = {
  getAllMovies: async(req: Request<{idCinema: string}, {},{}>, res: Response) => {
    const data = req.body;
    const {idCinema} = req.params;
    const result = await getAllMoviesFromDB(idCinema);
    if (result?.error) {
      return res.status(400).send({
        error: result.error
      })
    }
    return res.send({
      data: result.data
    });
  },
  getMovieById: async(req: Request<{idCinema: string, idMovie: string}, {},{}>, res: Response) => {
    const {idCinema, idMovie} = req.params;
    const result = await getMovieById(idCinema, idMovie);
    if (result?.error) {
      return res.status(400).send({
        error: result.error
      })
    }
    return res.send({
      data: result.data
    });
  },
  addMovie: async(req: Request<{idCinema: string}, {},MovieI>, res: Response) => {
    const data = req.body;
    const {idCinema} = req.params;
    console.log(req.params);
    const result = await addMovieDB(idCinema,data);
    if (result?.error) {
      return res.status(400).send({
        error: result.error
      })
    }
    return res.send({
      message: "Movie added successfully",
      data
    });
  },
  addPicture: async(req: Request<{}, {},{file: FileI}>, res: Response) => {
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded");
    }
    const result = await uploadMovieImg(file);
    if (result?.error) {
      return res.status(400).send({
        error: result.error
      })
    }
    return res.send({
      url: result.url
    });
  },
  updateMovie: async(req: Request<{idCinema: string, idMovie: string}, {},MovieI>, res: Response) => {
    const data = req.body;
    const {idCinema, idMovie} = req.params;
    const result = await editMovieDB(idCinema, idMovie, data);
    if (result?.error) {
      return res.status(400).send({
        error: result.error
      })
    }
    return res.send({
      message: "Movie updated successfully",
      data
    });
  },
  deleteMovie: async(req: Request<{idCinema: string, idMovie: string}, {},{}>, res: Response) => {
    const {idCinema, idMovie} = req.params;
    const result = await deleteMovieDB(idCinema, idMovie);
    if (result?.error) {
      return res.status(400).send({
        error: result.error
      })
    }
    return res.send({
      message: "Movie deleted successfully",
    });
  },
}
export default movies; 