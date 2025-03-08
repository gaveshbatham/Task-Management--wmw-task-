import Task from "../model/task.js";
import jwt from "jsonwebtoken"
import sendMail from "../service/nodeMailer.js";

async function add_new_task(req, res) {
    const { title, description, dueDate, status, assignedTo, assignedBy } =
      req.body;

      const token = req.cookies.Authorization;
   
  
      console.log(req.body)
    // Validate required fields
    if (!title || !dueDate || !assignedTo || !assignedBy) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
  
    try {
      const newTask = new Task({
        title,
        description,
        dueDate,
        status: status || "pending",
        assignedTo,
        assignedBy,
      });
  
      const savedTask = await newTask.save();
  
      res.status(201).json({ success: true, message: "Task added successfully", result: savedTask });

      // Verify token and check role
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === "admin") {
      const data_for_email = {
        to: assignedTo, 
        subject: "New Task Assigned by Admin: " + title,
        text: `Hello,\n\nA new task has been assigned to you by ${assignedBy} (Admin).\n\n📝 **Task:** ${title}\n📅 **Due Date:** ${new Date(dueDate).toLocaleString()}\n📌 **Status:** ${status || "pending"}\n\n🔹 **Description:**\n${description || "No description provided"}\n\nPlease make sure to complete the task before the due date.\n\nBest,\nTask Management Team`
      };

      sendMail(data_for_email);
    }


    } catch (err) {
      res.status(500).json({ success: false, message: "Error creating task", error: err.message });
    }
  }

  async function update_task(req, res) {
    const { _id, title, description, dueDate, status, assignedTo, assignedBy } = req.body;
    const token=req.cookies.Authorization;
    
    if (!_id) {
      return res.status(400).json({ success: false, message: "Task ID (_id) is required" });
    }
  
    try {
      // Find the task by _id and update only the provided fields
      const updatedTask = await Task.findByIdAndUpdate(
        _id, 
        { $set: { title, description, dueDate, status, assignedTo, assignedBy } },
        { new: true } // Return updated document
      );
  
      if (!updatedTask) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
  
      res.json({ success: true, message: "Task updated successfully", result: updatedTask });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const updated_by = decoded.email;

      const data_for_email = {
        to: assignedTo, 
        subject: "Task Updated: " + (title || "No Title Provided"),
        text: `Hello,\n\nThe following task assigned to you has been updated by ${updated_by}:\n\n📝 **Task:** ${title || "No Title"}\n📅 **Due Date:** ${new Date(dueDate).toLocaleString()}\n📌 **Status:** ${status || "No Status"}\n\n🔹 **Updated Description:**\n${description || "No description provided"}\n\nPlease check the task details and take necessary action.\n\nBest,\nTask Management Team`
      };
  
      sendMail(data_for_email);


  
    } catch (err) {
      res.status(500).json({ success: false, message: "Error updating task", error: err.message });
    }
  }
 
  
  async function delete_task(req, res) {
    const { _id } = req.params;
    const token = req.cookies.Authorization;
  
    if (!_id) {
      return res.status(400).json({ success: false, message: "Task ID (_id) is required" });
    }
  
    try {
      // Verify token and get user details
       // Extract email of the user who performed the deletion
  
      // Find the task before deleting to get details
      const taskToDelete = await Task.findById(_id);
  
      if (!taskToDelete) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
  
      // Delete the task
      await Task.findByIdAndDelete(_id);
  
      res.json({ success: true, message: "Task deleted successfully", result: taskToDelete });
  
      // Send email notification to the assigned user
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const deletedBy = decoded.email;
      const data_for_email = {
        to: taskToDelete.assignedTo, // Email of the assigned user
        subject: "Task Deleted: " + (taskToDelete.title || "No Title Provided"),
        text: `Hello,\n\nThe following task assigned to you has been **deleted** by **${deletedBy}**:\n\n📝 **Task:** ${taskToDelete.title || "No Title"}\n📅 **Due Date:** ${new Date(taskToDelete.dueDate).toLocaleString()}\n📌 **Status:** ${taskToDelete.status || "No Status"}\n\n🔹 **Description:**\n${taskToDelete.description || "No description provided"}\n\nYou no longer need to work on this task.\n\nBest,\nTask Management Team`
      };
  
      sendMail(data_for_email);
  
    } catch (err) {
      res.status(500).json({ success: false, message: "Error deleting task", error: err.message });
    }
  }

async function get_task_by_email(req,res) {
    const {email} =  req.params;
    try{
        const result = await Task.find({email})
        res.json({
            success: true, message: `all tasks of - ${email}`, result
        })
    }catch (err) {
        res.status(500).json({ success: false, message: `Error findg task of ${email}`, error: err.message });
      }
}

  

export { add_new_task , update_task , delete_task ,get_task_by_email };
