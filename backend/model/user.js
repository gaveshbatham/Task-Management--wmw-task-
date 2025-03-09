
import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },role: {
        type: String,
        enum: ["admin", "user"], // Only "admin" or "user" roles
        default: "user",
      },
      profilePhoto: {
        data: Buffer, 
        contentType: String, 
      },
      verified:{
        type:Boolean,
        default: false,
      }
    },
    { timestamps: true }
)


const Users = mongoose.model("users",userSchema)

export default Users;