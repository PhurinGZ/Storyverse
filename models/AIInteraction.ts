import mongoose from "mongoose";

const AIInteractionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  story: { type: mongoose.Schema.Types.ObjectId, ref: "Story" },
  prompt: String,
  response: String,
  context: String,
}, { timestamps: true });

export default mongoose.models.AIInteraction || mongoose.model("AIInteraction", AIInteractionSchema);
