const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const AppError = require("../../utils/app-error");
const catchAsync = require("../../utils/catch-async");
const Member = require("../modules/members-model");
const nodemailer = require("nodemailer");

exports.signUp = catchAsync(async (req, res, next) => {
  const newMember = await Member.create(req.body);
  const token = jwt.sign({ id: newMember._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "success",
    token,
    data: newMember,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    next(new AppError("please specify your email and password"));

  const member = await Member.findOne({ email });

  const correctPass = await member.correctPassword(password, member.password);
  if (!correctPass || !member)
    next(new AppError("wrong email or password please check and try agian"));

  const token = jwt.sign({ id: member._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "success",
    token,
  });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) next(new AppError("please specify your email address"), 404);
  const member = await Member.findOne({ email });

  if (!member) next(new AppError("no user found with this email address", 404));

  const resetToken = member.createPasswordResetToken();

  await member.save({
    validateBeforeSave: false,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  transporter.sendMail(
    {
      from: process.env.NODEMAILER_USER, // sender address
      to: process.env.NODEMAILER_TO, // list of receivers
      subject: "reset password url", // Subject line
      text: `click on the following link to reset Your password: http://127.0.0.1:8000/api/v1/members/reset-password/${resetToken}`,
    },
    (err) => next(new AppError(err.message, 404))
  );

  res.status(200).json({
    status: "success",
    message: "reset url sent to your email",
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const { password, passwordConfirm } = req.body;
  const decoded = crypto.createHash("sha256").update(token).digest("hex");
  const member = await Member.findOne({ passwordResetToken: decoded });

  if (!(member.passwordResetTokenExpires > Date.now()))
    next(
      new AppError(
        "the password reset token has expired please try creating a new one"
      ),
      401
    );

  member.password = password;
  member.passwordConfirm = passwordConfirm;
  member.passwordResetTokenExpires = undefined;
  member.passwordResetToken = undefined;
  member.passwordChangedAt = Date.now() - 1000;
  await member.save();

  const jwttoken = jwt.sign({ id: member }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "success",
    token: jwttoken,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else
    next(new AppError("you are not logged in please log in to have access"));

  const verify = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
  const { id } = verify;
  const member = await Member.findById(id);
  if (!member) next(new AppError("user does no longer exist"));
  if (member.passwordChangedAt && verify.iat > member.passwordChangedAt)
    next(new AppError("user recently changed his password"));

  req.member = member;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    roles.forEach((role) => {
      if (role === req.member.role) {
        return true;
      } else {
        next(new AppError("you do not have access to this route :D "));
      }
    });
    next();
  };

exports.updatePassword = catchAsync(async (req, res, next) => {
  const member = await Member.findById(req.member._id);

  const correctPassword = await member.correctPassword(
    req.body.password,
    member.password
  );
  if (!correctPassword) {
    return next(
      new AppError("wrong password please specify the correct password")
    );
  }
  member.password = req.body.newPassword;
  member.passwordConfirm = req.body.newPasswordConfirm;
  member.passwordChangedAt = Date.now();
  await member.save();

  const token = jwt.sign({ id: newMember._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "success",
    token,
    data: member,
  });
});
