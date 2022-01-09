const express = require("express");
const {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  getMyJobs,
  deleteJob,
} = require("../controllers/job");
const protectAuth = require("../middleware/protectAuth");

const router = express.Router();

router.route("/").get(getAllJobs).post(protectAuth, createJob);
router.route("/myjobs").get(protectAuth, getMyJobs);
router
  .route("/:jobId")
  .get(getJob)
  .patch(protectAuth, updateJob)
  .delete(protectAuth, deleteJob);

module.exports = router;
