const Job = require("../models/job");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("createdBy", "-password -__v");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createJob = async (req, res) => {
  const userId = req.userId;
  const job = await Job.create({ ...req.body, createdBy: userId });
  res.status(200).json(job);
};

const getJob = async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findById(jobId).populate(
      "createdBy",
      "-password -__v"
    );
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ message: "Job not found" });
  }
};

const updateJob = async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findByIdAndUpdate(jobId, req.body, { new: true });
    res.status(201).json({ message: "Updated" });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getMyJobs = async (req, res) => {
  const userId = req.userId;
  try {
    const jobs = await Job.find({ createdBy: userId });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteJob = async (req, res) => {
  const { jobId } = req.params;
  try {
    await Job.findByIdAndRemove(jobId);
    res.status(204).json({ message: "success" });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getByCompany = async (req, res) => {
  const { companyName } = req.params;
  try {
    const jobs = await Job.find({ company: companyName });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  getMyJobs,
  deleteJob,
  getByCompany,
};
