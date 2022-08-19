const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "a member must have a name"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email already exist"],
    validate: [
      validator.isEmail,
      'please write the correct input for the email "example@example.com',
    ],
  },
  role: {
    type: String,
    default: "developer",
    enum: {
      values: ["developer", "admin", "project-manager"],
      message:
        'the only fields allowed are "developer, admin and project-manager',
    },
  },
  projects: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Project",
    },
  ],
  tickets: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Ticket",
    },
  ],
  password: {
    type: String,
    minLength: 8,
    required: [true, "password is required"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "password must be the same",
    },
    select: false,
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  passwordChangedAt: Date,
});

MemberSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

MemberSchema.methods.correctPassword = async (candidatePassword, password) => {
  return await bcrypt.compare(candidatePassword, password);
};

MemberSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const Member = mongoose.model("Member", MemberSchema);
module.exports = Member;
