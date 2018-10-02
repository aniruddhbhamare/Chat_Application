var socket = io();

socket.on('connect',function() {
    console.log('Connected to Server');
    //new Message Listner
    socket.on('newMessage',function(msg){
        console.log("newMessage",msg);
    });

    //emit msg from client to server
    // socket.emit('createMessage',{
    //     from:"client@client.com",
    //     text:"hello all clients",
    //     createdAt:123
    // });
});

socket.on('disconnect',function() {
    console.log('disconnected from server');
});



