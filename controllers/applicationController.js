const Application = require("../models/application");

// exports.applyToJob = async (req, res) => {
//   try {
//     const application = await Application.create({ ...req.body, applicant: req.user.id });
//     res.status(201).json(application);
//   } catch (err) {
//     res.status(500).json({ message: "Application failed" });
//   }
// };

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate("job applicant", "title name");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Error fetching applications" });
  }
};

exports.applyToJob = async (req, res, next) => {
  try {
    if (!req.body.resume) {
      return next(new AppError("Resume is required", 400));
    }
    
    const application = await Application.create({
      job: req.body.jobId,
      applicant: req.user.id,
      resume: req.body.resume,
      coverLetter: req.body.coverLetter
    });
    
    res.status(201).json(application);
  } catch (err) {
    next(err);
  }
};