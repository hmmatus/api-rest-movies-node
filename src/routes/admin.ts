import {
  deleteAdminFromDb,
  getAdminDataFromDb,
  registerAdminToDB,
  updateAdminDataFromDb,
} from "../controllers/adminController";
import { UserI } from "../models/user.model";
import { Request, Response } from "express";

const admin = {
  registerAdmin: async (
    req: Request<{ idCinema: string }, {}, UserI>,
    res: Response
  ) => {
    const data = req.body;
    const { idCinema } = req.params;
    const result = await registerAdminToDB(idCinema, data);
    if (result?.error) {
      return res.status(400).send({
        error: result.error,
      });
    }
    return res.send({
      message: "User added successfully",
      user: {
        name: data.name,
        email: data.email,
        role: data.role,
      },
    });
  },
  getAdminData: async (
    req: Request<{ idCinema: string; userId: string }, {}, UserI>,
    res: Response
  ) => {
    const { userId, idCinema } = req.params;
    const result = await getAdminDataFromDb(idCinema, userId);
    if (result?.error) {
      return res.status(400).send({
        error: result.error,
      });
    }
    const { user } = result;
    return res.send({
      user,
    });
  },
  updateAdmin: async (
    req: Request<{ idCinema: string; userId: string }, {}, {user: UserI}>,
    res: Response
  ) => {
    const { userId, idCinema } = req.params;
    const {user} = req.body;
    const result = await updateAdminDataFromDb(idCinema, userId, user);
    if (result?.error) {
      return res.status(400).send({
        error: result.error,
      });
    }
    return res.send({
      message: "User updated successfully",
      user,
    });
  },
  deleteAdmin: async (
    req: Request<{ idCinema: string; userId: string }, {}, {}>,
    res: Response
  ) => {
    const { userId, idCinema } = req.params;
    const result = await deleteAdminFromDb(idCinema, userId);
    if (result?.error) {
      return res.status(400).send({
        error: result.error,
      });
    }
    return res.send({
      message: "User deleted successfully",
    });
  },
};

export default admin;
