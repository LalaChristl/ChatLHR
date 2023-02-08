const express = require("express");
const app = express();

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

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

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});
io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });
  // console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("get_message", data);
  });
});

app.use("/users", userRouter);

const port = process.env.PORT || 5556;
server.listen(port, () =>
  console.log(`Server is up and running on port ${port}`.cyan)
);
