import { auth } from "../index";

// Function to get user ID from JWT token
export const getUserId = async (token: string): Promise<string | null> => {
  try {
    const idToken = token.split(" ")[1];
    // Verify the JWT token
    const decodedToken = await auth.verifyIdToken(idToken);
    console.log("🚀 ~ getUserId ~ decodedToken:", decodedToken);

    // Return the user ID
    return decodedToken.uid;
  } catch (error) {
    console.error("Error verifying JWT token:", error);
    return null;
  }
};
