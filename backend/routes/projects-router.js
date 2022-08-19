const express = require("express");
const {
  getAllProjects,
  createProject,
  deleteProject,
  updateProject,
} = require("../controllers/projects-controller");

const router = express.Router();

router.route("/").post(createProject).get(getAllProjects);
router.route("/:id").patch(updateProject).delete(deleteProject);

module.exports = router;
