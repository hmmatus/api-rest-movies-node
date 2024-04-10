import { type Request, type Response } from "express";
import { type TransactionI } from "./transactionModel";
import {
  getTransactionDetailDB,
  getTransactionsByUserId,
  saveTransactionToDB,
} from "./transactionDataAccess";

export const transactionsController = {
  saveTransaction: async (
    req: Request<{}, {}, { transaction: TransactionI }>,
    res: Response,
  ) => {
    try {
      const result = await saveTransactionToDB(req.body.transaction);
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
      const currentPage = parseInt(req.query.currentPage);
      const limit = parseInt(req.query.limit);
      const result = await getTransactionsByUserId({
        ...req.query,
        currentPage,
        limit,
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
