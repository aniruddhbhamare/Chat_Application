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
//create newMessage Emit
// socket.emit('newMessage',{
//     to:"client@client.com",
//     text:"hello client"
// });
//createMessage Listner

socket.emit('newMessage',{
    from:'admin',
    text:'welcome to the chat app',
    createdAt:new Date().getTime()
});

socket.broadcast.emit('newMessage',{
    from:'admin',
    text:'new user join',
    createdAt:new Date().getTime()

});


socket.on('createMessage',function(msg){
    console.log("incoming createdMessage from client",msg);
    io.emit('newMessage',{
        from:msg.from,
        createdAt:new Date().getTime(),
        text:msg.text
    });
   //-------------------------- brodcastMessage
    // socket.broadcast.emit('newMessage',{
    //     from:msg.from,
    //     text:msg.text,
    //     createdAt:msg.createdAt
    // });
});

 socket.on('disconnect',()=>{
     console.log('User was disconnected');
 });
 

});


server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
