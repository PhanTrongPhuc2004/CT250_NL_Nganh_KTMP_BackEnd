const tranDauService = require('../services/tranDauService');
const tapLuyenService = require('../services/tapLuyenService');
const doiHinhService = require('../services/doiHinhService');

class TranDauController {
  // [POST] api/trandau
  async createTranDau(req, res) {
    try {
      const newTranDau = await tranDauService.createTranDau(req.body);

      res.status(201).json(newTranDau);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // [GET] api/trandau
  async getAllTranDaus(req, res) {
    try {
      const tranDaus = await tranDauService.getAllTranDaus();
      res.status(200).json(tranDaus);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // [GET] api/trandau/:id
  async getTranDauById(req, res) {
    try {
      const tranDau = await tranDauService.getTranDauById(req.params.id);

      if (!tranDau) {
        return res.status(404).json({ message: 'Trận đấu không tìm thấy' });
      }
      res.status(200).json(tranDau);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // [PUT] api/trandau/:id
  async updateTranDau(req, res) {
    try {
      const updatedTranDau = await tranDauService.updateTranDau(req.params.id, req.body);
      if (!updatedTranDau) {
        return res.status(404).json({ message: 'Trận đấu không tìm thấy' });
      }
      res.status(200).json(updatedTranDau);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // [DELETE] api/trandau/:id
  async deleteTranDau(req, res) {
    try {
      const deletedTranDau = await tranDauService.deleteTranDau(req.params.id);
      if (!deletedTranDau) {
        return res.status(404).json({ message: 'Trận đấu không tìm thấy' });
      }
      res.status(200).json({ message: 'Xóa trận đấu thành công' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  //get lich tap theo id tran dau
  //[GET] /trandau/:id/lichtap

  async getLichTapByTranDauId(req, res) {
    try {
      const lichTap = await tapLuyenService.getLichTapByTranDauId(req.params.id);

      if (!lichTap) {
        return res.status(400).json({ message: 'Không tìm thấy lịch tập' });
      }

      res.status(200).json(lichTap);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  //[GET] /trandau/:id/full
  //lay toan bo thong tin cua tran dau
  async getFullTranDau(req, res) {
    try {
      const tranDau = await tranDauService.getTranDauById(req.params.id);
      const lichTapLuyens = await tapLuyenService.getLichTapByTranDauId(req.params.id);
      const doiHinh = await doiHinhService.getDetailDoiHinh(tranDau.doiHinhId);
      if (!tranDau) {
        return res.status(404).json({ message: 'Trận đấu không tìm thấy' });
      }
      res.status(200).json({ trandau: tranDau, lichtapluyen: lichTapLuyens, doiHinh: doiHinh });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  //)
}

module.exports = new TranDauController();
