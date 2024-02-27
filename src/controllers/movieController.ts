import { firestore, storage } from "../firebase/config";
import { FileI, MovieI } from "../models/movie.model";
import { v4 as uuidv4 } from "uuid";
const db = firestore;

export const getAllMoviesFromDB = async (
  idCinema: string
): Promise<{ error?: string; data?: MovieI[] }> => {
  try {
    const snapshot = await db
      .collection("cinemas")
      .doc(idCinema)
      .collection("movies")
      .get();
    const movies: MovieI[] = [];
    snapshot.docs.forEach((doc) => {
      const movieData = doc.data();
      const movie = {
        title: movieData.title,
        description: movieData.description,
        image: movieData.image,
        stock: movieData.stock,
        rentAmount: movieData.rentAmount,
        saleAmount: movieData.saleAmount,
        availability: movieData.availability,
        likesCount: movieData.likesCount,
      };
      movies.push(movie);
    });
    return {
      data: movies,
    };
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
};

export const addMovieDB = async (
  idCinema: string,
  data: MovieI
): Promise<{ error?: string } | void> => {
  try {
    const result = await db
      .collection("cinemas")
      .doc(idCinema)
      .collection("movies")
      .add(data);

    await db
      .collection("cinemas")
      .doc(idCinema)
      .collection("movies")
      .doc(result.id)
      .update({
        id: result.id,
      });
    return;
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
};

export const editMovieDB = async (
  idCinema: string,
  movieId: string,
  data: MovieI
): Promise<{ error?: string } | void> => {
  try {
    await db
      .collection("cinemas")
      .doc(idCinema)
      .collection("movies")
      .doc(movieId)
      .update({
        ...data,
      });
    return;
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
};

export const deleteMovieDB = async (
  idCinema: string,
  idMovie: string
): Promise<{ error?: string } | void> => {
  try {
    await db
      .collection("cinemas")
      .doc(idCinema)
      .collection("movies")
      .doc(idMovie)
      .delete();
    return;
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
};

export const uploadMovieImg = async (
  file: FileI
): Promise<{ error?: string; url?: string }> => {
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
    return {
      error: `${error}`,
    };
  }
};
