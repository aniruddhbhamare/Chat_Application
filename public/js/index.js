var socket = io();

socket.on('connect',function() {
    console.log('Connected to Server');
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

//callbackExample
// socket.emit('createMessage',{
//     from:'XYZ',
//     text:'hi'
// },function(data){
//     console.log('Got It ,',data);
// });

 //new Message Listner
 socket.on('newMessage',function(msg){
    console.log("newMessage",msg);
    var li = jQuery('<li></li>');
    li.text(`${msg.from}: ${msg.text}`) 
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
     
    socket.emit('createMessage',{
        from:'User',
        text:jQuery('[name=message]').val()
    },function(){

    }); 
});

