import { Request, Response } from "express";
import {
  UserAdminI,
  UserCustomerI,
  UserI,
  UserRoleI,
} from "../models/user.model";
import {
  deleteUserFromDb,
  getUserDataFromDB,
  registerCustomerToDB,
  updateUserDataFromDb,
} from "../controllers/userController";

const user = {
  registerUser: async (
    req: Request<{}, {}, UserCustomerI | UserAdminI>,
    res: Response
  ) => {
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
    req: Request<{ userId: string }, {}, UserI>,
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
    req: Request<{ userId: string }, {}, { user: UserI }>,
    res: Response
  ) => {
    const { userId } = req.params;
    const { user } = req.body;
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
  deleteUser: async (
    req: Request<{ userId: string }, {}, UserI>,
    res: Response
  ) => {
    const { userId } = req.params;
    const result = await deleteUserFromDb(userId);
    if (result?.error) {
      return res.status(400).send({
        error: result.error,
      });
    }
    return res.send({
      message: "User deleted successfully",
    });
  },
  // loginUser: async (req: Request<{}, {}, {email: string, password: string}>, res: Response) => {
  //   const {email, password} = req.body;
  //   const result = await loginUserFromDb(email, password);
  //   if (result?.error) {
  //     return res.status(400).send({
  //       error: result.error,
  //     });
  //   }
  //   return res.send({
  //     jwt:result.jwt,
  //   });
  // },
};

export default user;
