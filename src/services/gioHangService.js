const GioHang = require("../models/GioHang");

class GioHangService {
  // 🧾 Lấy giỏ hàng theo tên đăng nhập
  async layGioHang(tenDangNhap) {
    let gioHang = await GioHang.findOne({ tenDangNhap });
    if (!gioHang) {
      gioHang = new GioHang({ tenDangNhap, mucHangs: [] });
      await gioHang.save();
    }
    return gioHang;
  }

  // ➕ Thêm sản phẩm vào giỏ hàng
  async themVaoGio(tenDangNhap, sanPham) {
    let gioHang = await GioHang.findOne({ tenDangNhap });
    if (!gioHang) gioHang = new GioHang({ tenDangNhap, mucHangs: [] });

    const tonTai = gioHang.mucHangs.find(
      (mh) => mh.maSanPham.toString() === sanPham.maSanPham
    );

    if (tonTai) {
      tonTai.soLuong += sanPham.soLuong;
    } else {
      gioHang.mucHangs.push(sanPham);
    }

    await gioHang.save();
    return gioHang;
  }

  // 🗑️ Xóa 1 sản phẩm
  async xoaMucHang(tenDangNhap, maSanPham) {
    const gioHang = await GioHang.findOne({ tenDangNhap });
    if (!gioHang) throw new Error("Không tìm thấy giỏ hàng");

    gioHang.mucHangs = gioHang.mucHangs.filter(
      (mh) => mh.maSanPham.toString() !== maSanPham
    );

    await gioHang.save();
    return gioHang;
  }

  // 🔄 Cập nhật số lượng sản phẩm
  async capNhatSoLuong(tenDangNhap, maSanPham, soLuong) {
    const gioHang = await GioHang.findOne({ tenDangNhap });
    if (!gioHang) throw new Error("Không tìm thấy giỏ hàng");

    const mucHang = gioHang.mucHangs.find(
      (mh) => mh.maSanPham.toString() === maSanPham
    );
    if (!mucHang) throw new Error("Không tìm thấy sản phẩm trong giỏ hàng");

    mucHang.soLuong = soLuong;
    await gioHang.save();
    return gioHang;
  }

  // 🧹 Xóa toàn bộ giỏ hàng
  async xoaTatCa(tenDangNhap) {
    await GioHang.findOneAndUpdate({ tenDangNhap }, { mucHangs: [] });
    return { message: "Đã xóa toàn bộ giỏ hàng" };
  }
}

module.exports = new GioHangService();
