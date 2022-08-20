const express = require("express");
const { protect, restrictTo } = require("../controllers/auth-controller");
const {
  createTicketOnProject,
  getTicket,
  assignDevelopers,
} = require("../controllers/ticket-controller");
const Router = express.Router({ mergeParams: true });

Router.route("/").post(createTicketOnProject);
Router.route("/:ticketId")
  .get(getTicket)
  .patch(protect, restrictTo("admin"), assignDevelopers);

module.exports = Router;
