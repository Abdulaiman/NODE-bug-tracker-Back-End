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

exports.createProject = catchAsync(async (req, res, next) => {
  const newProject = await Project.create(req.body);
  res.status(200).json({
    status: "success",
    payload: newProject,
  });
});

exports.updateProject = catchAsync(async (req, res, next) => {
  console.log(req.body);
  console.log(req.params);
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
  const doc = await Project.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError("there are no documents find with this id"));
  }

  res.status(202).json({
    status: "success",
  });
});
