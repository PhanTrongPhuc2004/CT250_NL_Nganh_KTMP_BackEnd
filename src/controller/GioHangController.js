const gioHangService = require("../services/gioHangService");

exports.layGioHang = async (req, res) => {
  try {
    const gioHang = await gioHangService.layGioHang(req.params.tenDangNhap);
    res.json(gioHang);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.themVaoGio = async (req, res) => {
  try {
    const { tenDangNhap, sanPham } = req.body;
    const gioHang = await gioHangService.themVaoGio(tenDangNhap, sanPham);
    res.json(gioHang);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.xoaMucHang = async (req, res) => {
  try {
    const { tenDangNhap, maSanPham } = req.params;
    const gioHang = await gioHangService.xoaMucHang(tenDangNhap, maSanPham);
    res.json(gioHang);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.capNhatSoLuong = async (req, res) => {
  try {
    const { tenDangNhap, maSanPham } = req.params;
    const { soLuong } = req.body;
    const gioHang = await gioHangService.capNhatSoLuong(tenDangNhap, maSanPham, soLuong);
    res.json(gioHang);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.xoaTatCa = async (req, res) => {
  try {
    const result = await gioHangService.xoaTatCa(req.params.tenDangNhap);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
