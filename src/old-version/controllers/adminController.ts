import { firestore, auth } from "../firebase/config";
import { UserI } from "../models/user.model";
const db = firestore;

export const registerAdminToDB = async (
  idCinema: string,
  data: UserI
): Promise<{ error?: string } | void> => {
  try {
    const authRequest = await auth.createUser({
      displayName: data.name,
      email: data.email,
      password: data.password,
    });

    if (authRequest) {
      await db
        .collection("cinemas")
        .doc(idCinema)
        .collection("admins")
        .doc()
        .set(data);
    }
    return;
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
};

export const getAdminDataFromDb = async (
  idCinema: string,
  userId: string
): Promise<{ error?: string; user?: Partial<UserI> }> => {
  try {
    const snapshot = await db
      .collection("cinemas")
      .doc(idCinema)
      .collection("admins")
      .doc(userId)
      .get();
    const userData = snapshot.data();
    if (!userData) {
      return {
        error: "User doesn't exist",
      };
    } else {
      return {
        user: {
          name: userData.name,
          email: userData.email,
          role: userData.role,
        },
      };
    }
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
};

export const updateAdminDataFromDb = async (
  idCinema: string,
  userId: string,
  user: UserI
): Promise<{ error?: string } | void> => {
  try {
    await db
      .collection("cinemas")
      .doc(idCinema)
      .collection("admins")
      .doc(userId)
      .update({ ...user });
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
};

export const deleteAdminFromDb = async (
  idCinema: string,
  userId: string,
): Promise<{ error?: string } | void> => {
  try {
    await auth.deleteUser(userId);
    await db
      .collection("cinemas")
      .doc(idCinema)
      .collection("admins")
      .doc(userId)
      .delete();
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
};
