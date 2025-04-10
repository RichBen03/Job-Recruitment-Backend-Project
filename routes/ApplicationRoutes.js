// routes/ApplicationRoutes
const express = require("express");
const { applyToJob, getApplications } = require("../controllers/applicationController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, applyToJob);
router.get("/", auth, getApplications);

module.exports = router;