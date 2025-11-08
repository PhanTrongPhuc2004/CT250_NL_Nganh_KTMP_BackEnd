// src/middlewares/roleMiddleware.js

/**
 * Middleware kiểm tra vai trò người dùng
 * YÊU CẦU: authMiddleware phải chạy TRƯỚC
 * Dựa hoàn toàn vào req.user.vaiTro (đã có từ authMiddleware)
 */
const roleMiddleware = (...allowedRoles) => {
  // console.log('goi rolemiddleware');
  return (req, res, next) => {
    // BƯỚC 1: Kiểm tra đăng nhập
    if (!req.user) {
      return res.status(401).json({ message: 'Chưa đăng nhập' });
    }

    // BƯỚC 2: Lấy vai trò từ req.user
    const userRole = req.user.vaiTro;

    if (!userRole) {
      return res.status(403).json({
        message: 'Không xác định được vai trò người dùng',
      });
    }

    // BƯỚC 3: Kiểm tra quyền
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: 'Không có quyền truy cập',
        required: allowedRoles,
        current: userRole,
      });
    }

    // BƯỚC 4: Cho qua
    next();
  };
};

// HÀM TIỆN ÍCH
roleMiddleware.isAdmin = () => roleMiddleware('admin');
roleMiddleware.isNguoiHamMo = () => roleMiddleware('nguoihammo');
roleMiddleware.isCauThu = () => roleMiddleware('cauthu');
roleMiddleware.isHuanLuyenVien = () => roleMiddleware('huanluyenvien');

module.exports = roleMiddleware;
