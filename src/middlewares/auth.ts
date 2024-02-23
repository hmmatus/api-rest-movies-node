// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// const verifiedToken = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.get("Authorization");

//   if (!token) {
//     return res.status(401).json({
//       error: "Authorization token is missing",
//     });
//   }

//   jwt.verify(token, process.env.SEED!, (error, decoded) => {
//     if (error) {
//       return res.status(401).json({
//         error: "Invalid token",
//       });
//     }
//     req.user = (decoded as { user: any }).user;
//     next();
//   });
// };

// export default verifiedToken;