const AppError = require("../../utils/app-error");
const catchAsync = require("../../utils/catch-async");
const Member = require("../modules/members-model");

const selectedBody = (object, ...allowedFields) => {
  let newObj = {};
  Object.keys(object).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = object[el];
    }
  });
  console.log(newObj);
  return newObj;
};

exports.getAllMembers = catchAsync(async (req, res, next) => {
  const members = await Member.find();

  res.status(200).json({
    status: "success",
    data: members,
  });
});

exports.getMember = catchAsync(async (req, res, next) => {
  const member = await Member.findById(req.params.id).populate(
    "myTickets assignedTickets"
  );

  if (!member) {
    return next(new AppError("no user found", 404));
  }
  res.status(200).json({
    status: "success",
    member,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("this route can not be uses to update password"));
  }

  const filteredBody = selectedBody(req.body, "name", "email");
  const member = await Member.findByIdAndUpdate(req.member._id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    member,
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const member = await (
    await Member.findById(req.member._id)
  ).populate("myTickets assignedTickets");

  if (!member) {
    return next(new AppError("no user found", 404));
  }
  res.status(200).json({
    status: "success",
    member,
  });
});
