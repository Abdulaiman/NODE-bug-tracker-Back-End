const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "a tour must have a name"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
  },
  developers: [
    {
      type: mongoose.Schema.ObjectId,
    },
  ],
  tickets: [
    {
      type: mongoose.Schema.ObjectId,
    },
  ],
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
