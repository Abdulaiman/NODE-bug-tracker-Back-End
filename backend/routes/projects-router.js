const express = require("express");
const {
  getAllProjects,
  createProject,
  deleteProject,
} = require("../controllers/projects-controller");

const router = express.Router();

router.route("/").post(createProject).get(getAllProjects);

module.exports = router;
