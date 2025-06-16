// src/components/TaskCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../types';
import { Colors } from '../constants/colors';
import { commonStyles, categoryColors } from '../styles/consistentStyles';

interface TaskCardProps {
  task: Task;
  onComplete: (taskId: string) => void;
}

export default function TaskCard({ task, onComplete }: TaskCardProps) {
  const categoryColor = categoryColors[task.category];
  const categoryIcons = {
    cognitive: 'bulb',
    physical: 'fitness',
    social: 'people',
    language: 'language',
  };

  return (
    <TouchableOpacity
      style={[styles.card, task.completed && styles.completedCard]}
      onPress={() => !task.completed && onComplete(task.id)}
      disabled={task.completed}
    >
      <View style={styles.cardContent}>
        <View style={[styles.categoryIcon, { backgroundColor: categoryColor + '20' }]}>
          <Ionicons
            name={categoryIcons[task.category] as any}
            size={24}
            color={categoryColor}
          />
        </View>
        
        <View style={styles.taskInfo}>
          <Text style={[styles.taskTitle, task.completed && styles.completedText]}>
            {task.title}
          </Text>
          <Text style={[styles.taskDescription, task.completed && styles.completedText]}>
            {task.description}
          </Text>
          <View style={styles.xpBadge}>
            <Ionicons name="star" size={16} color={Colors.gold} />
            <Text style={styles.xpText}>{task.xpReward} XP</Text>
          </View>
        </View>

        {task.completed ? (
          <Ionicons name="checkmark-circle" size={32} color={Colors.primary} />
        ) : (
          <View style={styles.checkCircle} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    ...commonStyles.card,
    marginVertical: 8,
  },
  completedCard: {
    opacity: 0.7,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  xpText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gold,
    marginLeft: 4,
  },
  checkCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.lightGray,
  },
});