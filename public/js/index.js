var socket = io();

socket.on('connect', function(){
  console.log('Connected to server');
});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

socket.on('newMessage',function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    from:message.from,
    text:message.text,
    createdAt:formattedTime
  });

  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');

  var template = jQuery('#location-template').html();
  var html = Mustache.render(template,{
    from:message.from,
    url:message.url,
    createdAt:formattedTime
  });

  jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  var messageTextBox = jQuery('[name=message]');
  socket.emit('createMessage',{
    from:'User',
    text:messageTextBox.val()
  },function(){
    messageTextBox.val('');
  });
});

//Sending Location
var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Browser does not support geolocation');
  }

  locationButton.attr('disabled','disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createMessageLocation',{

      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    },function(){
      locationButton.removeAttr('disabled').text('Send Location');
    });
  },function(){
    locationButton.removeAttr('disabled').text('Send Location');
    return alert('Cannot find the location');
  });
});
