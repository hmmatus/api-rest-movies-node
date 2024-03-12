import { auth, firestore } from "../../firebase";
import { type UserResponseI, type UserI } from "./userModel";

export const registerUserToDB = async (
  data: UserI,
): Promise<{ name: string; email: string; role: string }> => {
  try {
    const authRequest = await auth.createUser({
      displayName: data.name,
      email: data.email,
      password: data.password,
    });

    await firestore
      .collection("users")
      .doc(authRequest.uid)
      .set({
        ...data,
        id: authRequest.uid,
        role: "user",
      });

    return {
      name: data.name,
      email: data.email,
      role: "user",
    };
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
};

export const getUserDataDB = async (idUser: string): Promise<UserResponseI> => {
  try {
    const result = await firestore.collection("users").doc(idUser).get();
    const data = result.data();
    if (data == null) {
      throw new Error("User doesn't exist");
    }
    return {
      id: data.id,
      name: data.name,
      role: data.role,
      email: data.email,
    };
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
};
