import { Request, Response } from "express";
import { FileI, MovieI, movieSchema } from "./movieModel";
import {
  addMovieDB,
  deleteMovieDB,
  editMovieDB,
  uploadMovieImg,
} from "./movieDataAccess";

const movieController = {
  registerMovie: async (req: Request<{}, {}, MovieI>, res: Response) => {
    try {
      const data = req.body;
      await movieSchema.validate(data);
      await addMovieDB(data);
      return res.send({
        message: "Movie added successfully",
        data,
      });
    } catch (error) {
      res.status(404).send({
        message: (error as Error).message,
      });
    }
  },
  addPicture: async (req: Request<{}, {}, { file: FileI }>, res: Response) => {
    try {
      const file = req.file;
      if (!file) {
        throw new Error("No file uploaded");
      }
      const result = await uploadMovieImg(file);
      return res.send({
        url: result.url,
      });
    } catch (error) {
      res.status(404).send({
        message: (error as Error).message,
      });
    }
  },
  updateMovie: async (
    req: Request<{ idMovie: string }, {}, Partial<MovieI>>,
    res: Response
  ) => {
    try {
      const data = req.body;
      const { idMovie } = req.params;
      await editMovieDB(idMovie, data);
      res.send({
        message: "Movie updated successfully",
        data,
      });
    } catch (error) {
      res.status(404).send({
        message: (error as Error).message,
      });
    }
  },
  deleteMovie: async (
    req: Request<{ idMovie: string }, {}, {}>,
    res: Response
  ) => {
    try {
      const { idMovie } = req.params;
      await deleteMovieDB(idMovie);
      return res.send({
        message: "Movie deleted successfully",
      });
    } catch (error) {
      res.status(404).send({
        message: (error as Error).message,
      });
    }
  },
};

export default movieController;
