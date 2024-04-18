import { type Request, type Response } from "express";
import { type TransactionI } from "./transactionModel";
import {
  getTransactionDetailDB,
  getTransactionsByUserId,
  saveTransactionToDB,
} from "./transactionDataAccess";
import { getUserId } from "../../firebase/utils/getUserId";

export const transactionsController = {
  saveTransaction: async (
    req: Request<{}, {}, TransactionI>,
    res: Response,
  ) => {
    try {
      const result = await saveTransactionToDB(req.body);
      return res.json({
        ...result,
      });
    } catch (error) {
      return res.status(400).json({
        message: (error as Error).message,
      });
    }
  },
  getTransactionsByUserId: async (
    req: Request<
      {},
      {},
      {},
      { currentPage: string; idUser: string; limit: string }
    >,
    res: Response,
  ) => {
    try {
      if (
        req.headers.authorization === null ||
        req.headers.authorization === undefined
      ) {
        throw new Error("User must be logged in");
      }
      const userId = await getUserId(req.headers.authorization);
      const currentPage = parseInt(req.query.currentPage);
      const limit = parseInt(req.query.limit);
      const result = await getTransactionsByUserId({
        ...req.query,
        currentPage,
        limit,
        idUser: userId ?? "",
      });
      return res.json({
        ...result,
      });
    } catch (error) {
      return res.status(400).json({
        message: (error as Error).message,
      });
    }
  },
  getTransactionDetail: async (
    req: Request<{}, {}, {}, { idTransaction: string }>,
    res: Response,
  ) => {
    try {
      const result = await getTransactionDetailDB(req.query.idTransaction);
      return res.json({
        ...result,
      });
    } catch (error) {
      return res.status(400).json({
        message: (error as Error).message,
      });
    }
  },
};
