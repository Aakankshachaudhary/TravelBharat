import crypto from "node:crypto";
import { env } from "../config/env.js";

const base64url = (value) => Buffer.from(value).toString("base64url");
const fromBase64url = (value) => Buffer.from(value, "base64url").toString("utf8");

export function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");
    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) return reject(error);
      resolve(`${salt}:${derivedKey.toString("hex")}`);
    });
  });
}

export function comparePassword(password, stored) {
  return new Promise((resolve, reject) => {
    const [salt, key] = String(stored || "").split(":");
    if (!salt || !key) return resolve(false);
    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) return reject(error);
      const expected = Buffer.from(key, "hex");
      resolve(expected.length === derivedKey.length && crypto.timingSafeEqual(expected, derivedKey));
    });
  });
}

function parseExpiry(value) {
  const match = String(value).match(/^(\d+)([smhd])$/i);
  if (!match) return 8 * 60 * 60;
  const multipliers = { s: 1, m: 60, h: 3600, d: 86400 };
  return Number(match[1]) * multipliers[match[2].toLowerCase()];
}

export function signAccessToken(admin) {
  if (!env.jwtSecret) throw new Error("JWT_SECRET is not configured");
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const now = Math.floor(Date.now() / 1000);
  const payload = base64url(JSON.stringify({ sub: admin._id.toString(), email: admin.email, role: admin.role, name: admin.name, iat: now, exp: now + parseExpiry(env.jwtExpiresIn) }));
  const data = `${header}.${payload}`;
  const signature = crypto.createHmac("sha256", env.jwtSecret).update(data).digest("base64url");
  return `${data}.${signature}`;
}

export function verifyAccessToken(token) {
  if (!env.jwtSecret) throw new Error("JWT_SECRET is not configured");
  const [header, payload, signature] = String(token).split(".");
  if (!header || !payload || !signature) throw new Error("Malformed token");
  const data = `${header}.${payload}`;
  const expected = crypto.createHmac("sha256", env.jwtSecret).update(data).digest("base64url");
  if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) throw new Error("Invalid signature");
  const decoded = JSON.parse(fromBase64url(payload));
  if (!decoded.exp || decoded.exp <= Math.floor(Date.now() / 1000)) throw new Error("Token expired");
  return decoded;
}
