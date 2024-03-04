import { auth, firestore } from "../../firebase";
import { AdminI, adminSchema } from "./adminModel";

export const registerAdminToDB = async (
  data: AdminI
): Promise<{ name: string; email: string; role: string }> => {
  try {
    const authRequest = await auth.createUser({
      displayName: data.name,
      email: data.email,
      password: data.password,
    });

    if (authRequest) {
      await firestore.collection("admins").doc(authRequest.uid).set({
        ...data,
        id: authRequest.uid,
        role: "admin"
      });
    }

    return {
      name: data.name,
      email: data.email,
      role: "admin",
    };
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
};
