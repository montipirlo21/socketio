var socket = io();

socket.on('connect', function () {
    console.log('connected to server');

    //socket.emit('createEmail',
    //    {
    //        to: "davide.monticelli@hotmail.it",
    //        text: "Hello"
    //    });


});

socket.on('disconnect', function () {
    console.log('disconnect from the server');
});

socket.on('newEmail', function (data) {
    console.log("New email: " + JSON.stringify(data));
});

socket.on('newMessage', function (message) {
    //console.log("New Message: " + JSON.stringify(message));
    var li = jQuery('<li></li>');
    li.text(message.from + ": " + message.text);
    jQuery('#messages').append(li);
});

//socket.emit('createMessage', {
//    from: "Montic",
//    text: "Hi"
//}, function (data) {
//    console.log('got it!', data);
//});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    },
        function (data) {
            console.log('got it!', data);
        });
});