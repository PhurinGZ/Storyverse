import mongoose from "mongoose";

const StorySchema = new mongoose.Schema({
  title: String,
  content: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
}, { timestamps: true });

export default mongoose.models.Story || mongoose.model("Story", StorySchema);
