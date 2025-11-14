import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  youtubeLink: {
    type: String,
    default: ""
  },
  leetcodeLink: {
    type: String,
    default: ""
  },
  codeforcesLink: {
    type: String,
    default: ""
  },
  articleLink: {
    type: String,
    default: ""
  },
  level: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Easy"
  },
  completedBy: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      completed: { type: Boolean, default: false },
      completedAt: { type: Date, default: null }
    }
  ]
});

const dsaTopicSchema = new mongoose.Schema(
  {
    chapterTitle: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    problems: [problemSchema]
  },
  { timestamps: true }
);

const DSATopic = mongoose.model("DSATopic", dsaTopicSchema);
export default DSATopic;

