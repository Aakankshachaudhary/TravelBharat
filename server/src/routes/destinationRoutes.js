import { Router } from "express";
import { authenticateJWT, requireRoles } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import {
  destinationSchema,
  destinationUpdateSchema,
} from "../validators/destination.js";
import {
  createDestination,
  deleteDestination,
  getDestinationBySlug,
  getDestinations,
  updateDestination,
} from "../controllers/destinationController.js";

const router = Router();

router.get("/", getDestinations);
router.get("/:slug", getDestinationBySlug);
router.post(
  "/",
  authenticateJWT,
  requireRoles("admin", "editor"),
  validateBody(destinationSchema),
  createDestination,
);
router.put(
  "/:slug",
  authenticateJWT,
  requireRoles("admin", "editor"),
  validateBody(destinationUpdateSchema),
  updateDestination,
);
router.delete(
  "/:slug",
  authenticateJWT,
  requireRoles("admin", "editor"),
  deleteDestination,
);

export default router;
