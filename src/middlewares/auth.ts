import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import admin from "../routes/admin";
import { auth } from "../firebase/config";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const idToken = authHeader.split(" ")[1];
      auth
      .verifyIdToken(idToken)
      .then(function (decodedToken) {
        return next();
      })
      .catch(function (error) {
        return res.sendStatus(403);
      });
  } else {
    res.sendStatus(401);
  }
};

export default verifyToken;