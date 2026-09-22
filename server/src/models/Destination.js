import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true, index: true },
    stateSlug: { type: String, required: true, index: true, trim: true, lowercase: true },
    location: { type: String, required: true, trim: true },
    city: { type: String, trim: true, index: true },
    category: { type: String, required: true, index: true, trim: true },
    image: { type: String, required: true },
    imageAlt: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    historicalSignificance: { type: String, required: true, trim: true },
    bestTime: { type: String, required: true, trim: true },
    entryFee: { type: String, required: true, trim: true },
    timings: { type: String, required: true, trim: true },
    nearbyAttractions: { type: [String], default: [] },
    relatedDestinationSlugs: { type: [String], default: [] },
  },
  { timestamps: true, versionKey: false },
);

destinationSchema.index({ name: "text", location: "text", category: "text", description: "text", historicalSignificance: "text" });

export default mongoose.model("Destination", destinationSchema);
