import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { tasksState } from '../recoil/atoms';

const TaskItem = ({ task }) => {
  const [tasks, setTasks] = useRecoilState(tasksState);

  // Local state for editing the task
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    scheduledTime: task.scheduledTime,
  });

  // Handle delete task
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t._id !== task._id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Handle update task
  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`http://localhost:3000/api/tasks/${task._id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.map((t) => (t._id === task._id ? response.data : t)));
      setIsEditing(false); // Close edit mode after saving
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded mb-2 bg-gray-100">
      {isEditing ? (
        <div className="flex-1">
          <input
            className="mb-2 p-1 border rounded w-full"
            type="text"
            value={updatedTask.title}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, title: e.target.value })
            }
            placeholder="Title"
          />
          <textarea
            className="mb-2 p-1 border rounded w-full"
            value={updatedTask.description}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, description: e.target.value })
            }
            placeholder="Description"
          />
          <select
            className="mb-2 p-1 border rounded w-full"
            value={updatedTask.status}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, status: e.target.value })
            }
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <input
            className="mb-2 p-1 border rounded w-full"
            type="datetime-local"
            value={new Date(updatedTask.scheduledTime)
              .toISOString()
              .slice(0, 16)}
            onChange={(e) =>
              setUpdatedTask({
                ...updatedTask,
                scheduledTime: new Date(e.target.value).toISOString(),
              })
            }
          />
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-bold">{task.title}</h2>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Scheduled: {new Date(task.scheduledTime).toLocaleString()}</p>
        </div>
      )}

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleUpdate}
              className="p-2 bg-green-500 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="p-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
