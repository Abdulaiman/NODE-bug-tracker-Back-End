const express = require("express");
const { globalErrorHandler } = require("./backend/controllers/error-conroller");
const projectsRouter = require("./backend/routes/projects-router");
const membersRouter = require("./backend/routes/members-router");
const ticketsRouter = require("./backend/routes/ticket-router");
const AppError = require("./utils/app-error");

const app = express();
app.use(express.json());

console.log(process.env.NODE_ENV);
app.use("/api/v1/projects", projectsRouter);
app.use("/api/v1/members", membersRouter);
app.use("/api/v1/tickets", ticketsRouter);

app.all("*", (req, res, next) =>
  next(new AppError(`can't find ${req.originalUrl} on this server`))
);

app.use(globalErrorHandler);

module.exports = app;
