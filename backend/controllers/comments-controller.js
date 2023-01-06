const catchAsync = require("../../utils/catch-async");
const Comment = require("../modules/comment-model");

exports.createComment = catchAsync(async (req, res, next) => {
  req.body.member = req.member._id;
  req.body.ticket = req.params.ticketId;
  const comment = await Comment.create(req.body);
  res.status(200).json({
    status: "success",
    comment,
  });
});
