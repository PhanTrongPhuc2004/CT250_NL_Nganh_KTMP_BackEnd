// Gọi các thư viện cần thiết
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./src/config/db');
const route = require('./src/routes/index.route');
const app = express();
const cors = require('cors');

// Kết nối đến cơ sở dữ liệu
db.connectDB();

// Cấu hình middleware cho ứng dụng
app.use('/data', express.static('data'));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Gán các route cho ứng dụng
route(app);

module.exports = app;
