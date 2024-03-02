import { CinemaI } from "../models/cinema.model";
import { firestore } from "../firebase/config";
const db = firestore;

export const registerCinemaDB = async (
  data: CinemaI
): Promise<{ error?: string } | void> => {
  try {
    const result = await db.collection("cinemas").add(data);
    await db.collection("cinemas").doc(result.id).update({
      id: result.id,
    });
    return;
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
};

export const updateCinemaDB = async (
  id: string,
  data: CinemaI
): Promise<{ error?: string } | void> => {
  try {
    await db.collection("cinemas").doc(id).update({
      name: data.name,
      description: data.description,
    });
    return;
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
};

export const deleteCinemaDB = async (
  id: string
): Promise<{ error?: string } | void> => {
  try {
    await db.collection("cinemas").doc(id).delete();
    return;
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
};

export const getAllCinemas = async (): Promise<{
  error?: string;
  results?: CinemaI[];
} | void> => {
  try {
    const snapshot = await db.collection("cinemas").get();
    const cinemas: CinemaI[] = [];
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      cinemas.push({
        id: data.id,
        name: data.name,
        description: data.description,
      });
    });

    return {
      results: cinemas,
    };
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
};
