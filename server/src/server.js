import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { connectDatabase } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import stateRoutes from "./routes/stateRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { seedDatabase } from "./utils/seedDatabase.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientUrl.split(",").map((value) => value.trim()), credentials: false }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

app.get("/", (req, res) => res.json({
  success: true,
  service: "TravelBharat API",
  version: "1.0.0",
  documentation: "/api/health",
}));

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/destinations", destinationRoutes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  await connectDatabase();
  if (env.seedOnStart) await seedDatabase();
  app.listen(env.port, () => {
    console.log(`TravelBharat API running on http://localhost:${env.port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
