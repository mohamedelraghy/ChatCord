const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrUser} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set Static Folder 
app.use(express.static(path.join(__dirname, 'public'))); 

const botName = 'Chat Cord Bot';

// Run when client connect
io.on('connection', socket => {
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room); 

        socket.join(user.room);

        socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

        // Broadcast when a user connects
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, 'A user has joined the chat'));
 
    });

    
    // Run when client disconnect
    socket.on('chatMessage', msg => {
        io.emit('message', formatMessage('User', msg)); 
    });
    
    //welcome current user
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has left the chat'));
    });
});


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});