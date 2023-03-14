const express = require("express");
const router = express.Router();

const { createReimbursement, listReimbursement, handledReimbursement, historyReimbursement } = require("../controllers/reimbursement.controller");

router.post("/createreimbursement", createReimbursement);
router.get("/listreimbursement", listReimbursement);
router.put("/handlereimbursement", handledReimbursement);
router.post("/historyreimbursement", historyReimbursement);

module.exports = router;
