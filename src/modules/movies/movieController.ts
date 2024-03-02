import { Request, Response } from "express";
import { FileI, MovieI, movieSchema } from "./movieModel";
import { addMovieDB, uploadMovieImg } from "./movieDataAccess";

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
  addPicture: async(req: Request<{}, {},{file: FileI}>, res: Response) => {
    try {
      const file = req.file;
      if (!file) {
        throw new Error("No file uploaded");
      }
      const result = await uploadMovieImg(file);
      return res.send({
        url: result.url
      });
    } catch (error) {
      res.status(404).send({
        message: (error as Error).message
      })
    }
  },
};

export default movieController;