import cron from "node-cron";
import Reminders from "../model/reminder.js";
import sendMail from "../service/nodeMailer.js";

let reminders_store = [];

export function resetreminders_store() {
  reminders_store = [];
}

export function scheduler() {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();

      // Fetch all reminders from the database if reminders_store is empty
      if (!reminders_store) {
        reminders_store = await Reminders.find({})  || [];
      }

      // Filter reminders that are due within the last minute
      const to_send = reminders_store.filter((reminder) => {
        const reminderTime = new Date(reminder.reminder);
        return Math.abs(now - reminderTime) < 60000; // Check if reminder is within the last 1 minute
      });

      for (const reminder of to_send) {
        const emailData = {
          to: reminder.assignedTo, // Send email to the assigned user
          subject: "Reminder: " + (reminder.title || "Task Reminder"),
          text: `Hello,\n\nThis is a reminder for your task:\n\n📝 **Task:** ${
            reminder.title
          }\n📅 **Due Date:** ${new Date(
            reminder.dueDate
          ).toLocaleString()}\n\n🔹 **Description:**\n${
            reminder.description || "No description provided"
          }\n\nPlease make sure to complete your task on time.\n\nBest,\nTask Management Team`,
        };

        // Send the reminder email
        sendMail(emailData);

        // Remove the reminder from the database and local storage
    //    await Reminders.findByIdAndDelete(reminder._id);
        reminders_store = reminders_store.filter(
          (r) => r._id.toString() !== reminder._id.toString()
        );
      }

      console.log(`Checked for reminders at ${new Date().toLocaleString()}`);
    } catch (error) {
      console.error("Error in reminder cron job:", error);
    }
  });
}
