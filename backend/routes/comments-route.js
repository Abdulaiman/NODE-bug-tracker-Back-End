const express = require("express");
const { createComment } = require("../controllers/comments-controller");

const Router = express.Router({ mergeParams: true });

Router.route("/").post(createComment);

module.exports = Router;
