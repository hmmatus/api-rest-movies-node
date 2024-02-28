import { firestore } from "../firebase/config";
import { PaymentI } from "../models/payment.model";
const db = firestore;

export const makePaymentCinemaToDB = async (
  data: PaymentI
): Promise<{ error?: string; data?: PaymentI }> => {
  try {
    const result = await db
      .collection("cinemas")
      .doc(data.idCinema)
      .collection("logs")
      .add(data);
    await db
      .collection("cinemas")
      .doc(data.idCinema)
      .collection("logs")
      .doc(result.id)
      .update({
        id: result.id,
      });
    return {
      data,
    };
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
};
