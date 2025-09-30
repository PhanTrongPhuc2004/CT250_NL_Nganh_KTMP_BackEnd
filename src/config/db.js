const mongoose = require('mongoose');

async function connectDB() {
  try {
    //đặt username và password như thế nhá
    await mongoose.connect(
      'mongodb://admin:adminPassword@127.0.0.1:27017/clubmanagement?authSource=admin'
    );
    console.log('Connected to DB:', mongoose.connection.name);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
}

module.exports = { connectDB };
