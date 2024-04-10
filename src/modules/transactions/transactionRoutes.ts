import express from "express";
import { API_VERSION } from "../../config";

import verifyToken from "../../middleware/isAuthenticated";
import { transactionsController } from "./transactionController";
const router = express.Router();

const BASE_URL = `/${API_VERSION}`;

router.post(
  `${BASE_URL}/transactions`,
  verifyToken,
  transactionsController.saveTransaction,
);
router.get(
  `${BASE_URL}/transactions`,
  verifyToken,
  transactionsController.getTransactionsByUserId,
);
router.get(
  `${BASE_URL}/transactions/detail`,
  verifyToken,
  transactionsController.getTransactionDetail,
);

export default router;
