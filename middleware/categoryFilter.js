const Job = require("../models/job");

const categoryFilter = async (req, res, next) => {
  const { category } = req.query;
  if (!category) {
    return next();
  }

  try {
    const jobs = await Job.find({ category });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = categoryFilter;
