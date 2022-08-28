const express = require("express");
const {
  getAllMembers,
  getMember,
  updateMe,
  getMe,
  updateMember,
} = require("../controllers/members-controller");
const {
  protect,
  restrictTo,
  updatePassword,
} = require("../controllers/auth-controller");
const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth-controller");

const Router = express.Router();

Router.post("/sign-up", signUp);
Router.post("/login", login);
Router.get("/forgot-password", forgotPassword);
Router.post("/reset-password/:token", resetPassword);
Router.patch("/update-me", protect, updateMe);
Router.patch("/update-password", protect, updatePassword);

Router.patch(
  "/:id/update-member-role",
  protect,
  restrictTo("admin"),
  updateMember
);
Router.get("/me", protect, getMe);
Router.route("/").get(protect, restrictTo("admin"), getAllMembers);
Router.route("/:id").get(getMember);
module.exports = Router;
