const Job = require("../models/job");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find().populate("createdBy");
  res.status(200).json(jobs);
};

const createJob = async (req, res) => {
  const userId = req.userId;
  const job = await Job.create({ ...req.body, createdBy: userId });
  res.status(200).json(job);
};

module.exports = {
  getAllJobs,
  createJob,
};
