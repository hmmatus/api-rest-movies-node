import { firestore } from "../firebase/config";
import { MovieI } from "../models/movie.model";
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
    await db
      .collection("cinemas")
      .doc(idCinema)
      .collection("movies")
      .doc()
      .set(data);
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
