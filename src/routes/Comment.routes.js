const express = require("express");
const router = express.Router();
const CommentController = require("../controller/Comment.controller");

// Thêm comment
router.post("/", CommentController.addComment);

// Lấy comment theo sản phẩm
router.get("/:id", CommentController.getComments);

// Update bình luận
router.put("/:id", CommentController.updateComment);

// Check đã đánh giá chưa
router.post("/check", CommentController.checkReviewed);

module.exports = router;
