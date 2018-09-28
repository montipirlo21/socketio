const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var { generateMessage } = require('./utils/message');
var { generateLocationMessage } = require('./utils/message');
var { isRealString } = require('./utils/validation');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New user connected");

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast. emit('newMessage', generateMessage('Admin', 'A new user joined the chat'));

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room required');
        } else {
            callback();
        }
    });


    socket.on('createEmail', (newEmail) => {
        console.log('createEmail ', newEmail);
    });

    socket.on('createMessage', (message ,callback) => {
        console.log('createMessage ', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
        // A tutti tranne il socket
        //socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
    });

    socket.on('createLocationMessage', (coords) => {      
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude ,coords.longitude));
        
    });

    socket.on('disconnect', () => {
        console.log('disconnect from the server');
    });
});


server.listen(port, () => {
    console.log("Server is up on port " + port);
});

// GithHub repo + push 
// Create and heroku application and deploy