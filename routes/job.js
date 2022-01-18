const express = require("express");
const {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  getMyJobs,
  deleteJob,
  getByCompany,
} = require("../controllers/job");
const protectAuth = require("../middleware/protectAuth");
const categoryFilter = require("../middleware/categoryFilter");
const queryFilter = require("../middleware/queryFilter");

const router = express.Router();

router
  .route("/")
  .get(categoryFilter, queryFilter, getAllJobs)
  .post(protectAuth, createJob);
router.route("/myjobs").get(protectAuth, getMyJobs);
router.route("/company/:companyName").get(getByCompany);
router
  .route("/:jobId")
  .get(getJob)
  .patch(protectAuth, updateJob)
  .delete(protectAuth, deleteJob);

module.exports = router;
