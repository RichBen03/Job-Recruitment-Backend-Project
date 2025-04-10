
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const auth = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return next(new AppError("Authentication required", 401));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      if (roles.length && !roles.includes(decoded.role)) {
        return next(new AppError("Unauthorized access", 403));
      }

      req.user = decoded;
      next();
    } catch (err) {
      next(new AppError("Invalid or expired token", 401));
    }
  };
};
module.exports = auth;