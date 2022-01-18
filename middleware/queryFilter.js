const Job = require("../models/job");

const queryFilter = async (req, res, next) => {
  const { q } = req.query;
  if (!q) {
    return next();
  }

  try {
    const jobs = await Job.find();
    const filteredJobs = jobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(q.toLowerCase()) ||
        job.company.toLowerCase().includes(q.toLowerCase())
      );
    });
    res.status(200).json(filteredJobs);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = queryFilter;
