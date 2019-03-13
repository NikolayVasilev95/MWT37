const express = require('express');
var socket = require('socket.io');
var router = require('./router.js');

//App setup
const app = express();
const server = require('http').createServer(app);
server.listen(process.env.PORT || 4000 , function () {
  console.log('Server is up!');
});

//Socket setup
var io = socket(server);

io.on('connection', function (socket) {
  console.log('socket connection', socket.id);
  console.log('connection :', socket.request.connection._peername);

  //Handle chat event
  socket.on('chat', function (data) {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  });

  socket.on('online', function (data) {
    io.sockets.emit('online', data);
  });
});

// set the view engine to ejs
app.set('view engine', 'ejs');
// router file
app.use('/', router);
