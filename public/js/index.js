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
