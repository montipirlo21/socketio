var socket = io();

socket.on('connect', function () {
    console.log('connected to server');

    //socket.emit('createEmail',
    //    {
    //        to: "davide.monticelli@hotmail.it",
    //        text: "Hello"
    //    });

    //socket.emit('createMessage',
    //    {
    //        from: "montic",
    //        text: "Hello Hello"
    //    });
});

socket.on('disconnect', function () {
    console.log('disconnect from the server');
});

socket.on('newEmail', function (data) {
    console.log("New email: " + JSON.stringify(data));
});

socket.on('newMessage', function (message) {
    console.log("New Message: " + JSON.stringify(message));
});