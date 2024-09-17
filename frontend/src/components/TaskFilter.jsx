import React from 'react';
import { useRecoilState } from 'recoil';
import { filterState } from '../recoil/atoms';


const TaskFilter = () => {
  const [filter, setFilter] = useRecoilState(filterState);

  return (
    <div className="mb-4">
      <label className="mr-2">Filter by Status:</label>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="due">Due</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}

export default TaskFilter;
