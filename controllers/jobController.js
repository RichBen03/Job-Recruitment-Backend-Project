// File: controllers/jobController.js (Enhanced)
const Job = require("../models/jobs");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.createJob = async (req, res, next) => {
  try {
    if (req.user.role !== "employer") {
      return next(new AppError("Only employers can post jobs", 403));
    }

    const job = await Job.create({ ...req.body, postedBy: req.user.id });
    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
};

exports.searchJobs = async (req, res, next) => {
  try {
    const features = new APIFeatures(Job.find(), { ...req.query })
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const jobs = await features.query.populate("postedBy", "name company");
    res.json({
      status: "success",
      results: jobs.length,
      data: jobs
    });
  } catch (err) {
    next(err);
  }
};

exports.getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("postedBy", "name company")
      .populate("applicants", "name email");
    
    if (!job) return next(new AppError("Job not found", 404));
    
    res.json(job);
  } catch (err) {
    next(err);
  }
};