import mongoose from "mongoose";

const WorldSchema = new mongoose.Schema({
  name: String,
  description: String,
  mapImage: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
}, { timestamps: true });

export default mongoose.models.World || mongoose.model("World", WorldSchema);
