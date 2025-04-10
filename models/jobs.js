// Schema representing a job posting

const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter job title"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Please enter job description"]
  },
  requirements: [String],
  company: {
    type: String,
    required: [true, "Please enter company name"]
  },
  location: {
    type: String,
    required: [true, "Please enter job location"]
  },
  industry: String,
  salaryRange: {
    min: Number,
    max: Number
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true } 
});

jobSchema.index({ title: "text", description: "text", location: "text" });
module.exports = mongoose.model("Jobs", jobSchema);