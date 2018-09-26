const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New user connected");

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'A new user joined the chat',
        createAt: new Date().getTime()
    });

    //socket.emit('newEmail', {
    //    from: "davide.monticelli@hotmail.it",
    //    text: "Hello",
    //    createAt : 123
    //});

    //socket.emit('newMessage', {
    //    from: "montipirlo",
    //    text: "Hello",
    //    createAt: 123
    //});

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail ', newEmail);
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage ', message);

         io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        });

        // A tutti tranne il socket
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        });

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