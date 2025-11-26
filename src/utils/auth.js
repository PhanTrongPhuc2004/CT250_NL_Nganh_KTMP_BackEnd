const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateTokens = (nguoidung) => {
  // Access Token - hết hạn nhanh (ví dụ: 15 phút)
  const accessToken = jwt.sign(
    {
      maNguoiDung: nguoidung.maNguoiDung,
      tenDangNhap: nguoidung.tenDangNhap,
      vaiTro: nguoidung.vaiTro,
    },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  // Refresh Token - hết hạn chậm (ví dụ: 7 ngày)
  const refreshToken = jwt.sign(
    {
      maNguoiDung: nguoidung.maNguoiDung,
      type: 'refresh', // Phân biệt với access token
    },
    process.env.JWT_REFRESH_SECRET, // Dùng secret khác cho refresh token
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

module.exports = { generateTokens };
