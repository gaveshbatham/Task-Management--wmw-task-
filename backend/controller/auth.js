import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/user.js";
import sandMail from "../service/nodeMailer.js";

import useragent from "useragent";



export async function login(req, res) {
  const { email, password } = req.body;

  // Get User-Agent (device info)
  const agent = useragent.parse(req.headers["user-agent"]);
  const deviceInfo = agent;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // res.json({ success: true, message: "Login successful", token });

    res
      .cookie("Authorization", token, {
        httpOnly: true,
        sameSite: "Strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        token,
        user,
      });

    // Send login notification email with device info
    const mailData = {
      to: email,
      subject: "New Login Detected",
      text: `Hello ${
        user.name
      },\n\nYour account was just logged into from:\n📱 Device: ${deviceInfo}\n🕒 Time: ${new Date().toLocaleString()}`,
    };

    sandMail(mailData);
  } catch (error) {
    console.error("Error in login:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error logging in",
        error: error.message,
      });
  }
}


export  function logout(req,res){
  res
  .cookie("Authorization", "token", {
    httpOnly: true,
    sameSite: "Strict",
    path: "/",
    maxAge: 1,
  }).status(200).json({
        success: true, message: "Logged out successfully" 
    })
}


export async function signup(req,res){
    console.log(req.body);
  const { name, email, password, role } = req.body;
  const profilePhoto = req.file;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing required fields: name, email, or password." });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists." });
    }

    // Hash password 
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare profile photo data
    let profilePhotoData = null;
    if (profilePhoto) {
      profilePhotoData = {
        data: profilePhoto.buffer, // Image buffer from multer
        contentType: profilePhoto.mimetype,
      };
    }

    // Create new user 
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      profilePhoto: profilePhotoData,
      verified: false, // Ensure user is marked as unverified initially
    });

    // Save user to database
    const response = await newUser.save();

    // Generate a **non-expiring** verification token
    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    // Combined plain text email
    const emailContent = {
      to: email,
      subject: "Welcome! Verify Your Email to Get Started 🚀",
      text: `Hello, ${name}!\n\n
    Welcome to our platform! Your account has been successfully created.\n\n
    To activate your account, please verify your email by clicking the link below:\n\n
    🔗 ${process.env.BACKEND_LINK}/verify/${token}\n\n
    Once verified, you can log in using the link below:\n\n
    🔑 ${process.env.FRONTEND_LINK}/login\n\n
    If you did not sign up for this account, please ignore this email.\n\n
    Need help? Contact our support team anytime.\n\n
    Best Regards,\n
    The Team 🚀`,
    };
    
    // Send email
    sandMail(emailContent);

    res.status(201).json({ success: true, message: "User created successfully. Please check your email for verification." });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating user", error: error.message });
  }
}