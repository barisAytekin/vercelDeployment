const express = require("express");
const dotenv = require("dotenv").config();
const connect = require("./config/db");
const port = process.env.PORT || 5001;
const cors = require("cors");

connect();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://barisaytekin.github.io/deployment/"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use("/api", require("./routes/myRoutes"));
app.listen(port, () => console.log(`Server running on port ${port}`));
