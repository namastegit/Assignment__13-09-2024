// import React from 'react';
// import { useRecoilValue } from 'recoil';
// import { tasksState } from '../recoil/atoms';
// import TaskItem from './TaskItem';

// const TaskList = () => {
//   const tasks = useRecoilValue(tasksState);

//   console.log("Tasks from Recoil:", tasks); // Verify the tasks being fetched

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-2">Tasks:{tasks.length}</h2>
//       {tasks.length > 0 ? (
//         tasks.map(task => (
//           <TaskItem key={task._id} task={task} />
//         ))
//       ) : (
//         <p>No tasks available</p>
//       )}
//     </div>
//   );
// }

// export default TaskList;


import React from 'react';
import { useRecoilValue } from 'recoil';
import { filteredTasksState } from '../recoil/selector';
import TaskItem from './TaskItem';

const TaskList = () => {
  const tasks = useRecoilValue(filteredTasksState); // Use filtered tasks

  console.log("Filtered Tasks from Recoil:", tasks); // Verify the filtered tasks

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Tasks: {tasks.length}</h2>
      {tasks.length > 0 ? (
        tasks.map(task => (
          <TaskItem key={task._id} task={task} />
        ))
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
}

export default TaskList;
