const catchAsync = require("../../utils/catch-async");
const Member = require("../modules/members-model");

const getAllMembers = catchAsync(async (req, res, next) => {
  const members = await Member.find();

  res.status(200).json({
    status: "success",
    data: members,
  });
});
