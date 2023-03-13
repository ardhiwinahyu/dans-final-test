const express = require("express");
const router = express.Router();

const registerController = require("../controllers/register.controller");
const loginController = require("../controllers/login.controller");
const getProfileController = require("../controllers/getProfile.controller");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/getprofile", getProfileController);

module.exports = router;
