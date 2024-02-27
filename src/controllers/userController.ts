import { firestore, auth } from "../firebase/config";
import { UserI } from "../models/user.model";
const db = firestore;

export const registerCustomerToDB = async (
  data: Partial<UserI>
): Promise<{ error?: string } | void> => {
  try {
    const authRequest = await auth.createUser({
      displayName: data.name,
      email: data.email,
      password: data.password,
    });

    if (authRequest) {
      await db.collection("customers").doc(authRequest.uid).set({
        ...data,
        id: authRequest.uid
      });
    }
    return;
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
};

export const getUserDataFromDB = async (
  customerId: string
): Promise<{ error?: string; user?: Partial<UserI> }> => {
  try {
    const snapshot = await db.collection("customers").doc(customerId).get();
    const userData = snapshot.data();
    if (!userData) {
      return {
        error: "User doesn't exist",
      };
    } else {
      return {
        user: {
          ...userData
        },
      };
    }
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
};

export const updateUserDataFromDb = async (
  userId: string,
  user: UserI
): Promise<{ error?: string } | void> => {
  try {
    await db
      .collection("users")
      .doc(userId)
      .update({ ...user });
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
};

export const deleteUserFromDb = async (
  userId: string
): Promise<{ error?: string } | void> => {
  try {
    await auth.deleteUser(userId);
    await db.collection("users").doc(userId).delete();
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
};

// export const loginUserFromDb = async (
//   email: string,
//   password: string
// ): Promise<{ error?: string, jwt?: string}> => {
//   try {
//     const result;
//     if (!result) {
//       throw new Error(`Error with ${result}`);
//     }
//     return {

//     }
//   } catch (error) {
//     return {
//       error: `${error}`,
//     };
//   }
// };
