const jwt = require('jsonwebtoken');
const NguoiDung = require('../models/NguoiDung');
const mongoose = require('mongoose');
async function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Chưa đăng nhập' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await NguoiDung.findOne({ maNguoiDung: decoded.maNguoiDung }).lean();
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token không hợp lệ hoặc hết hạn' });
  }
}

module.exports = authMiddleware;
