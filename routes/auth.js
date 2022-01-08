const express = require("express");
const { signUp } = require("../controllers/user");

const router = express.Router();

router.route("/api/signup").post(signUp);

module.exports = router;
