const path=require('path');
const express=require('express');
const socketIO=require('socket.io');
const http=require('http')

//path.join is used to omit the relative path
const publicPath=path.join(__dirname,'../public');
var port=process.env.PORT || 3000;

var app=express();
var server=http.createServer(app);
var io=socketIO(server);


//use to define the middleware
app.use(express.static(publicPath));



//used to set up a new connection
io.on('connection',(socket)=>{
  console.log('new user connected');

//use to define our own events
// socket.emit('newMessage',{
//   from:'Andrew',
//   body:'I am sending this from server side',
//   createdAt:Date().toString()
// });


//greating the new User
socket.emit('newMessage',{
  from:'Admin',
  text:'Welcome to the chat!',
  createdAt:new Date().getTime()
});


//notifying other users that the new user has joined the chat room
socket.broadcast.emit('newMessage',{
  from:'Admin',
  text:'New user is joined',
  createdAt:new Date().getTime()

});


socket.on('createMessage',(message)=>{
  console.log(message);

  io.emit('newMessage',{
    from:message.from,
    text:message.text,
    createdAt:new Date().getTime()

  });

  // socket.broadcast.emit('newMessage',{
  //   from:message.from,
  //   text:message.text,
  //   createdAt:new Date().getTime()
  //
  // });

});


socket.on('disconnect',()=>{
  console.log('User was disconnected');
});


});




server.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
