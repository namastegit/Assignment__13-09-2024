import { atom } from 'recoil';

export const tasksState = atom({
  key: 'tasksState',
  default: [],
});

export const filterState = atom({
  key: 'filterState',
  default: 'all', 
});
