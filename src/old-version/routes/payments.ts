import { Request, Response } from "express";
import { makePaymentCinemaToDB } from "../controllers/paymentsController";
import { PaymentI } from "../models/payment.model";
export const payments = {
  makePayment: async (
    req: Request<{}, {}, { data: PaymentI }>,
    res: Response
  ) => {
    const { data } = req.body;
    const result = await makePaymentCinemaToDB(data);

    if (result?.error) {
      return res.status(400).send({
        error: result.error,
      });
    }
    return res.send({
      message: "Payment made successfully",
      data: result.data
    });
  },
};
