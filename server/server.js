const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage,generateLocationMessage} = require('./utils/message');
var publicPath = path.join(__dirname + '/../public');
var port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
console.log('New User is Connected!');
//create newMessage Emit
// socket.emit('newMessage',{
//     to:"client@client.com",
//     text:"hello client"
// });
//createMessage Listner

socket.emit('newMessage',
// {   from:'admin',
//     text:'welcome to the chat app',
//     createdAt:new Date().getTime()
// }
generateMessage('Admin','Welcome To The Chat App'));

socket.broadcast.emit('newMessage',generateMessage('Admin','New User Join Chat'));

socket.on('createMessage',(msg,callback)=>{
    console.log("incoming createdMessage from client",msg);
    io.emit('newMessage',generateMessage(msg.from,msg.text));
    callback("This is from the server");
   //-------------------------- brodcastMessage
    // socket.broadcast.emit('newMessage',{
    //     from:msg.from,
    //     text:msg.text,
    //     createdAt:msg.createdAt
    // });
});
//location listner
socket.on('createLocationMessage',(location)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin',location.latitude,location.longitude));
});



 socket.on('disconnect',()=>{
     console.log('User was disconnected');
 });
});




server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
