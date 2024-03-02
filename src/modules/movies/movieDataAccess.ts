import firebase from "firebase-admin";
import { firestore, storage } from "../../firebase";
import { FileI, MovieI, MovieOrderEnum } from "./movieModel";
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
        countLikes: 0,
      },
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const uploadMovieImg = async (file: FileI): Promise<{ url: string }> => {
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

export const deleteMovieDB = async (idMovie: string) => {
  try {
    await firestore.collection("movies").doc(idMovie).delete();
    return;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getAllMoviesFromDB = async ({
  orderBy,
  onlyAvailable,
  searchValue,
  limit = 10,
  currentPage = 1
}: {
  orderBy?: MovieOrderEnum;
  onlyAvailable?: boolean;
  searchValue?: string;
  limit?: number;
  currentPage?: number
}): Promise<{ data?: MovieI[], currentPage: number, pages: number }> => {
  try {
    let query: firebase.firestore.Query<firebase.firestore.DocumentData> =
      firestore.collection("movies");

    if (orderBy === MovieOrderEnum.likes) {
      query = query.orderBy("countLikes", "asc");
    }
    if (onlyAvailable) {
      query = query.where("availability", "==", true);
    }
    if (searchValue) {
      query = query
        .where("title", ">=", searchValue)
        .where("title", "<=", searchValue + "\uf8ff");
    }

    const snapshot = await query.get();
    const totalMovies = snapshot.size;

    const totalPages = Math.ceil(totalMovies / (limit || 10));
    const currentPageNumber = currentPage || 1;

    const startAt = (currentPageNumber - 1) * (limit || 10);
    const querySnapshot = await query.offset(startAt).limit(limit || 10).get();
    const movies: MovieI[] = [];
    querySnapshot.docs.forEach((doc) => {
      const movieData = doc.data();
      const movie = {
        id: movieData.id,
        title: movieData.title,
        description: movieData.description,
        image: movieData.image,
        stock: movieData.stock,
        rentAmount: movieData.rentAmount,
        saleAmount: movieData.saleAmount,
        availability: movieData.availability,
        countLikes: movieData.countLikes,
      };
      movies.push(movie);
    });
    return {
      data: movies,
      currentPage,
      pages: totalPages
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const getMovieById = async (
  movieId: string
): Promise<{ data?: MovieI }> => {
  try {
    const snapshot = await firestore.collection("movies").doc(movieId).get();
    const movieData = snapshot.data();
    if (!movieData) {
      throw new Error("Movie doesn't exist");
    }
    return {
      data: {
        id: movieData.id,
        title: movieData.title,
        description: movieData.description,
        image: movieData.image,
        stock: movieData.stock,
        rentAmount: movieData.rentAmount,
        saleAmount: movieData.saleAmount,
        availability: movieData.availability,
        countLikes: movieData.countLikes || 0,
      },
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
