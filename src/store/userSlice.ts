// src/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, TaskCategory } from '../types/index';

const initialState: User = {
  id: '1',
  username: 'Player',
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  title: 'Novice',
  focusArea: undefined,
  skills: {
    cognitive: 0,
    physical: 0,
    social: 0,
    language: 0,
  },
  streakDays: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addXP: (state, action: PayloadAction<{ amount: number; category: TaskCategory }>) => {
      state.xp += action.payload.amount;
      state.skills[action.payload.category] += action.payload.amount / 10;
      
      // Check for level up
      if (state.xp >= state.xpToNextLevel) {
        state.level += 1;
        state.xp = state.xp - state.xpToNextLevel;
        state.xpToNextLevel = state.level * 150;
        
        // Update title based on level
        if (state.level < 5) state.title = 'Novice';
        else if (state.level < 10) state.title = 'Apprentice';
        else if (state.level < 20) state.title = 'Journeyman';
        else if (state.level < 30) state.title = 'Expert';
        else state.title = 'Master';
      }
    },
    setFocusArea: (state, action: PayloadAction<TaskCategory>) => {
      state.focusArea = action.payload;
    },
    updateStreak: (state, action: PayloadAction<number>) => {
      state.streakDays = action.payload;
    },
  },
});

export const { addXP, setFocusArea, updateStreak } = userSlice.actions;
export default userSlice.reducer;