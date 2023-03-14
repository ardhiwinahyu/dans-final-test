const express = require("express");
const router = express.Router();

const { createOvertime, listOvertime, handleOvertime, historyOvertime } = require("../controllers/overtime.controller");

router.post("/createovertime", createOvertime);
router.get("/listovertime", listOvertime);
router.put("/handleovertime", handleOvertime);
router.post("/historyovertime", historyOvertime);

module.exports = router;
