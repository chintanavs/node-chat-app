var socket=io();
socket.on('connect',function (){
  console.log('connected to the server');

// socket.emit('createMessage',{
//   from:'client side',
//   body:'i am your client'
// });

});

socket.on('disconnect',function (){
  console.log('Disconnected to the server');
});

socket.on('newMessage',function (message){

  var formattedTime=moment(message.createdAt).format('h:mm a');
  console.log('message received',message);

  var li=jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}:${message.text}`);
  jQuery('#messages').append(li);

});

socket.on('newLocationMessage',function(message){
  var formattedTime=moment(message.createdAt).format('h:mm a');
  var li=jQuery('<li></li>');
  var a=jQuery('<a target=_blank>My current Location</a>');
  li.text(`${message.from} ${formattedTime}:`);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
})

// socket.emit('createMessage',{
//   text:'hi i am testing this app',
//   from:'client sided'
// },function (data){
//   console.log(data);
// });

jQuery('#message-form').on('submit',function (e){
  e.preventDefault();

  var messageTextbox=jQuery('[name=message]');

  socket.emit('createMessage',{
    text:messageTextbox.val(),
    from:'User'
  },function (){
    messageTextbox.val('');
  });

  });



var locationButton=jQuery('#send-location');
locationButton.on('click',function() {
  if(!navigator.geolocation){
      alert('Geolocation not supported by the browser!');
}

locationButton.attr('disabled','disabled').text('Sending Location..');

navigator.geolocation.getCurrentPosition(function(position){
  locationButton.removeAttr('disabled').text('Send Location');
  socket.emit('createLocationMessage',{
    latitude:position.coords.latitude,
    longitude:position.coords.longitude
  })
},function(){
  locationButton.removeAttr('disabled').text('Send Location');
  alert('unable to fetch the location');
});

});
