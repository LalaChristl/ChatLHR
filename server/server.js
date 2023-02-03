const express = require("express");
const app = express();

const http = require("http")
const {Server} = require("socket.io")
const server = http.createServer(app)

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

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PATCH", "DELETE"]
  }
})
io.on("connection", (socket) => {
  console.log("User Connected", socket.id);
  
  socket.on("join_room", (data) => {
    socket.join(data)
  })
  socket.on("send_message", (data) => {
socket.to(data.room).emit("get_message", data)
  })

})


const port = process.env.PORT || 5556;
server.listen(port, () =>
  console.log(`Server is up and running on port ${port}`.cyan)
);
