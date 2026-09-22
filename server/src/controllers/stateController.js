import State from "../models/State.js";
import Destination from "../models/Destination.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getStates = asyncHandler(async (req, res) => {
  const states = await State.find({}).sort({ name: 1 }).lean();
  sendSuccess(res, states, { count: states.length });
});

export const getStateBySlug = asyncHandler(async (req, res) => {
  const state = await State.findOne({ slug: req.params.slug }).lean();
  if (!state) {
    const error = new Error("State not found");
    error.statusCode = 404;
    error.code = "STATE_NOT_FOUND";
    throw error;
  }

  const destinations = await Destination.find({ stateSlug: state.slug }).sort({ name: 1 }).lean();
  sendSuccess(res, { ...state, destinations });
});
