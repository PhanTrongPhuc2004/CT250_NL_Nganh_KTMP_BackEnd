const MuaGiai = require('../models/MuaGiai.model');
const GiaiDau = require('../models/GiaiDau.model');

const createMuaGiai = async (data) => {
    const { maGiaiDau } = data;
    const giaiDau = await GiaiDau.findOne({ maGiaiDau });
    if (!giaiDau) throw new Error('Giải đấu không tồn tại');
    const muaGiai = new MuaGiai(data);
    return await muaGiai.save();
};

const getAllMuaGiai = async () => {
    return await MuaGiai.find();
};

const getMuaGiaiByMa = async (maMuaGiai) => {
    return await MuaGiai.findOne({ maMuaGiai });
};

const updateMuaGiai = async (maMuaGiai, data) => {
    return await MuaGiai.findOneAndUpdate({ maMuaGiai }, data, { new: true });
};

const deleteMuaGiai = async (maMuaGiai) => {
    return await MuaGiai.findOneAndDelete({ maMuaGiai });
};

module.exports = {
    createMuaGiai,
    getAllMuaGiai,
    getMuaGiaiByMa,
    updateMuaGiai,
    deleteMuaGiai,
};