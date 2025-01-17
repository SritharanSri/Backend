import User from "../models/User.js";
import jwt from "jsonwebtoken";


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


export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password." });
      }
  
      const isMatch = await user.comparePassword(password);  
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password." });
      }
  
      
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      
      res.json({ token });
  
    } catch (error) {
      console.error(error);  
      res.status(500).json({ message: "Server error.", error: error.message });
    }
  };