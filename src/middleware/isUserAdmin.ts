import { type NextFunction, type Request, type Response } from "express";
import { auth, firestore } from "../firebase";

// Define the middleware function
export const checkAdminExistence = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const idToken = (req.headers.authorization ?? "").split(" ")[1];

    if (idToken === "") {
      res.status(401).json({ message: "No token provided" });
    }

    // Verify the JWT token using Firebase Admin SDK
    const decodedToken = await auth.verifyIdToken(idToken);

    if ((decodedToken?.uid).length === 0) {
      res.status(401).json({ message: "Invalid token" });
    }

    const userId = decodedToken.uid;

    // Check if the user exists in the admins collection
    const adminDoc = await firestore.collection("admins").doc(userId).get();

    if (!adminDoc.exists) {
      res.status(403).json({ message: "User is not an admin" });
    }

    // If the user exists in the admins collection, proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
