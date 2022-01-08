const express = require("express");
const { signUp, login } = require("../controllers/user");

const router = express.Router();

router.route("/api/signup").post(signUp);
router.route("/api/login").post(login);

module.exports = router;
