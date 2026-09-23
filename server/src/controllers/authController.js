import Admin from "../models/Admin.js";
import { comparePassword, signAccessToken } from "../utils/auth.js";
import { env } from "../config/env.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const login = asyncHandler(async (req, res) => {
  const email = String(req.body.email || "")
    .trim()
    .toLowerCase();
  const password = String(req.body.password || "");
  if (!email || !password)
    return res
      .status(400)
      .json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Email and password are required",
        },
      });
  const admin = await Admin.findOne({ email }).select("+passwordHash");
  const valid =
    admin &&
    admin.active &&
    (await comparePassword(password, admin.passwordHash));
  if (!valid)
    return res
      .status(401)
      .json({
        success: false,
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Invalid email or password",
        },
      });
  admin.lastLoginAt = new Date();
  await admin.save();
  const token = signAccessToken(admin);
  sendSuccess(res, {
    token,
    user: {
      id: admin._id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    },
    expiresIn: env.jwtExpiresIn,
  });
});

export const me = asyncHandler(async (req, res) => {
  sendSuccess(res, {
    id: req.admin._id,
    email: req.admin.email,
    name: req.admin.name,
    role: req.admin.role,
    lastLoginAt: req.admin.lastLoginAt,
  });
});
