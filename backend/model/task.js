import mongoose from "mongoose";

const taskSchema= new mongoose.Schema({
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


const Tasks = mongoose.model("tasks",taskSchema)

export default Tasks;