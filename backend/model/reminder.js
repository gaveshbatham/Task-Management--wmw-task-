import mongoose from "mongoose";

const reminderSchema= new mongoose.Schema({
    id_in_task: {
        type: mongoose.Schema.Types.ObjectId, // Reference to a Task
        ref: "tasks", // Name of the Task model
        required: true,
      },
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      dueDate: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending",
      },
      assignedTo: {
        type:String,
        required: true,
      },
      assignedBy:{
        type: String,
        required:true,
      },
      important:{
        type:Boolean,
        default: false,
      },
      reminder: {
        type: Date, 
      }


    },
    { timestamps: true }
) 

const reminders= mongoose.model('reminders',reminderSchema

)

export default reminders;