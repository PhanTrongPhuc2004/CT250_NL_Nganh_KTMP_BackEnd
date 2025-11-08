// src/utils/socket.js
const socketIo = require('socket.io');

module.exports = (server, app) => {
    const io = socketIo(server, {
        cors: { origin: 'http://localhost:3000', credentials: true }
    });

    app.set('io', io); // Gắn io vào app

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // JOIN ROOM KHI ĐĂNG NHẬP
        socket.on('join', (maNguoiDung) => {
            socket.join(`user_${maNguoiDung}`);
            socket.join('public');
            console.log(`User ${maNguoiDung} joined rooms`);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};