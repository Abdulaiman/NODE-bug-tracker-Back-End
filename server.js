const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});

const app = require("./app");

const DB = process?.env?.DATABASEplace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connection has been successful"));


const port = process?.env?.PORT;

console.log();

const server = app.listen(port, () =>
  console.log("server connection successful")
);
