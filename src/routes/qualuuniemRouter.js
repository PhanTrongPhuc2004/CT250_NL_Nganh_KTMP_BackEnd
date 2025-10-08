const express = require("express");
const router = express.Router();
const quaLuuNiemController = require("../controller/qualuuniemController");

router.post("/", quaLuuNiemController.createQuaLuuNiem);
router.get("/", quaLuuNiemController.getAllQuaLuuNiem);
router.get("/:id", quaLuuNiemController.getQuaLuuNiemById);
router.put("/:id", quaLuuNiemController.updateQuaLuuNiem);
router.delete("/:id", quaLuuNiemController.deleteQuaLuuNiem);

module.exports = router;
