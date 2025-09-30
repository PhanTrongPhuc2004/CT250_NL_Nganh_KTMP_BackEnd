const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./config/db');

const app = express();
//connect db
db.connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});

module.exports = app;
