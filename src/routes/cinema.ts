//* POST, GET, PUT, DELETE

import { Request, Response } from "express";
import { CinemaI, UpdateCinemaRequestBody } from "../models/cinema.model";


const cinema = {
  addCinema: async(req: Request<{}, {},CinemaI>, res: Response) => {
    
  },
  updateCinema: async(req: Request<{}, {},UpdateCinemaRequestBody>, res: Response) => {
    
  },
  deleteCinema: async(req: Request<{}, {},UpdateCinemaRequestBody>, res: Response) => {
    
  }
}

export default cinema;

