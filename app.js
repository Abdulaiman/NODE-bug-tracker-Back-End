const express = require("express");
const { globalErrorHandler } = require("./backend/controllers/error-conroller");
const projectsRouter = require("./backend/routes/projects-router");

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
console.log(process.env.NODE_ENV);
app.use("/api/v1/projects", projectsRouter);

app.use(globalErrorHandler);

module.exports = app;
