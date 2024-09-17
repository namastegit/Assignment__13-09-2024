import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { tasksState } from '../recoil/atoms';

const TaskFetcher = () => {
  const setTasks = useSetRecoilState(tasksState);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        console.log("Token:", token); // Verify if token is being retrieved

        // Set up the configuration for the axios request
        const config = {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          }
        };

        // Make the API request with the token
        const response = await axios.get('http://localhost:3000/api/tasks', config);
        setTasks(response.data); // Update the Recoil state
        console.log("Tasks fetched and set:", response.data); // Log fetched tasks
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [setTasks]);

  return null; // This component does not render anything itself
};

export default TaskFetcher;
