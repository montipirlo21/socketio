﻿var socket = io();

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

socket.on('newLocationMessage', function (message) {
    console.log("newLocationMessage: " + JSON.stringify(message));
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(message.from + ":");
    a.attr('href', message.url);
    li.append(a)
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    },
        function () {
            messageTextBox.val('');
        });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text("Send Location");
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    }, function () {
        locationButton.removeAttr('disabled').text("Send Location");
        alert('Unable to fetch location');
    });
});

