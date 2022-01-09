const express = require("express");
const { getAllJobs, createJob } = require("../controllers/job");
const protectAuth = require("../middleware/protectAuth");

const router = express.Router();

router.route("/").get(getAllJobs).post(protectAuth, createJob);

module.exports = router;
