var socket = io();

socket.on('connect',function() {
    console.log('Connected to Server');

    //Example client Emit 

    // socket.emit('createEmail',{
    //     to:'server',
    //     text:'testing',
    //     createdAt:234
    // });

    //new Message Listner
    socket.on('newMessage',function(nmsg){
        console.log("messageFrom Client",nmsg);
    });

    //emit msg from client to server
    socket.emit('createMessage',{
        from:"client@client.com",
        text:"hello all clients",
        createdAt:123
    });
});

socket.on('disconnect',function() {
    console.log('disconnected from server');
});

    //Example Listner for new email from server
    // socket.on('newEmail',function(email){
    // console.log('new Email',email);
    //});

