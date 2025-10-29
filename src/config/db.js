// const mongoose = require('mongoose');

// async function connectDB() {
//   try {
//     //đặt username và password như thế nhá
//     await mongoose.connect('mongodb://127.0.0.1:27017/clubmanagement');
//     console.log('Connected to DB:', mongoose.connection.name);
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('MongoDB connection error:', error.message);
//   }
// }

// module.exports = { connectDB };

const mongoose = require('mongoose');

async function connectDB() {
  try {
    // ✅ Kết nối MongoDB local KHÔNG cần username/password
    await mongoose.connect('mongodb://127.0.0.1:27017/clubmanagement', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log('Connected to DB:', mongoose.connection.name);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
}

module.exports = { connectDB };
