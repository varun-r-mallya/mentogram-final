exports.chatserver = () => {
    const express = require('express');
    const http = require('http');
    const socketIo = require('socket.io');

    const app = express();
    const server = http.createServer(app);
    const io = socketIo(server, {
        cors: {
            origin: "*", // This will allow requests from any origin
        }
    });

    io.on('connection', (socket) => {
        console.log('Client connected');

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });

        socket.on('message', (message) => {
            console.log('Received message: ' + message);
            socket.emit('message', message); // broadcasting the message
        });

        socket.on('joinRoom', (room) => {
            socket.join(room);
            console.log('Client joined room: ' + room);
        });

        socket.on('leaveRoom', (room) => {
            socket.leave(room);
            console.log('Client left room: ' + room);
        });

        socket.on('roomMessage', (data) => {
            const { room, username, message } = data;
            const obj = {
                username,
                message
            };
            io.to(room).emit('roomMessage', obj); // broadcasting the room message to all clients in the room
        });

        socket.on('video', (data) => {
            const { room, username, peerId} = data;
            const obj = {
                username,
                peerId
            };
            
            socket.to(room).emit('videosend', obj); // emit only to the user whose username matches toUser
        }
        );
    });

    const PORT = process.env.PORT || 5001;
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}