import { type Request, type Response } from "express";
import { getAllPenalizations } from "./penalizationsDataAcess";
export const penalizationController = {
  getALlPenalizations: async (req: Request, res: Response) => {
    try {
      const result = await getAllPenalizations();
      return res.json(result);
    } catch (error) {
      return res.status(400).json({
        message: (error as Error).message,
      });
    }
  },
};
