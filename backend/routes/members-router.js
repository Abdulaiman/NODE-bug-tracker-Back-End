const express = require("express");
const {
  getAllUsers,
  createNewUser,
} = require("../controllers/members-controller");
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

module.exports = Router;
