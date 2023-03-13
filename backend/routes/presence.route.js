const express = require("express");
const router = express.Router();

const presentController = require("../controllers/present.controller");
const leaveController = require("../controllers/leave.controller");

router.post("/present", presentController);
router.post("/leave", leaveController);

module.exports = router;
