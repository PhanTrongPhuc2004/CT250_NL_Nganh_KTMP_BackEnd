// src/services/thongBaoService.js
const ThongBao = require('../models/ThongBao.model');
const NguoiDung = require('../models/NguoiDung.model');

const guiThongBao = async (data, io) => {
    const {
        tieuDe,
        noiDung,
        loai = 'khac',
        isPublic = false,
        danhSachNhanMa = [],
        guiChoTatCa = false,
        maDoiHinh
    } = data;

    const maNguoiGui = data.maNguoiGui;

    if (!maNguoiGui) throw new Error('Thiếu mã người gửi');
    if (!tieuDe || !noiDung) throw new Error('Tiêu đề và nội dung là bắt buộc');

    let danhSachNhan = [];

    if (isPublic) {
        data.loaiNguoiNhan = 'congKhai';
    } else {
        data.loaiNguoiNhan = 'noiBo';

        if (guiChoTatCa) {
            // Gửi cho tất cả cầu thủ + HLV
            const list = await NguoiDung.find(
                { vaiTro: { $in: ['cauthu', 'huanluyenvien'] } },
                { maNguoiDung: 1 }
            );
            danhSachNhan = list.map(u => ({ maNguoiNhan: u.maNguoiDung }));
        } else if (maDoiHinh) {
            // Gửi theo đội hình
            const DoiHinh = require('../models/DoiHinh.model');
            const doiHinh = await DoiHinh.findOne({ maDoiHinh }, { danhSachCauThu: 1 });
            if (doiHinh && doiHinh.danhSachCauThu) {
                danhSachNhan = doiHinh.danhSachCauThu.map(ma => ({ maNguoiNhan: ma }));
            }
        } else if (danhSachNhanMa.length > 0) {
            // Gửi theo danh sách mã
            danhSachNhan = danhSachNhanMa.map(ma => ({ maNguoiNhan: ma }));
        } else {
            throw new Error('Phải chọn người nhận, đội hình hoặc gửi cho tất cả');
        }
    }

    // Tạo thông báo
    const thongBao = await ThongBao.create({
        tieuDe,
        noiDung,
        loai,
        maNguoiGui,
        danhSachNhan,
        guiChoTatCa,
        maDoiHinh,
        isPublic,
        loaiNguoiNhan: data.loaiNguoiNhan
    });

    // Gửi real-time
    if (isPublic) {
        io.to('public').emit('thongBaoMoiCongKhai', thongBao);
    } else {
        danhSachNhan.forEach(item => {
            const room = `user_${item.maNguoiNhan}`;
            io.to(room).emit('thongBaoMoiNoiBo', thongBao);
        });
    }

    return thongBao;
};

/**
 * LẤY THÔNG BÁO GẦN NHẤT
 */
const layThongBaoGanNhat = async (maNguoiDung, limit = 5) => {
    return await ThongBao.find({
        $or: [
            { guiChoTatCa: true, loaiNguoiNhan: 'noiBo' },
            { 'danhSachNhan.maNguoiNhan': maNguoiDung },
            { isPublic: true }
        ]
    })
        .sort({ thoiGianTao: -1 })
        .limit(limit)
        .lean();
};

/**
 * LẤY TẤT CẢ THÔNG BÁO (PHÂN TRANG)
 */
const layTatCaThongBao = async (maNguoiDung, page = 1, limit = 10, loai = '') => {
    const skip = (page - 1) * limit;
    const filter = loai ? { loai } : {};

    const query = {
        $or: [
            { guiChoTatCa: true, loaiNguoiNhan: 'noiBo', ...filter },
            { 'danhSachNhan.maNguoiNhan': maNguoiDung, ...filter },
            { isPublic: true, ...filter }
        ]
    };

    const [data, total] = await Promise.all([
        ThongBao.find(query)
            .sort({ thoiGianTao: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        ThongBao.countDocuments(query)
    ]);

    return {
        data,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / limit)
        }
    };
};

/**
 * ĐÁNH DẤU ĐÃ ĐỌC 1 THÔNG BÁO
 */
const danhDauDaDoc = async (maThongBao, maNguoiDung) => {
    return await ThongBao.updateOne(
        {
            maThongBao,
            'danhSachNhan.maNguoiNhan': maNguoiDung,
            'danhSachNhan.daDoc': false
        },
        {
            $set: {
                'danhSachNhan.$.daDoc': true,
                'danhSachNhan.$.thoiGianDoc': new Date()
            }
        }
    );
};

/**
 * ĐÁNH DẤU TẤT CẢ ĐÃ ĐỌC
 */
const danhDauTatCaDaDoc = async (maNguoiDung) => {
    const result = await ThongBao.updateMany(
        {
            $or: [
                { guiChoTatCa: true, loaiNguoiNhan: 'noiBo' },
                { 'danhSachNhan.maNguoiNhan': maNguoiDung }
            ],
            'danhSachNhan.maNguoiNhan': maNguoiDung,
            'danhSachNhan.daDoc': false
        },
        {
            $set: {
                'danhSachNhan.$[elem].daDoc': true,
                'danhSachNhan.$[elem].thoiGianDoc': new Date()
            }
        },
        {
            arrayFilters: [{ 'elem.maNguoiNhan': maNguoiDung, 'elem.daDoc': false }]
        }
    );

    return result.modifiedCount;
};

/**
 * ĐẾM THÔNG BÁO CHƯA ĐỌC
 */
const demThongBaoChuaDoc = async (maNguoiDung) => {
    const result = await ThongBao.aggregate([
        {
            $match: {
                $or: [
                    { guiChoTatCa: true, loaiNguoiNhan: 'noiBo' },
                    { 'danhSachNhan.maNguoiNhan': maNguoiDung }
                ]
            }
        },
        { $unwind: '$danhSachNhan' },
        {
            $match: {
                'danhSachNhan.maNguoiNhan': maNguoiDung,
                'danhSachNhan.daDoc': false
            }
        },
        { $count: 'chuaDoc' }
    ]);

    return result[0]?.chuaDoc || 0;
};

module.exports = {
    guiThongBao,
    layThongBaoGanNhat,
    layTatCaThongBao,
    danhDauDaDoc,
    danhDauTatCaDaDoc,
    demThongBaoChuaDoc
};