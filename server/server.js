const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {isRealString} =require('./utils/validation');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {Users} = require('./utils/users');

var publicPath = path.join(__dirname + '/../public');
var port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
console.log('New User is Connected!');
//create newMessage Emit
// socket.emit('newMessage',{
//     to:"client@client.com",
//     text:"hello client"
// });
//createMessage Listner

// socket.emit('newMessage',generateMessage('Admin','Welcome To The Chat App'));
// socket.broadcast.emit('newMessage',generateMessage('Admin','New User Join Chat'));



socket.on('join',(params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)){
       return callback('Name and Room are Required');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);

    io.to(params.room).emit('updateUserList',users.getUserList(params.room));

    socket.emit('newMessage',generateMessage('Admin','Welcome To The Chat App'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
    callback();
});

socket.on('createMessage',(msg,callback)=>{
    console.log("incoming createdMessage from client",msg);
    var user = users.getUser(socket.id);
    if(user && isRealString(msg.text)){
        io.to(user.room).emit('newMessage',generateMessage(user.name,msg.text));    
    }

    callback();
   //-------------------------- brodcastMessage
    // socket.broadcast.emit('newMessage',{
    //     from:msg.from,
    //     text:msg.text,
    //     createdAt:msg.createdAt
    // });
});
//location listner
socket.on('createLocationMessage',(location)=>{
    var user = users.getUser(socket.id);
    if(user){
        console.log(user.name);
        io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,location.latitude,location.longitude));
    }
});



 socket.on('disconnect',()=>{
     //console.log('User was disconnected');
     var user = users.removeUser(socket.id);

     if(user){
         io.to(user.room).emit('updateUserList',users.getUserList(user.room));
         io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`));
     }
 });
});




server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
