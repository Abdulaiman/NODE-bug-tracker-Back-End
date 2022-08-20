const Project = require("../modules/projects-model");
const catchAsync = require("../../utils/catch-async");
const AppError = require("../../utils/app-error");

exports.getAllProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find();
  res.status(200).json({
    status: "success",
    length: projects.length,
    payload: projects,
  });
});

exports.getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id).populate("tickets");

  if (!project) {
    return next(new AppError("no user found", 404));
  }
  res.status(200).json({
    status: "success",
    project,
  });
});

exports.createProject = catchAsync(async (req, res, next) => {
  const newProject = await Project.create(req.body);
  console.log(newProject);
  res.status(200).json({
    status: "success",
    payload: newProject,
  });
});

exports.updateProject = catchAsync(async (req, res, next) => {
  const document = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!document)
    next(
      new AppError(
        `there is no document found with the id ${req.params.id}`,
        202
      )
    );
  res.status(200).json({
    status: "success",
    payload: document,
  });
});

exports.deleteProject = catchAsync(async (req, res, next) => {
  await Project.findByIdAndDelete(req.params.id);
  res.status(202).json({
    status: "success",
  });
});
