const express = require("express");
const mongoose = require("mongoose");

const keys = require("./config/keys");

const users = require("./routers/api/users");
const profile = require("./routers/api/profile");
const posts = require("./routers/api/posts");

//===============CONFIGS===================CONNECTS==============
// Connect to mongoDB
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log(`Logged into MLab URI = ${keys.mongoURI}`))
  .catch(err => console.log("Error logging into Mongo : " + err));

const app = express();

//=======TEST CONN========================================================
app.get("/", (req, res) => {
  res.send("hello !!!!!");
});
//======================ROUTERS==============================
// Need middleware for router use

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
//========================START SERVR==============================

const port = process.env.PORT || 5000;
const ip = process.env.IP;
app.listen(port, ip, () => {
  console.log(`Server running on port ${port}`);
});
