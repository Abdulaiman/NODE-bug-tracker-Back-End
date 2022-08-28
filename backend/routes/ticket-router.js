const express = require("express");
const { protect, restrictTo } = require("../controllers/auth-controller");
const {
  createTicketOnProject,
  getTicket,
  assignDevelopers,
  getAllTickets,
  getTicketsByPriority,
  getTicketsByStatus,
  getMyTickets,
  getMyTicketsByStatus,
  getMyTicketsByPriority,
  getMyTicketsByType,
  getTicketsByTypes,
  updateTicketStatus,
  updateTicket,
  deleteMany,
} = require("../controllers/ticket-controller");
const commentRouter = require("./comments-route");
const Router = express.Router({ mergeParams: true });

Router.use("/:ticketId/comments", protect, commentRouter);

Router.get(
  "/get-tickets-by-priority",
  protect,
  restrictTo("admin"),
  getTicketsByPriority
);
Router.get(
  "/get-tickets-by-status",
  protect,
  restrictTo("admin"),
  getTicketsByStatus
);
Router.get(
  "/get-tickets-by-types",
  protect,
  restrictTo("admin"),
  getTicketsByTypes
);
Router.get("/get-my-tickets", protect, getMyTickets);
Router.get("/get-my-tickets-by-status", protect, getMyTicketsByStatus);
Router.get("/get-my-tickets-by-priority", protect, getMyTicketsByPriority);
Router.get("/get-my-tickets-by-type", protect, getMyTicketsByType);
Router.patch(
  "/:ticketId/update-ticket-status",
  protect,
  restrictTo("developer"),
  updateTicketStatus
);

Router.delete("/delete-many", deleteMany);
Router.patch(
  "/:ticketId/update-ticket",
  protect,
  restrictTo("admin"),
  updateTicket
);

Router.route("/").post(createTicketOnProject).get(getAllTickets);
Router.route("/:ticketId")
  .get(getTicket)
  .patch(protect, restrictTo("admin"), assignDevelopers);

module.exports = Router;
