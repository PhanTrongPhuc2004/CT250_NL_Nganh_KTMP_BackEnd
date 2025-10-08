const express = require("express");
const router = express.Router();
const hopDongController = require("../controller/hopdongController");

router.post("/", hopDongController.createHopDong);
router.get("/", hopDongController.getAllHopDong);
router.get("/:id", hopDongController.getHopDongById);
router.put("/:id", hopDongController.updateHopDong);
router.delete("/:id", hopDongController.deleteHopDong);

module.exports = router;
