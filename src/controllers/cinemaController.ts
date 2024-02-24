import admin from "firebase-admin"
import { CinemaI } from "../models/cinema.model";
import { firestore } from "../firebase/config";
const db = firestore;

export const registerCinemaDB = async (data: CinemaI): Promise<{error?: string} | void> => {
  try {
    await db.collection("cinemas").doc().set(data);
    return;
  } catch (error) {
    console.log("🚀 ~ registerCinemaDB ~ error:", error)
    return {
      error: `${error}`
    }
  }
}

export const updateCinemaDB = async (id:string, data: CinemaI): Promise<{error?: string} | void> => {
  try {
    await db.collection("cinemas").doc(id).update({
      name: data.name,
      description: data.description
    })
    return;
  } catch (error) {
    return {
      error: `${error}`
    }
  }
}

export const deleteCinemaDB = async (id:string): Promise<{error?: string} | void> => {
  try {
    await db.collection("cinemas").doc(id).delete();
    return;
  } catch (error) {
    return {
      error: `${error}`
    }
  }
}