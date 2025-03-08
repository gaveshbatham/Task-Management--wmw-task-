import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/user.js"; 
import sandMail from "../service/nodeMailer.js";




import useragent from "useragent";

export async function login(req, res) {
  const { email, password } = req.body;
  
  // Get User-Agent (device info)
  const agent = useragent.parse(req.headers["user-agent"]);
  const deviceInfo = `${agent.os.family} ${agent.os.major} - ${agent.family} ${agent.major}`;

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
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ success: true, message: "Login successful", token });

    // Send login notification email with device info
    const mailData = {
      to: email,
      subject: "New Login Detected",
      text: `Hello ${user.name},\n\nYour account was just logged into from:\n📱 Device: ${deviceInfo}\n🕒 Time: ${new Date().toLocaleString()}`
    };

   sandMail(mailData);

  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ success: false, message: "Error logging in", error: error.message });
  }
}

