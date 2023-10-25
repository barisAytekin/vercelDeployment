const express = require("express");
const dotenv = require("dotenv").config();
const connect = require("./config/db");
const port = process.env.PORT || 5001;

connect();
const app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://barisaytekin.github.io/deployment/"
  ); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", require("./routes/myRoutes"));
app.listen(port, () => console.log(`Server running on port ${port}`));
