const ThongBao = require('../models/ThongBao.model');
const NguoiDung = require('../models/NguoiDung.model');

const guiThongBao = async (data, io) => {
    const { tieuDe, noiDung, loai, isPublic = false, danhSachNhanId, guiChoTatCa, maDoiHinh } = data;
    const nguoiGuiId = data.nguoiGuiId;

    let danhSachNhan = [];

    if (isPublic) {
        data.loaiNguoiNhan = 'congKhai';
        data.isPublic = true;
    } else {
        data.loaiNguoiNhan = 'noiBo';
        if (guiChoTatCa) {
            const cauThuList = await NguoiDung.find({ vaiTro: { $in: ['cauthu', 'huanluyenvien'] } });
            danhSachNhan = cauThuList.map(u => ({ nguoiNhan: u._id }));
        } else if (maDoiHinh) {
            // Giả định DoiHinh model có danhSachCauThu
            const DoiHinh = require('../models/DoiHinh.model');
            const doiHinh = await DoiHinh.findOne({ maDoiHinh });
            danhSachNhan = (doiHinh?.danhSachCauThu || []).map(id => ({ nguoiNhan: id }));
        } else if (danhSachNhanId?.length) {
            danhSachNhan = danhSachNhanId.map(id => ({ nguoiNhan: id }));
        }
    }

    const thongBao = new ThongBao({
        tieuDe, noiDung, loai, nguoiGui: nguoiGuiId,
        danhSachNhan, guiChoTatCa, maDoiHinh, isPublic
    });

    await thongBao.save();
    await thongBao.populate('nguoiGui', 'hoVaTen vaiTro');

    // Gửi real-time
    if (isPublic) {
        console.log('GỬI CÔNG KHAI:', thongBao.tieuDe);
        io.to('public').emit('thongBaoMoiCongKhai', thongBao);
    } else {
        danhSachNhan.forEach(item => {
            console.log('GỬI NỘI BỘ tới user_', item.nguoiNhan);
            io.to(`user_${item.nguoiNhan}`).emit('thongBaoMoiNoiBo', thongBao);
        });
    }

    return thongBao;
};

const layThongBaoGanNhat = async (userId, limit = 5) => {
    return await ThongBao.find({
        $or: [
            { guiChoTatCa: true, loaiNguoiNhan: 'noiBo' },
            { 'danhSachNhan.nguoiNhan': userId },
            { isPublic: true }
        ]
    })
        .populate('nguoiGui', 'hoVaTen vaiTro')
        .sort({ thoiGianTao: -1 })
        .limit(limit);
};

const layTatCaThongBao = async (userId, page = 1, limit = 10, loai = '') => {
    const skip = (page - 1) * limit;
    const filter = loai ? { loai } : {};

    const thongBaoList = await ThongBao.find({
        $or: [
            { guiChoTatCa: true, loaiNguoiNhan: 'noiBo', ...filter },
            { 'danhSachNhan.nguoiNhan': userId, ...filter },
            { isPublic: true, ...filter }
        ]
    })
        .populate('nguoiGui', 'hoVaTen vaiTro')
        .sort({ thoiGianTao: -1 })
        .skip(skip)
        .limit(limit);

    const total = await ThongBao.countDocuments({
        $or: [
            { guiChoTatCa: true, loaiNguoiNhan: 'noiBo', ...filter },
            { 'danhSachNhan.nguoiNhan': userId, ...filter },
            { isPublic: true, ...filter }
        ]
    });

    return {
        data: thongBaoList,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    };
};

const danhDauDaDoc = async (maThongBao, userId) => {
    return await ThongBao.updateOne(
        { maThongBao, 'danhSachNhan.nguoiNhan': userId },
        { $set: { 'danhSachNhan.$.daDoc': true, 'danhSachNhan.$.thoiGianDoc': new Date() } }
    );
};

const danhDauTatCaDaDoc = async (userId) => {
    const thongBaoList = await ThongBao.find({
        $or: [
            { guiChoTatCa: true, loaiNguoiNhan: 'noiBo' },
            { 'danhSachNhan.nguoiNhan': userId }
        ]
    });

    let updatedCount = 0;
    for (const tb of thongBaoList) {
        if (tb.danhSachNhan?.some(item =>
            item.nguoiNhan.toString() === userId.toString() && !item.daDoc
        )) {
            await danhDauDaDoc(tb.maThongBao, userId);
            updatedCount++;
        }
    }
    return updatedCount;
};

const demThongBaoChuaDoc = async (userId) => {
    const thongBaoList = await ThongBao.find({
        $or: [
            { guiChoTatCa: true, loaiNguoiNhan: 'noiBo' },
            { 'danhSachNhan.nguoiNhan': userId }
        ]
    });

    return thongBaoList.filter(tb =>
        tb.danhSachNhan.some(item =>
            item.nguoiNhan.toString() === userId.toString() && !item.daDoc
        )
    ).length;
};

module.exports = {
    guiThongBao,
    layThongBaoGanNhat,
    layTatCaThongBao,
    danhDauDaDoc,
    danhDauTatCaDaDoc,
    demThongBaoChuaDoc
};