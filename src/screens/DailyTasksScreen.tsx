// src/screens/DailyTasksScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { commonStyles } from '../styles/consistentStyles';
import { RootState, AppDispatch } from '../store/store';
import { setDailyTasks, completeTask } from '../store/tasksSlice';
import { addXP } from '../store/userSlice';
import TaskCard from '../components/TaskCard';
import DailyProgress from '../components/DailyProgress';
import { generateDailyTasks } from '../utils/taskGenerator';
import { Task } from '../types';

export default function DailyTasksScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { dailyTasks } = useSelector((state: RootState) => state.tasks);
  const { focusArea } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Generate tasks if none exist
    if (dailyTasks.length === 0) {
      const newTasks = generateDailyTasks(focusArea);
      dispatch(setDailyTasks(newTasks));
    }
  }, []);

  const handleCompleteTask = (taskId: string) => {
    const task = dailyTasks.find(t => t.id === taskId);
    if (!task) return;

    // Show confirmation
    Alert.alert(
      'Complete Task',
      `Mark "${task.title}" as completed?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Complete',
          onPress: () => {
            dispatch(completeTask(taskId));
            dispatch(addXP({ amount: task.xpReward, category: task.category }));
            
            // Show success message
            Alert.alert(
              'Task Completed!',
              `+${task.xpReward} XP earned`,
              [{ text: 'OK' }]
            );
          },
        },
      ]
    );
  };

  const completedCount = dailyTasks.filter(t => t.completed).length;
  const totalCount = dailyTasks.length;
  const totalXPEarned = dailyTasks
    .filter(t => t.completed)
    .reduce((sum, task) => sum + task.xpReward, 0);

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content}>
        <Text style={commonStyles.title}>Daily Tasks</Text>
        <Text style={commonStyles.subtitle}>
          Complete your daily quests to level up
        </Text>

        <DailyProgress
          completedTasks={completedCount}
          totalTasks={totalCount}
          totalXPEarned={totalXPEarned}
        />

        <View style={{ marginTop: 20 }}>
          {dailyTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleCompleteTask}
            />
          ))}
        </View>
        
        {dailyTasks.length === 0 && (
          <View style={[commonStyles.card, commonStyles.centered, { height: 200 }]}>
            <Text style={commonStyles.bodyText}>
              No tasks for today. Check back tomorrow!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}