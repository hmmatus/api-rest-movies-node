import { Request, Response } from "express";
import { UserI, userSchema } from "./userModel";
import { registerUserToDB } from "./userDataAccess";

const userController = {
  registerUser: async (
    req: Request<{ idCinema: string }, {}, UserI>,
    res: Response
  ) => {
    try {
      const data = req.body;
      userSchema.validate(data);

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
};

export default userController;
