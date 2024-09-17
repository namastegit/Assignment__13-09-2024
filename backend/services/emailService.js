const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensuring environment variables are loaded

// Set up the transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, //  Gmail email from the .env file
    pass: process.env.EMAIL_PASS  // App Password from the .env file
  }
});

// Function to send task due notification email
exports.sendTaskDueNotification = async (task) => {
  try {
    // Ensuring user and username exist before attempting to send the email
    if (!task.user || !task.user.username) {
      throw new Error('User or email is not defined');
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: task.user.username, // Using task.user.username as the recipient
      subject: 'Task Due Notification',
      text: `Your task "${task.title}" is due.`
    });

    console.log(`Email sent to: ${task.user.username} for task: ${task.title}`);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};

