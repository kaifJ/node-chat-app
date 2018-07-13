const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');

var app = express();
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
  console.log('New user connected');

  socket.emit('newMessage',{
    from:'Admin',
    text:'Welcome to the chat app'
  });

  socket.broadcast.emit('newMessage',{
    from:'Admin',
    text:'New user joined'
  });

  socket.on('createMessage',(message)=>{
    console.log('New Message ',message);

    io.emit('newMessage',{
      from:message.from,
      text:message.text,
      createdAt:new Date().getTime()
    });
    // socket.broadcast.emit('newMessage',{
    //   from:message.from,
    //   text:message.text,
    //   createdAt:new Date().getTime()
    // });
  });

  socket.on('disconnect',()=>{
    console.log('disconnected from server');
  });
});



server.listen(port,()=>{
  console.log(`Server running on port ${port}`);
});
