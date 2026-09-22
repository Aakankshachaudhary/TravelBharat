import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    stateSlug: { type: String, required: true, index: true, trim: true, lowercase: true },
  },
  { timestamps: true, versionKey: false },
);

export default mongoose.model("City", citySchema);
