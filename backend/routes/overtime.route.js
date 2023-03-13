const express = require("express");
const router = express.Router();

const { createOvertime, listOvertime, handleOvertime } = require("../controllers/overtime.controller");

router.post("/createovertime", createOvertime);
router.post("/listovertime", listOvertime);
router.get("/getprofile", handleOvertime);

module.exports = router;
