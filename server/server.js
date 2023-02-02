const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
require("colors");
require("dotenv").config();

const dbConnect = require("./config/db");
dbConnect();
app.use(express.json());

app.use("/users", userRouter);

const port = process.env.PORT || 5556;
app.listen(port, () =>
  console.log(`Serever is up and running on port ${port}`.cyan)
);
