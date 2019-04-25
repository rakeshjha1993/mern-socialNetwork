const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const db = require("./config/keys").mongoURI;
const cors = require("cors");

var app = express();
var port = process.env.PORT || 5000;

var users = require("./routes/apis/users");
var posts = require("./routes/apis/post");
var profiles = require("./routes/apis/profile");

app.get("/", (req, res) => {
  res.send("I am Okay");
});

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());
// Passport Config
require("./config/passport.js")(passport);

mongoose
  .connect(db)
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err.message));

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profiles", profiles);

app.listen(port, err => {
  if (err) {
    console.log(`Error : ${err.message}`);
  }
  console.log(`app is listening on ${port}`);
});
