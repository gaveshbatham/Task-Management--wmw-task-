import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/user.js"; 


export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, role: user.role }, // Payload (only email & role)
      process.env.JWT_SECRET, // Secret key (store this in .env)
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.json({ success: true, message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error logging in", error: error.message });
  }
}
