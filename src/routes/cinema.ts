//* POST, GET, PUT, DELETE

import { Request, Response } from "express";
import { CinemaI, DeleteCinemaRequestBody, UpdateCinemaRequestBody } from "../models/cinema.model";
import { deleteCinemaDB, getAllCinemas, registerCinemaDB, updateCinemaDB } from "../controllers/cinemaController";


const cinema = {
  addCinema: async(req: Request<{}, {},CinemaI>, res: Response) => {
    const data = req.body;
    const result = await registerCinemaDB(data);
    if (result?.error) {
      return res.status(400).send({
        error: result.error
      })
    }
    return res.send({
      message: "Cinema added successfully"
    });
  },
  updateCinema: async(req: Request<{id: string}, {},UpdateCinemaRequestBody>, res: Response) => {
    const data = req.body;
    const {id} = req.params;
    const result = await updateCinemaDB(id, data);
    if (result?.error) {
      return res.status(400).send({
        error: result.error
      })
    }
    return res.send({
      message: "Cinema updated successfully"
    });
  },
  deleteCinema: async(req: Request<{id: string}, {},DeleteCinemaRequestBody>, res: Response) => {
    const {id} = req.params;
    const result = await deleteCinemaDB(id);
    if (result?.error) {
      return res.status(400).send({
        error: result.error
      })
    }
    return res.send({
      message: "Cinema deleted successfully"
    });
  },
  getAllCinemas: async(req: Request<{}, {},{}>, res: Response) => {
    const result = await getAllCinemas();
    if (result?.error) {
      return res.status(400).send({
        error: result.error
      })
    }
    return res.send({
      results: result?.results
    });
  },
}

export default cinema;

