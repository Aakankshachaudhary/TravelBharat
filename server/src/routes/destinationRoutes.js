import { Router } from "express";
import { requireAdminApiKey } from "../middleware/adminKey.js";
import { validateBody } from "../middleware/validate.js";
import { destinationSchema, destinationUpdateSchema } from "../validators/destination.js";
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
router.post("/", requireAdminApiKey, validateBody(destinationSchema), createDestination);
router.put("/:slug", requireAdminApiKey, validateBody(destinationUpdateSchema), updateDestination);
router.delete("/:slug", requireAdminApiKey, deleteDestination);

export default router;
