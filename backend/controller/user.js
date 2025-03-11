import bcrypt from "bcryptjs";
import User from "../model/user.js";
import sendMail from "../service/nodeMailer.js";
import jwt from "jsonwebtoken";



async function add_user(req, res) {
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
    sendMail(emailContent);

    res.status(201).json({ success: true, message: "User created successfully. Please check your email for verification." });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating user", error: error.message });
  }
}




async function get_one_user(req, res) {
    try {
      const { email } = req.params; 
      console.log("Searching for user with email:", email);
  
      const data = await User.findOne({ email }).select("-password -_id"); // Exclude password and _id
  
      if (!data) {
        return res.status(404).json({ success: false, message: "User not found", result: null });
      }
  
      return res.status(200).json({ success: true, message: "User found", result: data });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error finding user", error: error.message });
    }
  }
  

  async function get_all_users(req, res) {
    try {
  
        const result = await User.find({}).select("-password -_id"); 

        console.log(result); 
        
        res.json({ success: true, result });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error finding users", error: error.message });
    }
}


async function update_user(req, res) {
    const { name, email, password, role } = req.body;
    const profilePhoto = req.file;
  
    if (!email) {
      return res.status(400).json({success: false, message: "Email is required for updating user." });
    }
  
    try {
      // Check if the user exists
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({success: false, message: "User does not exist." });
      }
  
      // Prepare update fields
      const updateFields = {};
      if (name) updateFields.name = name;
      if (password) updateFields.password = await bcrypt.hash(password, 10);
      if (role) updateFields.role = role;
      if (profilePhoto) {
        updateFields.profilePhoto = {
          data: profilePhoto.buffer,
          contentType: profilePhoto.mimetype,
        };
      }
  
      // Update the user
      const updatedUser = await User.findOneAndUpdate(
        { email }, // Find user by email
        { $set: updateFields }, // Update only provided fields
        { new: true, select: "-password -_id" } // Return updated user, exclude password
      );
  
      res.status(200).json({success: true, message: "User updated successfully", result: updatedUser });
    } catch (error) {
      res.status(500).json({success: false, message: "Error updating user", error: error.message });
    }
  }
  
async function delete_user(req,res) {

//  i have to add that only user and admin can delete user  

    const {email} = req.params;
    if(!email){
        return res.json({
            success: false, message: "email is not given"

        })
    }
    try{

        const result =await User.findOneAndDelete({email});

        res.json(
            {success: true, message: "user deleted", result }
        )


    }catch (error) {
      console.error("Error deleting user:", error);
        res.status(500).json({success: false, message: "Error deleting user", error: error.message });
      }
    
}
 

export {add_user, get_one_user,get_all_users,update_user,delete_user}