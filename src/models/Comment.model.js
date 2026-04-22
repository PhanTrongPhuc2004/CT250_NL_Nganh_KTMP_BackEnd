const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Qualuuniem", required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true }, // 🔥 thêm dòng này
  userName: { type: String, required: true },

  rating: { type: Number, min: 1, max: 5, required: true },
  content: { type: String, required: true },
  images: [String],

  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", commentSchema);
