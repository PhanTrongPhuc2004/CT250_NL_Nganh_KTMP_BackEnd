const { Server } = require('socket.io'); // ← BẮT BUỘC v4+
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

module.exports = (server, app) => {
    const io = new Server(server, {
        cors: {
            origin: true, // ← CHO PHÉP TẤT CẢ (Postman, FE, etc.)
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.use((socket, next) => {
        const cookies = cookie.parse(socket.request.headers.cookie || '');
        const token = cookies.token;
        if (!token) return next(new Error('Không có token'));
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decoded;
            next();
        } catch (err) {
            next(new Error('Token không hợp lệ'));
        }
    });

    io.on('connection', (socket) => {
        const userId = socket.user.maNguoiDung;

        // TỰ ĐỘNG JOIN – ĐẢM BẢO NHẬN THÔNG BÁO
        socket.join(`user_${userId}`);
        socket.join('public');

        console.log(`User ${userId} connected (auto-joined rooms)`);

        socket.on('disconnect', () => {
            console.log(`User ${userId} disconnected`);
        });
    });

    app.set('io', io);
    return io;
};