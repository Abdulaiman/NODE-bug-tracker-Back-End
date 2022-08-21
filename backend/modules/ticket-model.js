const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["bug", "feature request", , "others"],
    },
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

TicketSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "ticket",
  localField: "_id",
});

TicketSchema.pre(/^find/, function (next) {
  this.populate({
    path: "createdBy assignedTo comments",
  });

  next();
});

const Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = Ticket;
