const express = require("express");
const router = express.Router();

const { createReimbursement, listReimbursement, handledReimbursement } = require("../controllers/reimbursement.controller");

router.post("/createreimbursement", createReimbursement);
router.get("/listreimbursement", listReimbursement);
router.put("/handlereimbursement", handledReimbursement);

module.exports = router;
