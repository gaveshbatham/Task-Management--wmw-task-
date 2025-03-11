import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAIL_GMAIL_ID,
        pass: process.env.NODEMAIL_GMAIL_PASSWORD
    }
});

export default function sendMail(data) {
    const { to, subject, text } = data;
    
    const mailOptions = {
        from: process.env.NODEMAIL_GMAIL_ID, // Should match auth user
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Error in nodemailer:", err);
        } else {
            console.log(`Email sent to ${to} -->`, info);
        }
    });
}