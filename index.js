const express = require("express");
const app = express();
var cors = require("cors");

app.use(cors());
var http = require("http").createServer(app);
var io = require("socket.io")(http);

const roomCounts = {};

io.on("connection", function(socket) {
  socket.join(socket.handshake.query.sessionId);

  socket.on("paused", function(msg) {
    io.sockets.in(socket.handshake.query.sessionId).emit("paused", msg);
  });

  socket.on("playing", function(msg) {
    io.sockets.in(socket.handshake.query.sessionId).emit("playing", msg);
  });
});

http.listen(8080, function() {
  console.log("listening on *:80");
});

