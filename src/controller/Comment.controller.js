const CommentService = require("../services/Comment.service");

module.exports = {
  addComment: async (req, res) => {
    try {
      // Nếu client gửi URL ảnh, sẽ là array string
      const images = req.body.images || [];

      const data = {
        productId: req.body.productId,
        userName: req.body.userName,
        rating: req.body.rating,
        content: req.body.content,
        images, // array các URL ảnh
      };

      const result = await CommentService.addComment(data);
      res.status(200).json({ message: "Thêm đánh giá thành công!", data: result });
    } catch (err) {
      console.error("❌ Lỗi thêm bình luận:", err);
      res.status(500).json({ message: err.message });
    }
  },

  getComments: async (req, res) => {
    try {
      const productId = req.params.id;
      const comments = await CommentService.getCommentsByProduct(productId);
      res.status(200).json(comments);
    } catch (err) {
      console.error("❌ Lỗi lấy bình luận:", err);
      res.status(500).json({ message: err.message });
    }
  },
  updateComment: async (req, res) => {
    try {
      const { id } = req.params; // id comment cần update
      const updateData = {
        content: req.body.content,
        rating: req.body.rating,
        images: req.body.images || [],
      };

      const result = await CommentService.updateComment(id, updateData);
      if (!result) return res.status(404).json({ message: "Không tìm thấy bình luận!" });

      res.status(200).json({ message: "Cập nhật bình luận thành công!", data: result });
    } catch (err) {
      console.error("❌ Lỗi cập nhật bình luận:", err);
      res.status(500).json({ message: err.message });
    }
  }
  
};
