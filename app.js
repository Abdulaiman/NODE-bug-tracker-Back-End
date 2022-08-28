const express = require("express");
const cookieParser = require("cookie-parser");
const { globalErrorHandler } = require("./backend/controllers/error-conroller");
const compression = require("compression");
const projectsRouter = require("./backend/routes/projects-router");
const membersRouter = require("./backend/routes/members-router");
const ticketsRouter = require("./backend/routes/ticket-router");
const AppError = require("./utils/app-error");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use(compression());

app.use("/api/v1/projects", projectsRouter);
app.use("/api/v1/members", membersRouter);
app.use("/api/v1/tickets", ticketsRouter);

app.all("*", (req, res, next) =>
  next(new AppError(`can't find ${req.originalUrl} on this server`))
);

app.use(globalErrorHandler);

module.exports = app;
