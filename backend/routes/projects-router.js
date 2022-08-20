const express = require("express");
const {
  getAllProjects,
  createProject,
  deleteProject,
  updateProject,
  getProject,
} = require("../controllers/projects-controller");
const { protect } = require("../controllers/auth-controller");

const router = express.Router();

router.route("/").post(createProject).get(protect, getAllProjects);
router.route("/:id").get(getProject).patch(updateProject).delete(deleteProject);

module.exports = router;
