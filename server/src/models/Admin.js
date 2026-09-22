import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ["admin", "editor"], default: "admin" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
);

export default mongoose.model("Admin", adminSchema);
