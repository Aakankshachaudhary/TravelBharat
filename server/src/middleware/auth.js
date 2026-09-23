import Admin from "../models/Admin.js";
import { verifyAccessToken } from "../utils/auth.js";

export async function authenticateJWT(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ success: false, error: { code: "AUTH_REQUIRED", message: "Authentication required" } });
    const payload = verifyAccessToken(token);
    const admin = await Admin.findById(payload.sub).lean();
    if (!admin || !admin.active) return res.status(401).json({ success: false, error: { code: "AUTH_INVALID", message: "Session is no longer valid" } });
    req.admin = admin;
    next();
  } catch {
    return res.status(401).json({ success: false, error: { code: "AUTH_INVALID", message: "Invalid or expired token" } });
  }
}

export function requireRoles(...roles) {
  return (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) return res.status(403).json({ success: false, error: { code: "FORBIDDEN", message: "You do not have permission for this action" } });
    next();
  };
}
