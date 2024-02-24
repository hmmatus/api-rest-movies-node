import { Request, Response } from "express";
import { UserI } from "../models/user.model";
import {
  getUserDataFromDB,
  registerCustomerToDB,
  updateUserDataFromDb,
} from "../controllers/userController";

const user = {
  registerUser: async (req: Request<{}, {}, UserI>, res: Response) => {
    const data = req.body;
    const result = await registerCustomerToDB(data);
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
  getUserData: async (
    req: Request<{  userId: string }, {}, UserI>,
    res: Response
  ) => {
    const { userId } = req.params;
    const result = await getUserDataFromDB(userId);
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
  updateUser: async (
    req: Request<{ userId: string }, {}, {user: UserI}>,
    res: Response
  ) => {
    const { userId } = req.params;
    const {user} = req.body;
    const result = await updateUserDataFromDb(userId, user);
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
  deleteUser: async (req: Request<{}, {}, UserI>, res: Response) => {

  },
};

export default user;
