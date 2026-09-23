import mongoose from "mongoose";
import { sendSuccess } from "../utils/apiResponse.js";

function databaseStatus() {
  return mongoose.connection.readyState === 1 ? "connected" : "disconnected";
}

export function healthCheck(req, res) {
  sendSuccess(res, {
    service: "travelbharat-api",
    status: "ok",
    database: databaseStatus(),
    timestamp: new Date().toISOString(),
  });
}

export function readinessCheck(req, res) {
  const database = databaseStatus();

  if (database !== "connected") {
    return res.status(503).json({
      success: false,
      error: {
        code: "SERVICE_NOT_READY",
        message: "TravelBharat API is not ready because the database is unavailable.",
      },
      data: {
        service: "travelbharat-api",
        status: "not_ready",
        database,
        timestamp: new Date().toISOString(),
      },
    });
  }

  return sendSuccess(res, {
    service: "travelbharat-api",
    status: "ready",
    database,
    timestamp: new Date().toISOString(),
  });
}
