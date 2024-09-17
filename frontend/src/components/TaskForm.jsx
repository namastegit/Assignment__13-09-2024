import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil'; 
import { tasksState } from '../recoil/atoms';

function TaskForm() {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [recurrence, setRecurrence] = useState('none');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
  
    const token = localStorage.getItem("token");
  
    if (!token) {
      setError("User is not authenticated.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/tasks",
        {
          title,
          description,
          scheduledTime,
          // recurrence,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 201 || response.status === 200) {
        const newTask = response.data.task; // Extract task object from response
        setTasks((prevTasks) => [newTask, ...prevTasks]); // Update state with new task
        // Reset form fields
        setTitle('');
        setDescription('');
        setScheduledTime('');
        setRecurrence('none');
      } else {
        setError(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Failed to add task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="datetime-local"
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <select
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="none">No Recurrence</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option> {/* Optional: Additional options */}
        </select>
      </div>
      {error && (
        <div className="mb-4 text-red-500">
          {error}
        </div>
      )}
      <button
        type="submit"
        className={`w-full p-2 bg-blue-500 text-white rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding Task..." : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;
