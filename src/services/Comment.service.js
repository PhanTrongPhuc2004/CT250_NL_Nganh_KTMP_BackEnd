const Comment = require("../models/Comment.model");

module.exports = {

  addComment: async (data) => {
    return await new Comment(data).save();
  },

  getCommentsByProduct: async (productId) => {
    return await Comment.find({ productId }).sort({ date: -1 });
  },

  // Check chỉ 1 lần / mỗi sản phẩm trong từng đơn
  checkUserReviewed: async (productId, orderId, userName) => {
    return await Comment.exists({ productId, orderId, userName });
  },

  updateComment: async (id, updateData) => {
    return await Comment.findByIdAndUpdate(id, updateData, { new: true });
  },
};
