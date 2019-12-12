const express = require("express");
const app = express();
var cors = require("cors");

//app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', "http://"+req.headers.host+':8100');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
  }
);
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

http.listen(80, function() {
  console.log("listening on *:80");
});

