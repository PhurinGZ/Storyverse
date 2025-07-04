import mongoose from "mongoose";

const CharacterSchema = new mongoose.Schema({
  name: String,
  description: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
}, { timestamps: true });

export default mongoose.models.Character || mongoose.model("Character", CharacterSchema);
