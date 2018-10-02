const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var publicPath = path.join(__dirname + '/../public');
var port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
console.log('New User is Connected!');

//Example Emit newEmail from Cl
// socket.emit('newEmail',{
//     from:"sender@email.com",
//     text:"hello user",
//     createdAt:124
// });

//Example Listner form Client mesgs
//socket.on('createEmail',function(newEmail){
//console.log('createEmail',newEmail);
//});

//create newMessage Emit
socket.emit('newMessage',{
    to:"client@client.com",
    text:"hello client"
});


//createMessage Listner
socket.on('createMessage',function(msg){
    console.log("incoming createdMessage from client",msg);
});

 socket.on('disconnect',()=>{
     console.log('User was disconnected');
 });   
});

server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
