const Ticket = require("../modules/ticket-model");
const catchAsync = require("../../utils/catch-async");
const AppError = require("../../utils/app-error");

// exports.getAllProjectsTickets = catchAsync(async (req,res,next) => {

// })
exports.createTicketOnProject = catchAsync(async (req, res, next) => {
  req.body.createdBy = req.member._id;
  req.body.project = req.params.id;
  const newTicket = await Ticket.create(req.body);
  res.status(201).json({
    message: "success",
    Ticket: newTicket,
  });
});

exports.getTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findById(req.params.ticketId);
  if (!ticket) {
    return next(new AppError("no ticket found with this id"));
  }
  res.status(200).json({
    message: "success",
    ticket,
  });
});

exports.assignDevelopers = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const ticket = await Ticket.findByIdAndUpdate(
    req.params.ticketId,
    {
      $push: {
        assignedTo: { $each: req.body.assigneTo },
      },
    },
    {
      new: true,
    }
  );
  if (!ticket) {
    return next(new AppError("no ticket found with this id"));
  }
  res.status(200).json({
    message: "success",
    ticket,
  });
});
