import { Request, Response } from "express";
import { MovieI } from "../models/movie.model";
import { addMovieDB, deleteMovieDB, editMovieDB, getAllMoviesFromDB } from "../controllers/movieController";

const movies = {
  getAllMovies: async(req: Request<{idCinema: string}, {},MovieI>, res: Response) => {
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
  addPicture: async(req: Request<{}, {},{file: string}>, res: Response) => {
    // if (!req.file) {
    //   res.status(400).send("No file uploaded");
    // }
    // try {
    //   const imageBuffer = req.file.buffer;
    //   const imageName = uuidv4();
    //   const file = storage.file(imageName);
    //   await file.save(imageBuffer, {contentType: "image/jpeg"});
    //   const [url] = await file.getSignedUrl({
    //     action: 'read',
    //     expires: '03-09-2025', // Set an expiration date for the URL
    //   });
    //   res.json({
    //     url,
    //   });
    // } catch (error) {
    //   res.status(400).json({
    //     error,
    //   });
    // }
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