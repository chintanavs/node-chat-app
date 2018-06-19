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
  console.log('message received',message);

  var li=jQuery('<li></li>');
  li.text(`${message.from}:${message.text}`);
  jQuery('#messages').append(li);

});

socket.on('newLocationMessage',function(message){
  var li=jQuery('<li></li>');
  var a=jQuery('<a target=_blank>My current Location</a>');
  li.text(`${message.from}:`);
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

  socket.emit('createMessage',{
    text:jQuery('[name=message]').val(),
    from:'jQuery sided'
  },function (){

  });

  });



var locationButton=jQuery('#send-location');
locationButton.on('click',function() {
  if(!navigator.geolocation){
      alert('Geolocation not supported by the browser!');
}

navigator.geolocation.getCurrentPosition(function(position){
  socket.emit('createLocationMessage',{
    latitude:position.coords.latitude,
    longitude:position.coords.longitude
  })
},function(){
  alert('unable to fetch the location');
});

});
