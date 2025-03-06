import Task from "../model/task.js";

async function add_new_task(req, res) {
    const { title, description, dueDate, status, assignedTo, assignedBy } =
      req.body;
  
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
    } catch (err) {
      res.status(500).json({ success: false, message: "Error creating task", error: err.message });
    }
  }

  async function update_task(req, res) {
    const { _id, title, description, dueDate, status, assignedTo, assignedBy } = req.body;
  
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
  
    } catch (err) {
      res.status(500).json({ success: false, message: "Error updating task", error: err.message });
    }
  }
 
  
  async function delete_task(req, res) {
    const { _id } = req.params; 
  
    if (!_id) {
      return res.status(400).json({ success: false, message: "Task ID (_id) is required" });
    }
  
    try {
      const result = await Task.findByIdAndDelete(_id);
  
      if (!result) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
  
      res.json({ success: true, message: "Task deleted successfully", result });
  
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
