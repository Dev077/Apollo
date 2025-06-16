// src/utils/taskGenerator.ts
import { Task, TaskCategory } from '../types';

interface TaskTemplate {
  title: string;
  description: string;
  baseXP: number;
}

const taskTemplates: Record<TaskCategory, TaskTemplate[]> = {
  cognitive: [
    {
      title: 'Read for 30 minutes',
      description: 'Read a book or educational article',
      baseXP: 50,
    },
    {
      title: 'Solve a puzzle',
      description: 'Complete a crossword, sudoku, or brain teaser',
      baseXP: 40,
    },
    {
      title: 'Learn something new',
      description: 'Watch an educational video or take an online lesson',
      baseXP: 60,
    },
    {
      title: 'Write in journal',
      description: 'Reflect on your day and write your thoughts',
      baseXP: 45,
    },
    {
      title: 'Practice a skill',
      description: 'Spend 30 minutes practicing a professional skill',
      baseXP: 55,
    },
  ],
  physical: [
    {
      title: 'Morning workout',
      description: 'Complete a 20-minute exercise routine',
      baseXP: 60,
    },
    {
      title: 'Take 10,000 steps',
      description: 'Walk throughout the day to reach your step goal',
      baseXP: 50,
    },
    {
      title: 'Stretch session',
      description: '15 minutes of stretching or yoga',
      baseXP: 40,
    },
    {
      title: 'Cardio exercise',
      description: 'Run, bike, or swim for 30 minutes',
      baseXP: 70,
    },
    {
      title: 'Strength training',
      description: 'Complete a strength workout routine',
      baseXP: 65,
    },
  ],
  social: [
    {
      title: 'Connect with a friend',
      description: 'Call or meet with someone you care about',
      baseXP: 45,
    },
    {
      title: 'Help someone',
      description: 'Do a kind deed or volunteer',
      baseXP: 55,
    },
    {
      title: 'Join a group activity',
      description: 'Participate in a club or community event',
      baseXP: 50,
    },
    {
      title: 'Express gratitude',
      description: 'Thank someone or write a gratitude note',
      baseXP: 40,
    },
    {
      title: 'Network professionally',
      description: 'Connect with a colleague or attend a networking event',
      baseXP: 60,
    },
  ],
  language: [
    {
      title: 'Practice vocabulary',
      description: 'Learn 10 new words in your target language',
      baseXP: 45,
    },
    {
      title: 'Language conversation',
      description: 'Have a 15-minute conversation in your target language',
      baseXP: 60,
    },
    {
      title: 'Watch foreign content',
      description: 'Watch a show or video in your target language',
      baseXP: 40,
    },
    {
      title: 'Language exercises',
      description: 'Complete language learning app exercises',
      baseXP: 50,
    },
    {
      title: 'Write in target language',
      description: 'Write a paragraph or journal entry',
      baseXP: 55,
    },
  ],
};

export function generateDailyTasks(
  focusArea?: TaskCategory,
  previousTasks: Task[] = []
): Task[] {
  const tasks: Task[] = [];
  const usedTemplates: Set<string> = new Set();
  
  // Get task count based on focus area
  const taskCounts: Record<TaskCategory, number> = {
    cognitive: 1,
    physical: 1,
    social: 1,
    language: 1,
  };
  
  // Add extra task for focus area
  if (focusArea) {
    taskCounts[focusArea] += 1;
  }
  
  // Generate tasks for each category
  Object.entries(taskCounts).forEach(([category, count]) => {
    const categoryTemplates = [...taskTemplates[category as TaskCategory]];
    
    for (let i = 0; i < count; i++) {
      // Filter out recently used templates
      const availableTemplates = categoryTemplates.filter(
        template => !usedTemplates.has(template.title)
      );
      
      if (availableTemplates.length === 0) break;
      
      // Select random template
      const randomIndex = Math.floor(Math.random() * availableTemplates.length);
      const template = availableTemplates[randomIndex];
      
      // Create task
      const task: Task = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: template.title,
        description: template.description,
        category: category as TaskCategory,
        xpReward: template.baseXP + Math.floor(Math.random() * 20) - 10, // ±10 XP variation
        completed: false,
        createdAt: new Date(),
      };
      
      tasks.push(task);
      usedTemplates.add(template.title);
    }
  });
  
  // Shuffle tasks
  return tasks.sort(() => Math.random() - 0.5);
}