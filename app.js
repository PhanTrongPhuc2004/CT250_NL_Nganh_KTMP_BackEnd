const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./src/config/db');
const route = require('./src/routes/index.route');
const app = express();
const cors = require('cors');
//connect db
db.connectDB();
app.use('/data', express.static('data'));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

route(app);
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});

module.exports = app;
