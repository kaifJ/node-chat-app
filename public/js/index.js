var socket = io();

socket.on('connect', function(){
  console.log('Connected to server');

  socket.emit('createMessage',{
    from:'andrew',
    text:'nothing much man , just teaching'
  });
});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

socket.on('newMessage',function(message){
  console.log('New Message arrived ',message);
});
