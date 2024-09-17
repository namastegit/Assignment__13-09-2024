import { selector } from 'recoil';
import { tasksState, filterState } from './atoms';

export const filteredTasksState = selector({
  key: 'filteredTasksState',
  get: ({ get }) => {
    const tasks = get(tasksState);
    const filter = get(filterState);

    if (filter === 'all') {
      return tasks;
    }

    return tasks.filter(task => task.status === filter);
  },
});
