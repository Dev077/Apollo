// src/components/DailyProgress.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { commonStyles } from '../styles/consistentStyles';

interface DailyProgressProps {
  completedTasks: number;
  totalTasks: number;
  totalXPEarned: number;
}

export default function DailyProgress({ 
  completedTasks, 
  totalTasks, 
  totalXPEarned 
}: DailyProgressProps) {
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.row}>
        <View style={styles.stat}>
          <Ionicons name="checkmark-circle" size={24} color={Colors.white} />
          <Text style={styles.statValue}>{completedTasks}/{totalTasks}</Text>
          <Text style={styles.statLabel}>Tasks</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.stat}>
          <Ionicons name="star" size={24} color={Colors.gold} />
          <Text style={styles.statValue}>+{totalXPEarned}</Text>
          <Text style={styles.statLabel}>XP Today</Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{Math.round(progress)}% Complete</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.white,
    opacity: 0.8,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.white,
    opacity: 0.3,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: Colors.white,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '600',
  },
});