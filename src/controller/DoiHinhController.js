const doiHinhService = require('../services/doiHinhService');

class DoiHinhController {
  async createDoiHinh(req, res) {
    console.log('tao doi hinh', req.body);
    try {
      const doiHinh = await doiHinhService.createDoiHinh(req.body);
      res.status(201).json(doiHinh);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllDoiHinh(req, res) {
    try {
      const doiHinhs = await doiHinhService.getAllDoiHinh();
      res.status(200).json(doiHinhs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getDoiHinhById(req, res) {
    try {
      const { id } = req.params;
      const doiHinh = await doiHinhService.getDoiHinhById(id);
      if (!doiHinh) {
        return res.status(404).json({ message: 'DoiHinh not found' });
      }
      res.status(200).json(doiHinh);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateDoiHinh(req, res) {
    try {
      const { id } = req.params;
      const updatedDoiHinh = await doiHinhService.updateDoiHinh(id, req.body);
      if (!updatedDoiHinh) {
        return res.status(404).json({ message: 'DoiHinh not found' });
      }
      res.status(200).json(updatedDoiHinh);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteDoiHinh(req, res) {
    try {
      const { id } = req.params;
      const deletedDoiHinh = await doiHinhService.deleteDoiHinh(id);
      if (!deletedDoiHinh) {
        return res.status(404).json({ message: 'DoiHinh not found' });
      }
      res.status(200).json({ message: 'DoiHinh deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getDetailDoiHinh(req, res) {
    console.log('get detail doi hinh');
    try {
      const { id } = req.params;
      const detailDoiHinh = await doiHinhService.getDetailDoiHinh(id);
      console.log(detailDoiHinh);
      if (!detailDoiHinh) {
        console.log('khong tim thay doi hinh');
      } else res.status(200).json(detailDoiHinh);
    } catch (err) {
      console.log(err);
    }
  }

  async getDoiHinhByMaDoiBong(req, res) {
    console.log('lay sanh sach doi hinh');
    const maDoiBong = req.params.maDoiBong;
    try {
      const doihinhs = await doiHinhService.getDoiHinhByMaDoiBong(maDoiBong);
      if (!doihinhs) {
        res.status(404).json('Không có đội hình');
      }
      console.log(doihinhs);
      res.json(doihinhs);
    } catch (error) {
      console.log(error);
    }
  }

  async getDoiHinhByMaDoiBong(req, res) {
    const { maDoiBong } = req.params;
    const list = await DoiHinh.find({ maDoiBong });
    res.json(list);
  }
}

module.exports = new DoiHinhController();
