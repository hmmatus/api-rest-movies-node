import express from "express";
import { checkAdminExistence } from "../../middleware/isUserAdmin";
import { penalizationController } from "./penalizationController";

const router = express.Router();

// Define your routes here
router.get(
  "/penalizations",
  checkAdminExistence,
  penalizationController.getALlPenalizations,
);

export default router;
