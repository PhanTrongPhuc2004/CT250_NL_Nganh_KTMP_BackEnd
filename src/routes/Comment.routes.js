const express = require("express");
const router = express.Router();
const CommentController = require("../controller/Comment.controller");

// API thêm đánh giá (chỉ nhận JSON)
router.post("/", CommentController.addComment);


// API lấy đánh giá theo sản phẩm
router.get("/:id", CommentController.getComments);

module.exports = router;
