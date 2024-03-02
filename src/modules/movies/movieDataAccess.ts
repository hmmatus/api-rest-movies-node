import { firestore, storage } from "../../firebase";
import { FileI, MovieI } from "./movieModel";
import { v4 as uuidv4 } from "uuid";

export const addMovieDB = async (data: MovieI): Promise<{ data: MovieI }> => {
  try {
    const snapshot = await firestore.collection("movies").add(data);
    await firestore.collection("movies").doc(snapshot.id).update({
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

export const uploadMovieImg = async (
  file: FileI
): Promise<{url: string }> => {
  try {
    const imageBuffer = file.buffer;
    const imageName = uuidv4();
    const storageFile = storage.file(imageName);
    await storageFile.save(imageBuffer, { contentType: "image/jpeg" });
    const [url] = await storageFile.getSignedUrl({
      action: "read",
      expires: "03-09-2025", // Set an expiration date for the URL
    });
    return {
      url,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const editMovieDB = async (movieId: string, data: Partial<MovieI>) => {
  try {
    await firestore
      .collection("movies")
      .doc(movieId)
      .update({
        ...data,
      });
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const deleteMovieDB = async (
  idMovie: string
) => {
  try {
    await firestore.collection("movies").doc(idMovie).delete();
    return;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
