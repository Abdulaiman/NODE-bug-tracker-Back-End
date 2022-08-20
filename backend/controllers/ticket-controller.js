const Ticket = require("../modules/ticket-model");
const catchAsync = require("../../utils/catch-async");
const AppError = require("../../utils/app-error");

// exports.getAllProjectsTickets = catchAsync(async (req,res,next) => {

// })
exports.createTicketOnProject = catchAsync(async (req, res, next) => {
  req.body.member = req.member._id;
  req.body.project = req.params.id;
  const newTicket = await Ticket.create(req.body);
  res.status(201).json({
    message: "success",
    Ticket: newTicket,
  });
});

exports.getTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findById("6300567ab93f8a623a7d9aa8");
  if (!ticket) {
    return next(new AppError("no ticket found with this id"));
  }
  res.status(200).json({
    message: "success",
    ticket,
  });
});
