import "dotenv/config";

const required = ["MONGODB_URI", "JWT_SECRET"];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const nodeEnv = process.env.NODE_ENV || "development";
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

if (nodeEnv === "production" && clientUrl.includes("localhost")) {
  throw new Error("CLIENT_URL must point to the deployed frontend in production");
}

if (nodeEnv === "production" && process.env.SEED_ON_START === "true") {
  throw new Error("SEED_ON_START must be false in production");
}

export const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv,
  mongoUri: process.env.MONGODB_URI,
  clientUrl,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "8h",
  adminEmail: process.env.ADMIN_EMAIL || "",
  adminPassword: process.env.ADMIN_PASSWORD || "",
  seedOnStart: process.env.SEED_ON_START === "true",
};