import { type Request, type Response, type NextFunction } from "express";
import { auth } from "../firebase";

const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (authHeader != null) {
    const idToken = authHeader.split(" ")[1];
    auth
      .verifyIdToken(idToken)
      .then(function () {
        next();
      })
      .catch(function () {
        res.sendStatus(403);
      });
  } else {
    res.sendStatus(401);
  }
};

export default verifyToken;
