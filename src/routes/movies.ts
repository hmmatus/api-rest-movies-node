import { Request, Response } from "express";
import { MovieI } from "../models/movie.model";

const movies = {
  getAllMovies: async(req: Request<{}, {},MovieI>, res: Response) => {
    
  },
  addMovie: async(req: Request<{}, {},MovieI>, res: Response) => {
    
  },
  addPicture: async(req: Request<{}, {},{file: string}>, res: Response) => {
    
  },
  updateMovie: async(req: Request<{}, {},MovieI>, res: Response) => {
    
  },
  deleteMovie: async(req: Request<{}, {},MovieI>, res: Response) => {
    
  },
}
export default movies; 