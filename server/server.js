const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// This will make the logs look cool
require("colors");

require("dotenv").config();

const dbConnect = require("./config/db");
dbConnect();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

const port = process.env.PORT || 5556;
app.listen(port, () =>
  console.log(`Server is up and running on port ${port}`.cyan)
);
