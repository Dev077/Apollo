// src/types/index.ts
export type TaskCategory = 'cognitive' | 'physical' | 'social' | 'language';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  xpReward: number;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export interface User {
  id: string;
  username: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  title: string;
  focusArea?: TaskCategory;
  skills: {
    cognitive: number;
    physical: number;
    social: number;
    language: number;
  };
  streakDays: number;
}