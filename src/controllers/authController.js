import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Sign-up Controller
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Login Controller
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
      }
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password." });
      }
  
      // Check if the password matches
      const isMatch = await user.comparePassword(password);  // Ensure comparePassword is defined in your User model
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password." });
      }
  
      // Generate the JWT token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      // Respond with the token
      res.json({ token });
  
    } catch (error) {
      console.error(error);  // Logging for better debugging
      res.status(500).json({ message: "Server error.", error: error.message });
    }
  };