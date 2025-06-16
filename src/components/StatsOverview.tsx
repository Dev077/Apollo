// src/components/StatsOverview.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { commonStyles } from '../styles/consistentStyles';

interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  color?: string;
}

function StatCard({ icon, value, label, color = Colors.primary }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon as any} size={24} color={color} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

interface StatsOverviewProps {
  level: number;
  totalXP: number;
  streakDays: number;
  tasksCompleted: number;
}

export default function StatsOverview({ 
  level, 
  totalXP, 
  streakDays, 
  tasksCompleted 
}: StatsOverviewProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <StatCard 
          icon="trending-up" 
          value={level} 
          label="Level" 
          color={Colors.primary}
        />
        <StatCard 
          icon="star" 
          value={totalXP} 
          label="Total XP" 
          color={Colors.gold}
        />
      </View>
      <View style={styles.row}>
        <StatCard 
          icon="flame" 
          value={streakDays} 
          label="Day Streak" 
          color="#EF4444"
        />
        <StatCard 
          icon="checkmark-done" 
          value={tasksCompleted} 
          label="Tasks Done" 
          color={Colors.secondary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.gray,
    marginTop: 4,
  },
});