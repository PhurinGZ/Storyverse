import mongoose from "mongoose";

const TimelineEventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
}, { timestamps: true });

export default mongoose.models.TimelineEvent || mongoose.model("TimelineEvent", TimelineEventSchema);
