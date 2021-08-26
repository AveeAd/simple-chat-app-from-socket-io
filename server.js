const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT || 5000;

app.use(express.static("dist"));
app.use("/css", express.static(__dirname + "dist/css"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log(msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => console.log(`server listening on port ${port}`));
