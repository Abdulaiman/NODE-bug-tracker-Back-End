const express = require("express");
const {
  createTicketOnProject,
  getTicket,
} = require("../controllers/ticket-controller");
const Router = express.Router({ mergeParams: true });

Router.route("/").post(createTicketOnProject);
Router.route("/:id").get(getTicket);

module.exports = Router;
