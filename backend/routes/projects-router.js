const express = require("express");
const {
  getAllProjects,
  createProject,
  deleteProject,
  updateProject,
  getProject,
} = require("../controllers/projects-controller");
const { protect, restrictTo } = require("../controllers/auth-controller");
const ticketRouter = require("./ticket-router");
const { route } = require("./members-router");

const router = express.Router();

router.use("/:id/tickets", protect, ticketRouter);

router
  .route("/")
  .post(protect, restrictTo("admin"), createProject)
  .get(getAllProjects);
router
  .route("/:id")
  .get(getProject)
  .patch(protect, restrictTo("admin"), updateProject)
  .delete(protect, restrictTo("admin"), deleteProject);

module.exports = router;
