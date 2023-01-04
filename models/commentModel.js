const mongoose = require("mongoose");

const commentModel = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post is required"],
    },
    user: {
      type: Object,
      required: [true, "User is required"],
    },
    description: {
      type: String,
      required: [true, "Comment description is required"],
    },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("CommentModel", commentModel);

module.exports = CommentModel;