const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
var {generateMessage} = require('./utils/message');
var {generateLocationMessage} = require('./utils/message');
var {isRealString} = require('./utils/validate');
var {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');

var app = express();
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on('connection',(socket)=>{
  console.log('New user connected');



  socket.on('join',(params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and Room are required ');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);

    io.to(params.room).emit('updatedUserList',users.getUserList(params.room));

    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined the chat`));

    callback();
  });

  socket.on('createMessage',(message,callback)=>{
    console.log('New Message ',message);

    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
  });

  socket.on('createMessageLocation',(coords,callback)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    callback();
  });

  socket.on('disconnect',()=>{
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updatedUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left the chat`));
    }
  });
});



server.listen(port,()=>{
  console.log(`Server running on port ${port}`);
});
