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
   
    var template = jQuery('#message_template').html();
    var html = Mustache.render(template,{
        text:msg.text,
        from:msg.from,
        createdAt:msg.createdAt
    });
   
   jQuery("#messages").append(html);
    // var li = jQuery('<li></li>');
    // li.text(`${msg.from} ${msg.createdAt}  :   ${msg.text}`) 
    // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
     
    socket.emit('createMessage',{
        from:'User',
        text:jQuery('[name=message]').val()
    },function(){
        jQuery('[name=message]').val('')
    }); 
});

socket.on('newLocationMessage',function(msg){
    // var li = jQuery('<li></li>');
    // var a =jQuery('<a target="_blank">My Current Location</a>');
    // li.text(`${msg.from} ${msg.createdAt} :`);
    // a.attr('href',msg.url);
    // li.append(a);
    // jQuery('#messages').append(li);
    var template = jQuery("#location-message-template").html();
    var html = Mustache.render(template,{
        url:msg.url,
        from:msg.from,
        createdAt:msg.createdAt
    });
    jQuery("#messages").append(html);
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('your browser is not supported for geolocation !');
    }
    locationButton.attr('disabled','disabled').text('Sending location...');
    
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('send location');
        console.log(position);
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('unable to featch loaction');
    });
});