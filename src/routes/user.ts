import { Request, Response } from "express";
import { UserI } from "../models/user.model";

const user = {
  registerUser: async(req: Request<{}, {},UserI>, res: Response) => {
    
  },
  updateUser: async(req: Request<{}, {},UserI>, res: Response) => {
    
  },
  deleteUser: async(req: Request<{}, {},UserI>, res: Response) => {
    
  }
}

export default user;