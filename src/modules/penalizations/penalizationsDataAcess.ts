import { firestore } from "../../firebase";
import {
  TransactionType,
  type TransactionI,
} from "../transactions/transactionModel";
import {
  PenalizationReasonEnum,
  PenalizationStatusEnum,
  type PenalizationI,
} from "./penalizationModel";

// Create a document
export async function addPenalizationDB(
  data: PenalizationI,
): Promise<PenalizationI> {
  try {
    await firestore.collection("penalizations").add(data);
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

// Read all documents

export async function getAllPenalizations(): Promise<{
  data: PenalizationI[];
}> {
  try {
    const snapshot = await firestore.collection("penalizations").get();
    const data: PenalizationI[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PenalizationI[];
    return {
      data,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

// Read a document
export async function getPenalizationByUser(
  idUser: string,
): Promise<{ data: PenalizationI[] }> {
  try {
    const docRef = firestore.collection("penalizations").doc(idUser);
    const doc = await docRef.get();
    const data: PenalizationI[] = doc.data() as PenalizationI[];
    return {
      data,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

// Update a document
export async function updatePenalization(
  docId: string,
  data: PenalizationI,
): Promise<PenalizationI> {
  try {
    const docRef = firestore.collection("penalizations").doc(docId);
    await docRef.update({
      ...data,
    });
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function checkTransactionsExpired(): Promise<void> {
  try {
    const snapshot = await firestore
      .collection("transactions")
      .where("type", "==", TransactionType.RENT)
      .where("expirationData", "<", new Date())
      .get();
    snapshot.forEach(async (doc) => {
      const rental = doc.data() as TransactionI;
      const penalization = {
        idUser: rental.idUser,
        idMovie: rental.idMovie,
        status: PenalizationStatusEnum.PENDING,
        reason: PenalizationReasonEnum.LATE_RETURN,
        idTransaction: rental?.id,
        amount: 10,
      };
      await addPenalizationDB(penalization);
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
