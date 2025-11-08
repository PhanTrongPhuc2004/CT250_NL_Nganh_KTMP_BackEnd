const KetQuaTranDau = require('../models/KetQuaTranDau.model');
const CauThu = require('../models/cauthu');
const ketQuaTranDauService = require('../services/ketQuaTranDauService');
class KetQuaTranDauController {
  async createKetQuaTranDau(req, res) {
    try {
      const ketQuaTranDau = await KetQuaTranDau.create(req.body);
      res.status(201).json(ketQuaTranDau);
    } catch (error) {
      console.log(error);
    }
  }
  async getAllKetQuaTranDau(req, res) {
    try {
      const ketQuaTranDau = await KetQuaTranDau.find();
      res.status(200).json(ketQuaTranDau);
    } catch (error) {
      console.log(error);
    }
  }

  async getKetQuaTranDauById(req, res) {
    try {
      const ketQuaTranDau = await KetQuaTranDau.findById(req.params.id);
      if (!ketQuaTranDau) {
        return res.status(404).json({ message: 'KetQuaTranDau not found' });
      }
      res.status(200).json(ketQuaTranDau);
    } catch (error) {
      console.log(error);
    }
  }

  async updateKetQuaTranDau(req, res) {
    console.log('goi ket qua tran dau', req.body);
    try {
      const ketQuaTranDau = await ketQuaTranDauService.updateKetQuaTranDau(req.params.id, req.body);
      if (!ketQuaTranDau) {
        return res.status(404).json({ message: 'KetQuaTranDau not found' });
      }
      res.status(200).json(ketQuaTranDau);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteKetQuaTranDau(req, res) {
    try {
      const ketQuaTranDau = await KetQuaTranDau.findByIdAndDelete(req.params.id);
      if (!ketQuaTranDau) {
        return res.status(404).json({ message: 'KetQuaTranDau not found' });
      }
      res.status(200).json({ message: 'KetQuaTranDau deleted' });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new KetQuaTranDauController();
