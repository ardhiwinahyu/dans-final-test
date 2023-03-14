const express = require("express");
const router = express.Router();
const { createPengumuman } = require("../controllers/pengumuman.controller");

router.post("/create", createPengumuman);

module.exports = router;
