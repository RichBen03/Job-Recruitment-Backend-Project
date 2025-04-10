// File: routes/jobRoutes.js (Enhanced)
const express = require("express");
const {
  createJob,
  searchJobs,
  getJob
} = require("../controllers/jobController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth(["employer"]), createJob);
router.get("/", searchJobs);
router.get("/:id", getJob);

module.exports = router;