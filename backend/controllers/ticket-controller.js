const Ticket = require("../modules/ticket-model");
const catchAsync = require("../../utils/catch-async");
const AppError = require("../../utils/app-error");

// exports.getAllProjectsTickets = catchAsync(async (req,res,next) => {

// })

exports.getAllTickets = catchAsync(async (req, res, next) => {
  const tickets = await Ticket.find();
  if (!tickets) next(new AppError("there are no tickets to display"));

  res.status(200).json({
    message: "success",
    lenght: tickets.length,
    tickets,
  });
});

exports.getTicketsByPriority = catchAsync(async (req, res, next) => {
  const tickets = await Ticket.aggregate([
    {
      $match: { priority: { $ne: "hello" } },
    },
    {
      $group: {
        _id: "$priority",
        length: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    message: "success",
    tickets,
  });
});
exports.getTicketsByStatus = catchAsync(async (req, res, next) => {
  const tickets = await Ticket.aggregate([
    {
      $match: { priority: { $ne: "hello" } },
    },
    {
      $group: {
        _id: "$status",
        length: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    message: "success",
    tickets,
  });
});
exports.getTicketsByTypes = catchAsync(async (req, res, next) => {
  const tickets = await Ticket.aggregate([
    {
      $match: { priority: { $ne: "hello" } },
    },
    {
      $group: {
        _id: "$type",
        length: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    message: "success",
    tickets,
  });
});
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

exports.getMyTickets = catchAsync(async (req, res, next) => {
  const tickets = await Ticket.aggregate([
    {
      $match: { createdBy: req.member._id },
    },
  ]);
  res.status(200).json({
    message: "success",
    lenght: tickets.length,
    tickets,
  });
});
exports.getMyTicketsByStatus = catchAsync(async (req, res, next) => {
  const tickets = await Ticket.aggregate([
    {
      $match: { createdBy: req.member._id },
    },
    {
      $group: {
        _id: "$status",
        length: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    message: "success",
    lenght: tickets.length,
    tickets,
  });
});
exports.getMyTicketsByPriority = catchAsync(async (req, res, next) => {
  const tickets = await Ticket.aggregate([
    {
      $match: { createdBy: req.member._id },
    },
    {
      $group: {
        _id: "$priority",
        length: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    message: "success",
    lenght: tickets.length,
    tickets,
  });
});
exports.getMyTicketsByType = catchAsync(async (req, res, next) => {
  const tickets = await Ticket.aggregate([
    {
      $match: { createdBy: req.member._id },
    },
    {
      $group: {
        _id: "$type",
        length: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    message: "success",
    lenght: tickets.length,
    tickets,
  });
});
exports.updateTicketStatus = catchAsync(async (req, res, next) => {
  const status = req.body.status;
  const ticket = await Ticket.findByIdAndUpdate(
    req.params.ticketId,
    { status },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    ticket,
  });
});
exports.updateTicket = catchAsync(async (req, res, next) => {
  req.body.updatedAt = Date.now();
  const ticket = await Ticket.findByIdAndUpdate(req.params.ticketId, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    ticket,
  });
});
exports.deleteMany = catchAsync(async (req, res, next) => {
  await Ticket.deleteMany();
  res.status(200).json({
    status: "all tickets deleted successfully",
  });
});
