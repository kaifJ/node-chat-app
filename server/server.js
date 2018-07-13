const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
var {generateMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');

var app = express();
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
  console.log('New user connected');

  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

  socket.on('createMessage',(message,callback)=>{
    console.log('New Message ',message);

    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
  });

  socket.on('disconnect',()=>{
    console.log('disconnected from server');
  });
});



server.listen(port,()=>{
  console.log(`Server running on port ${port}`);
});
