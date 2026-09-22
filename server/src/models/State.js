import mongoose from "mongoose";

const stateSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    capital: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    imageAlt: { type: String, required: true },
    popularCities: { type: [String], default: [] },
    popularDestinationSlugs: { type: [String], default: [] },
    culture: { type: String, required: true },
    cuisine: { type: String, required: true },
    bestTime: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export default mongoose.model("State", stateSchema);
