const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "a tour must have a name"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    description: String,
    developers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Member",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProjectSchema.virtual("tickets", {
  ref: "Ticket",
  foreignField: "project",
  localField: "_id",
});

ProjectSchema.pre(/^find/, function (next) {
  this.populate("developers");
  next();
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
