// src/store/tasksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskCategory } from '../types';

interface TasksState {
  dailyTasks: Task[];
  weeklyOrdeal: Task | null;
  taskHistory: Task[];
}

const initialState: TasksState = {
  dailyTasks: [],
  weeklyOrdeal: null,
  taskHistory: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setDailyTasks: (state, action: PayloadAction<Task[]>) => {
      state.dailyTasks = action.payload;
    },
    completeTask: (state, action: PayloadAction<string>) => {
      const task = state.dailyTasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = true;
        task.completedAt = new Date();
        state.taskHistory.push(task);
      }
    },
    setWeeklyOrdeal: (state, action: PayloadAction<Task>) => {
      state.weeklyOrdeal = action.payload;
    },
    resetDailyTasks: (state) => {
      state.dailyTasks = [];
    },
  },
});

export const { setDailyTasks, completeTask, setWeeklyOrdeal, resetDailyTasks } = tasksSlice.actions;
export default tasksSlice.reducer;