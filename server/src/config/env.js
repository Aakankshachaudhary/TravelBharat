import "dotenv/config";

const required = ["MONGODB_URI"];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGODB_URI,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  adminApiKey: process.env.ADMIN_API_KEY || "",
  seedOnStart: process.env.SEED_ON_START === "true",
};
