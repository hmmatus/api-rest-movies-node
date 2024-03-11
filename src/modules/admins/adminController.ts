import { type Request, type Response } from "express";
import { type AdminI, adminSchema } from "./adminModel";
import { registerAdminToDB } from "./adminDataAccess";

const adminController = {
  registerAdmin: async (
    req: Request<{ idCinema: string }, {}, AdminI>,
    res: Response,
  ) => {
    try {
      const data = req.body;
      await adminSchema.validate(data);

      const result = await registerAdminToDB(data);
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

export default adminController;
