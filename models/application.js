// Schema representing a user's application to a specific job.
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  resume: {
    type: String,
    required: [true, "Resume is required"]
  },

  coverLetter: String,
  
  status: {
    type: String,
    enum: ["pending", "reviewed", "accepted", "rejected"],
    default: "pending"
  }
}, { timestamps: true });

applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });
module.exports = mongoose.model("Application", applicationSchema);