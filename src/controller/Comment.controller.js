const CommentService = require("../services/Comment.service");

module.exports = {

  // ============ ADD COMMENT ============ //
  addComment: async (req, res) => {
    try {
      const { productId, orderId, userName, rating, content, images = [] } = req.body;

      // Nếu đã đánh giá trong đơn này ⇒ không cho đánh giá nữa
      const reviewed = await CommentService.checkUserReviewed(productId, orderId, userName);
      if (reviewed)
        return res.status(400).json({ message: "Bạn đã đánh giá sản phẩm này trong đơn hàng này!" });

      const newComment = await CommentService.addComment({
        productId, orderId, userName, rating, content, images
      });

      return res.status(201).json({
        message: "Thêm đánh giá thành công!",
        data: newComment
      });

    } catch (err) {
      return res.status(500).json({ message: "Lỗi server!", error: err.message });
    }
  },

  // ============ GET COMMENT ============ //
  getComments: async (req, res) => {
    try {
      const productId = req.params.id;
      const comments = await CommentService.getCommentsByProduct(productId);
      return res.status(200).json(comments);
    } catch (err) {
      return res.status(500).json({ message: "Lỗi lấy dữ liệu!", error: err.message });
    }
  },

  // ============ EDIT COMMENT ============ //
  updateComment: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = {
        rating: req.body.rating,
        content: req.body.content,
        images: req.body.images || []
      };

      const updated = await CommentService.updateComment(id, updateData);
      if (!updated) return res.status(404).json({ message: "Không tìm thấy bình luận!" });

      return res.status(200).json({ message: "Cập nhật thành công!", data: updated });

    } catch (err) {
      return res.status(500).json({ message: "Lỗi server!", error: err.message });
    }
  },

  // ============ CHECK BEFORE DISPLAY BUTTON ============ //
  checkReviewed: async (req, res) => {
    try {
      const { productId, orderId, userName } = req.body;
      if (!productId || !orderId || !userName)
        return res.status(400).json({ reviewed: false, message: "Thiếu dữ liệu!" });

      const reviewed = await CommentService.checkUserReviewed(productId, orderId, userName);
      return res.status(200).json({ reviewed });

    } catch (err) {
      return res.status(500).json({ reviewed: false, message: err.message });
    }
  }
};
