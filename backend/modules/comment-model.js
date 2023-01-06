const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comment: String,
    member: {
      type: mongoose.Schema.ObjectId,
      ref: "Member",
    },
    ticket: {
      type: mongoose.Schema.ObjectId,
      ref: "Ticket",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CommentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "member",
    select: "name",
  });
  next();
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
