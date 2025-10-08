const express = require("express");
const router = express.Router();
const lichTrinhController = require("../controller/lichtrinhController");

router.post("/", lichTrinhController.createLichTrinh);
router.get("/", lichTrinhController.getAllLichTrinh);
router.get("/:id", lichTrinhController.getLichTrinhById);
router.put("/:id", lichTrinhController.updateLichTrinh);
router.delete("/:id", lichTrinhController.deleteLichTrinh);

module.exports = router;
