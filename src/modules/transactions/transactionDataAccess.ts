import { firestore } from "../../firebase";
import { getMovieById } from "../movies/movieDataAccess";
import { type MovieI } from "../movies/movieModel";
import {
  type DetailTransactionResponse,
  TransactionType,
  type GetTransactionsRequestParams,
  type GetTransactionsResponseParams,
  type TransactionI,
  TransactionStatusEnum,
} from "./transactionModel";
import type firebase from "firebase-admin";

export const saveTransactionToDB = async (
  data: TransactionI,
): Promise<{ data: TransactionI }> => {
  try {
    let formData: TransactionI;
    if (data.type === TransactionType.RENT) {
      formData = {
        ...data,
        expirationDate: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
      };
    } else {
      formData = data;
    }
    const snapshot = await firestore
      .collection("transactions")
      .add({ ...formData, status: TransactionStatusEnum.PENDING });
    await firestore.collection("transactions").doc(snapshot.id).update({
      id: snapshot.id,
    });
    return {
      data: {
        ...data,
        id: snapshot.id,
      },
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getTransactionsByUserId = async (
  data: GetTransactionsRequestParams,
): Promise<GetTransactionsResponseParams> => {
  const { limit, currentPage } = data;
  try {
    const query: firebase.firestore.Query<firebase.firestore.DocumentData> =
      firestore.collection("transactions");
    query.where("idUser", "==", data.idUser);
    const snapshot = await query.get();
    const totalMovies = snapshot.size;

    const totalPages = Math.ceil(totalMovies / limit);
    const currentPageNumber = currentPage;

    const startAt = (currentPageNumber - 1) * limit;
    const querySnapshot = await query.offset(startAt).limit(limit).get();
    const transactions: TransactionI[] = [];
    querySnapshot.docs.forEach((doc) => {
      const transactionData = doc.data();
      const transaction = {
        id: transactionData.id,
        description: transactionData.description,
        idMovie: transactionData.idMovie,
        type: transactionData.type,
        idUser: transactionData.idUser,
        qty: transactionData.qty,
        status: transactionData.status,
      };
      transactions.push(transaction);
    });

    return {
      data: transactions,
      currentPage,
      pages: totalPages,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getTransactionDetailDB = async (
  idTransaction: string,
): Promise<DetailTransactionResponse> => {
  try {
    const snapshotTransaction = await firestore
      .collection("transactions")
      .doc(idTransaction)
      .get();
    if (!snapshotTransaction.exists) {
      throw new Error("Transaction doesn't exists");
    }
    const transactionResult: TransactionI =
      (snapshotTransaction.data() as TransactionI) ?? {};
    const movieResult: MovieI = (await getMovieById(transactionResult?.idMovie))
      .data;
    return {
      id: transactionResult.id ?? "",
      idMovie: movieResult.id,
      title: movieResult.title,
      image: movieResult.image,
      expirationDate: transactionResult?.expirationDate ?? null,
      qty: transactionResult.qty,
      type: transactionResult.type,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// Update a document
export async function updateTransaction(
  docId: string,
  data: Partial<TransactionI>,
): Promise<TransactionI> {
  try {
    const docRef = firestore.collection("transactions").doc(docId);
    await docRef.update({
      ...data,
    });
    const updatedDoc = await docRef.get();
    const updatedData = updatedDoc.data() as TransactionI;
    return updatedData;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
