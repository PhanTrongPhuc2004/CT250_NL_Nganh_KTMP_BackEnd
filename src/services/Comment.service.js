const Comment = require("../models/Comment.model");

module.exports = {
  addComment: async (data) => {
    const cmt = new Comment(data);
    return await cmt.save();
  },

  getCommentsByProduct: async (productId) => {
    return await Comment.find({ productId }).sort({ date: -1 });
  },
  updateComment: async (id, updateData) => {
    return await Comment.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true } // trả về dữ liệu mới sau update
    );
  }
};
