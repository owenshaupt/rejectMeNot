const express = require("express");
const mongoose = require("mongoose");
const app = express();
const server = require("http").Server(app);

const db = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`listening on localhost ${PORT}`);
});

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport").passport;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("RMN is coming");
});

app.use("/api/users", users);

// more on express routing: https://expressjs.com/en/guide/routing.html
