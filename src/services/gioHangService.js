const GioHang = require("../models/GioHang");

class GioHangService {
  async getCartByUser(username) {
    return await GioHang.findOne({ tenDangNhap: username });
  }

  async saveCart(username, cartItems) {
    let gioHang = await GioHang.findOne({ tenDangNhap: username });
    if (gioHang) {
      gioHang.cartItems = cartItems;
    } else {
      gioHang = new GioHang({ tenDangNhap: username, cartItems });
    }
    return await gioHang.save();
  }

  async clearCart(username) {
    return await GioHang.deleteOne({ tenDangNhap: username });
  }

  async addItem(username, newItem) {
    let gioHang = await GioHang.findOne({ tenDangNhap: username });

    if (!gioHang) {
      gioHang = new GioHang({ tenDangNhap: username, cartItems: [newItem] });
    } else {
      const existing = gioHang.cartItems.find(
        (item) => item.maSanPham.toString() === newItem.maSanPham
      );

      if (existing) {
        existing.quantity += newItem.quantity;
      } else {
        gioHang.cartItems.push(newItem);
      }
    }

    return await gioHang.save();
  }

  async removeItem(username, maSanPham) {
    const gioHang = await GioHang.findOne({ tenDangNhap: username });
    if (!gioHang) return null;

    gioHang.cartItems = gioHang.cartItems.filter(
      (item) => item.maSanPham.toString() !== maSanPham
    );
    return await gioHang.save();
  }
}

module.exports = new GioHangService();
