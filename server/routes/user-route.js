const express = require("express");
const authController = require("./../controllers/auth-controller");

const router = express.Router();

router.post("/register", authController.signup);
router.post("/login", authController.login);

module.exports = router;
