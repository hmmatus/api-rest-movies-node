import { firestore, auth } from "../firebase/config";
import { UserI } from "../models/user.model";
const db = firestore;

export const registerAdminToDB = async (cinemaId: string, data: UserI):Promise<{ error?: string } | void> => {
  try {
    await db.collection("cinemas").doc(cinemaId).collection("admins").doc().set(data);
    return;
  } catch (error) {
    return {
      error: `${error}`
    }
  }
}