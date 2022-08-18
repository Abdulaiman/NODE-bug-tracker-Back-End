const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
