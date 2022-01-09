const express = require("express");
const protectAuth = require("../middleware/protectAuth");

const router = express.Router();

router.route("/").get(protectAuth, (req, res) => res.send(req.userId));

module.exports = router;
