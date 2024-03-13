import { type Request, type Response } from "express";
import {
  type FileI,
  type MovieI,
  movieSchema,
  type MovieOrderEnum,
} from "./movieModel";
import {
  addMovieDB,
  deleteMovieDB,
  editMovieDB,
  getAllMoviesFromDB,
  likeMovieDB,
  saveUpdatesMovie,
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
      if (file == null) {
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
    res: Response,
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
    res: Response,
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
  getAllMovies: async (
    req: Request<
      {},
      {},
      {},
      {
        orderBy?: MovieOrderEnum;
        onlyAvailable?: boolean;
        searchValue?: string;
        limit: string;
        currentPage: string;
      }
    >,
    res: Response,
  ) => {
    try {
      const currentPage = parseInt(req.query.currentPage);
      const limit = parseInt(req.query.limit);
      const result = await getAllMoviesFromDB({
        ...req.query,
        limit,
        currentPage,
      });
      res.send({
        data: result.data,
        currentPage: result.currentPage,
        pages: result.pages,
      });
    } catch (error) {
      res.status(400).send({
        error: (error as Error).message,
      });
    }
  },
  saveUpdatesMovie: async (
    req: Request<
      {},
      {},
      {
        data: {
          movieId: string;
          title?: string;
          rentAmount?: number;
          saleAmount?: number;
          userId: string;
        };
      }
    >,
    res: Response,
  ) => {
    try {
      const { data } = req.body;
      await saveUpdatesMovie(data);
      res.send({
        message: "Updates saved correctly",
      });
    } catch (error) {
      res.status(400).send({
        error: (error as Error).message,
      });
    }
  },
  likeMovie: async (
    req: Request<{}, {}, { userId: string; movieId: string }>,
    res: Response,
  ) => {
    try {
      await likeMovieDB(req.body.movieId, req.body.movieId);
      res.send({
        message: "Liked movie",
      });
    } catch (error) {
      res.status(400).send({
        error: (error as Error).message,
      });
    }
  },
};

export default movieController;
