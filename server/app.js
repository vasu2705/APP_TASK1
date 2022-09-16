const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;
// ======================================dotenv ==================================
dotenv.config({ path: "./config.env" });
require("./database/conn");
// require("./models/userSchema");

//====================== express middleware (link router file) ==============================
app.use(express.json());
app.use(cookieParser());
app.use(require("./router/routes.js"));
// ==================================== variable use =====================================

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
