const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
  {
    title: String,
    feature: String,
    description: String,
    project: {
      type: mongoose.Schema.ObjectId,
      ref: "Project",
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Member",
    },
    assignedTo: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Member",
      },
    ],
    priority: {
      type: String,
      enum: ["medium", "critical", "high", "critical high-priority"],
    },
    attachment: String,
    status: {
      type: String,
      enum: ["waiting", "fixed", "in progress", "cancelled"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    Browser: String,
    OperatingSystem: String,
    foundIn: String,
    updatedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Member",
    },
    updatedAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

TicketSchema.pre(/^find/, function (next) {
  this.populate({
    path: "createdBy assignedTo",
  });

  next();
});

const Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = Ticket;
