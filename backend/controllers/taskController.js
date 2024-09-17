const Task = require("../models/Task")
const { ValidationResult, validationResult } = require("express-validator");

exports.createTask = async (req, res) => {
    try {
        const {title, description, scheduledTime } = req.body;
        
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({
errors: errors.array()
            });
        }

        const task = new Task({
            user: req.user.id,
            title,description,scheduledTime
        });
        await task.save();
        res.status(201).json({
            message: "Task created successfully :: ", task
        })
    } catch (error) {
        res.status(500).json({
            message: "Error creating task: ", error: error.message
        })
        
    }
}

exports.getTasks = async (req, res) => {
    try {
        const { page = 1, limit = 10} = req.query;
        const skip = (page -1) * limit;
        
        const tasks = await Task.find({
            user: req.user.id
        }).sort({ scheduledTime: 1 }).skip(skip).limit(Number(limit));

        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: "Error Fetching Tasks: ", error: error.message
        });
        
    }
}

exports.updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, scheduledTime, status } = req.body;
  
      const task = await Task.findById(id);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      if (task.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      // Update only provided fields
      task.title = title || task.title;
      task.description = description || task.description;
      task.scheduledTime = scheduledTime || task.scheduledTime;
      task.status = status || task.status;
  
      await task.save();
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error updating task', error: error.message });
    }
  };


// Delete a task
exports.deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find and delete the task by ID
      const task = await Task.findByIdAndDelete(id);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      if (task.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
  };
  