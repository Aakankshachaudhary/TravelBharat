import { env } from "../config/env.js";

export function requireAdminApiKey(req, res, next) {
  if (!env.adminApiKey) {
    return res.status(503).json({
      success: false,
      error: { code: "ADMIN_KEY_NOT_CONFIGURED", message: "Admin API protection is not configured." },
    });
  }

  const provided = req.get("x-admin-api-key");
  if (!provided || provided !== env.adminApiKey) {
    return res.status(401).json({
      success: false,
      error: { code: "UNAUTHORIZED", message: "Valid admin API key required." },
    });
  }
  next();
}
