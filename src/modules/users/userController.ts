import { type Request, type Response } from "express";
import { type UserI, userSchema } from "./userModel";
import { getUserDataDB, registerUserToDB } from "./userDataAccess";

const userController = {
  registerUser: async (req: Request<{}, {}, UserI>, res: Response) => {
    try {
      const data = req.body;
      await userSchema.validate(data);

      const result = await registerUserToDB(data);
      return res.send({
        message: "User added successfully",
        user: {
          name: result.name,
          email: result.email,
          role: result.role,
        },
      });
    } catch (error) {
      res.status(404).send({
        message: (error as Error).message,
      });
    }
  },
  getUserData: async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    try {
      const result = await getUserDataDB(req.params.id);
      return res.send({
        user: {
          id: result.id,
          name: result.name,
          email: result.email,
          role: result.role,
        },
      });
    } catch (error) {
      res.status(404).send({
        message: (error as Error).message,
      });
    }
  },
};

export default userController;
