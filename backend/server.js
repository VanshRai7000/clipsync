const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('join-room', ({ roomId, userId }) => {
        
        socket.join(roomId);
        socket.to(roomId).emit('user-joined', userId);

        console.log(`User ${userId} is in room ${roomId}`);

        socket.on('send-edit', (data) => {
            console.log('Received edit:', data);
            socket.to(roomId).emit('receive-edit', data);
        });

        socket.on('disconnect', () => {
            console.log(`User ${userId} disconnected from room ${roomId}`);
            socket.to(roomId).emit('user-left', userId);
        });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
