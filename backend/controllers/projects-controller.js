const Project = require("../modules/projects-model");
const catchAsync = require("../../utils/catch-async");
const AppError = require("../../utils/app-error");

exports.getAllProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find();
  res.status(200).json({
    status: "success",
    payload: projects,
  });
});

exports.createProject = catchAsync(async (req, res, next) => {
  const newProject = await Project.create(req.body);
  res.status(200).json({
    status: "success",
    payload: newProject,
  });
});

exports.deleteProject = catchAsync(async (req, res, next) => {
  const doc = await Project.findByIdAndDelete("62fe40279af8654b7aa63ef7");
  if (!doc) {
    return next(new AppError("there are no documents find with this id"));
  }

  res.status(202).json({
    status: "success",
  });
});
