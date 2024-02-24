import { firestore, auth } from "../firebase/config";
import { UserI } from "../models/user.model";
const db = firestore;

export const registerCustomerToDB = async (data: Partial<UserI>):Promise<{ error?: string } | void> => {
  try {
    const authRequest = await auth.createUser({
      displayName: data.name,
      email: data.email,
      password: data.password
    });

    if (authRequest) {
      await db.collection("customers").doc().set(data);
    }
    return;
  } catch (error) {
    return {
      error: `${error}`
    }
  }
}


export const getUserDataFromDB = async (customerId: string):Promise<{ error?: string, user?: Partial<UserI> }> => {
  try {
    const snapshot = await db.collection("customers").doc(customerId).get();
    const userData = snapshot.data();
    if (!userData) {
      return {
        error: "User doesn't exist",
      }
    } else {
      return {
        user: {
          name: userData.name,
          email: userData.email,
          role: userData.role
        }
      }
    }
  } catch (error) {
    return {
      error: `${error}`
    }
  }
}