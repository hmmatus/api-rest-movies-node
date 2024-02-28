import e from "express";
import { firestore } from "../firebase/config";
import { PaymentI } from "../models/payment.model";
const db = firestore;

export const makePaymentCinemaToDB = async (
  data: PaymentI
): Promise<{ error?: string; data?: PaymentI }> => {
  try {
    const snapshot = await db
      .collection("cinemas")
      .doc(data.idCinema)
      .collection("movies")
      .doc(data.idMovie)
      .get();
    const snapshotData = snapshot.data();
    if (!snapshotData) {
      throw new Error("file doesn't exist");
    }
    if (snapshotData.stock <= 0) {
      throw new Error("Movie doesn't have stock");
    }
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
    await db
      .collection("cinemas")
      .doc(data.idCinema)
      .collection("movies")
      .doc(data.idMovie)
      .update({
        stock: snapshotData.stock - 1,
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
