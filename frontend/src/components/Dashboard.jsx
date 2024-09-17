import React from 'react'
import TaskForm from './TaskForm'
import TaskFilter from './TaskFilter'
import TaskFetcher from '../utils/TaskFetcher'
import TaskList from './TaskList'

function Dashboard() {
  return (
    <div>
      <TaskFetcher></TaskFetcher>
<TaskForm></TaskForm> 
<TaskFilter></TaskFilter>
<TaskList></TaskList>
   </div>
  )
}

export default Dashboard
