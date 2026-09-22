import mongoose from "mongoose";
import { sendSuccess } from "../utils/apiResponse.js";

export function healthCheck(req, res) {
  sendSuccess(res, {
    service: "travelbharat-api",
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
}
