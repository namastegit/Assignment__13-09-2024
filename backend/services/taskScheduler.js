const cron = require('node-cron');
const Task = require('../models/Task');
const emailService = require('./emailService');   

// Function to check for due tasks and send emails
const updateDueTasks = async () => {
  try {
    const now = new Date();
    console.log('Current time:', now.toISOString());

    // Find due tasks and populate the user field
    const dueTasks = await Task.find({
      status: 'pending',
      scheduledTime: { $lte: now }
    }).populate('user'); // Populate the user field

    console.log(`Found ${dueTasks.length} due tasks`);

    // Process each due task
    for (const task of dueTasks) {
      task.status = 'due';
      await task.save();
      console.log(`Updated task ${task._id} to 'due'`);

      // Send email
      await emailService.sendTaskDueNotification(task);
    }
  } catch (error) {
    console.error('Error updating tasks:', error.message);
  }
};


// Starting the cron job
const start = () => {
  console.log('Starting cron job');
  
  // Running every minute (you can adjust this schedule if needed)
  cron.schedule('* * * * *', () => {
    console.log('Cron job triggered at', new Date().toISOString()); // Logging when cron job is triggered
    updateDueTasks(); // Running the task update process
  });
};

module.exports = { start };
