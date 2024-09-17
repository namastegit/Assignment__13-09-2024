const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/Register", authController.Register);
router.post("/Login", authController.Login);

module.exports = router;