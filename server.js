// File: server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

// Load environment variables first
dotenv.config();

// Create Express app instance
const app = express();
app.use(express.json({ limit: "10kb" }));

// Connect to database
const connectDB = require("./config/db");
connectDB();

// Security middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL }));
// app.use(mongoSanitize());


// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use("/api/", limiter);

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));

// Error handling middleware (MUST COME AFTER ALL ROUTES)
const globalErrorHandler = require("./controllers/errorController");
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));