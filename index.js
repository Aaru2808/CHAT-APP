const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

io.on("connection", (socket) => {
  socket.on("user-message", (data) => {
    // Broadcast to all including sender
    io.emit("message", data);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

server.listen(9000, () => {
  console.log("Server Started at PORT:9000");
});
