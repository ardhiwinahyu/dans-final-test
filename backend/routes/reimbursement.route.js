const express = require("express");
const router = express.Router();

const { createReimbursement, listReimbursement, handledReimbursement } = require("../controllers/reimbursement.controller");

router.post("/createreimbursement", createReimbursement);
router.post("/listreimbursement", listReimbursement);
router.get("/handlereimbursement", handledReimbursement);

module.exports = router;
