const GioHangService = require("../services/GioHangService");


class GioHangController {
  async getCart(req, res) {
    try {
      const username = req.params.tenDangNhap;
      const gioHang = await GioHangService.getCartByUser(username);
      res.status(200).json(gioHang || { cartItems: [] });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy giỏ hàng", error: error.message });
    }
  }

  async saveCart(req, res) {
    try {
      const { tenDangNhap, cartItems } = req.body;
      if (!tenDangNhap || !cartItems)
        return res.status(400).json({ message: "Thiếu dữ liệu gửi lên" });

      const gioHang = await GioHangService.saveCart(tenDangNhap, cartItems);
      res.status(200).json({ message: "Đã lưu giỏ hàng thành công", gioHang });
    } catch (error) {
      res.status(500).json({ message: "Không thể lưu giỏ hàng", error: error.message });
    }
  }

  async addItem(req, res) {
    try {
      const { tenDangNhap, item } = req.body;
      if (!tenDangNhap || !item)
        return res.status(400).json({ message: "Thiếu thông tin sản phẩm" });

      const gioHang = await GioHangService.addItem(tenDangNhap, item);
      res.status(200).json({ message: "Đã thêm sản phẩm vào giỏ", gioHang });
    } catch (error) {
      res.status(500).json({ message: "Không thể thêm sản phẩm", error: error.message });
    }
  }

  async removeItem(req, res) {
    try {
      const { tenDangNhap, maSanPham } = req.params;
      const gioHang = await GioHangService.removeItem(tenDangNhap, maSanPham);
      res.status(200).json({ message: "Đã xóa sản phẩm khỏi giỏ", gioHang });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi xóa sản phẩm", error: error.message });
    }
  }

  async clearCart(req, res) {
    try {
      const username = req.params.tenDangNhap;
      await GioHangService.clearCart(username);
      res.status(200).json({ message: "Đã xóa toàn bộ giỏ hàng" });
    } catch (error) {
      res.status(500).json({ message: "Không thể xóa giỏ hàng", error: error.message });
    }
  }
}

module.exports = new GioHangController();
