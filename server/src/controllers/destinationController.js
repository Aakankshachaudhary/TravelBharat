import Destination from "../models/Destination.js";
import State from "../models/State.js";
import Category from "../models/Category.js";
import { destinationSchema, destinationUpdateSchema } from "../validators/destination.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getDestinations = asyncHandler(async (req, res) => {
  const { state, city, category, q, sort = "name" } = req.query;
  const filter = {};
  if (state) filter.stateSlug = state.toLowerCase();
  if (city) filter.city = new RegExp(`^${escapeRegex(city)}$`, "i");
  if (category) filter.category = category;

  if (q?.trim()) {
    const query = escapeRegex(q.trim());
    filter.$or = [
      { name: new RegExp(query, "i") },
      { location: new RegExp(query, "i") },
      { category: new RegExp(query, "i") },
      { description: new RegExp(query, "i") },
      { historicalSignificance: new RegExp(query, "i") },
      { nearbyAttractions: new RegExp(query, "i") },
    ];
  }

  const sortMap = {
    name: { name: 1 },
    "-name": { name: -1 },
    newest: { createdAt: -1 },
  };

  const destinations = await Destination.find(filter)
    .sort(sortMap[sort] || sortMap.name)
    .lean();

  sendSuccess(res, destinations, { count: destinations.length });
});

export const getDestinationBySlug = asyncHandler(async (req, res) => {
  const destination = await Destination.findOne({ slug: req.params.slug }).lean();
  if (!destination) throw notFound("Destination not found", "DESTINATION_NOT_FOUND");

  const state = await State.findOne({ slug: destination.stateSlug }).lean();
  const relatedDestinations = destination.relatedDestinationSlugs?.length
    ? await Destination.find({ slug: { $in: destination.relatedDestinationSlugs } }).sort({ name: 1 }).lean()
    : [];

  sendSuccess(res, { ...destination, state, relatedDestinations });
});

export const createDestination = asyncHandler(async (req, res) => {
  const payload = destinationSchema.parse(req.body);
  await ensureReferences(payload);

  const destination = await Destination.create(payload);
  sendSuccess(res, destination, undefined, 201);
});

export const updateDestination = asyncHandler(async (req, res) => {
  const payload = destinationUpdateSchema.parse(req.body);

  if (payload.stateSlug || payload.category) {
    await ensureReferences({
      stateSlug: payload.stateSlug || undefined,
      category: payload.category || undefined,
    }, true);
  }

  const destination = await Destination.findOneAndUpdate(
    { slug: req.params.slug },
    { $set: payload },
    { new: true, runValidators: true },
  ).lean();

  if (!destination) throw notFound("Destination not found", "DESTINATION_NOT_FOUND");
  sendSuccess(res, destination);
});

export const deleteDestination = asyncHandler(async (req, res) => {
  const destination = await Destination.findOneAndDelete({ slug: req.params.slug }).lean();
  if (!destination) throw notFound("Destination not found", "DESTINATION_NOT_FOUND");
  sendSuccess(res, { slug: destination.slug, deleted: true });
});

async function ensureReferences(payload, partial = false) {
  if (!partial || payload.stateSlug) {
    const state = await State.exists({ slug: payload.stateSlug });
    if (!state) throw notFound("Referenced state does not exist", "STATE_REFERENCE_NOT_FOUND");
  }
  if (!partial || payload.category) {
    const category = await Category.exists({ name: payload.category });
    if (!category) throw notFound("Referenced category does not exist", "CATEGORY_REFERENCE_NOT_FOUND");
  }
}

function notFound(message, code) {
  const error = new Error(message);
  error.statusCode = 404;
  error.code = code;
  return error;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
