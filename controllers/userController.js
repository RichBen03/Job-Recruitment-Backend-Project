const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // checks for an existing user by filtering a specific email in the db
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User exists" });

    //hashes the password using the bcryptjs
    const hashed = await bcrypt.hash(password, 10);

    // creates a user and stores the password in a hashed format in the db
    const newUser = await User.create({ name, email, password: hashed, role });

    //assigns a token to the newly created user 
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(201).json({ token, user: { id: newUser._id, name, email, role } });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
};


exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
    
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError('Invalid credentials', 401));
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Remove password from output
    user.password = undefined;

    res.status(200).json({
      status: 'success',
      token,
      data: user
    });
    
  } catch (err) {
    console.error("Login error:", err); 
    next(new AppError('Login failed', 500));
  }
};
