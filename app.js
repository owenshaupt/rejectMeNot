const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

const bodyParser = require("body-parser");

const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("RMN is coming"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

const users = require("./routes/api/users");
app.use("/api/users", users);

// more on express routing: https://expressjs.com/en/guide/routing.html
