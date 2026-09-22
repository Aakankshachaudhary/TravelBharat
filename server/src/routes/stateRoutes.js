import { Router } from "express";
import { getStateBySlug, getStates } from "../controllers/stateController.js";

const router = Router();
router.get("/", getStates);
router.get("/:slug", getStateBySlug);
export default router;
