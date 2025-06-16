// src/screens/DashboardScreen.tsx
import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { commonStyles } from '../styles/consistentStyles';
import { Colors } from '../constants/colors';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setFocusArea } from '../store/userSlice';
// import SpiderWebChart from '../components/SpiderWebChart';
import StatsOverview from '../components/StatsOverview';
import FocusAreaModal from '../components/FocusAreaModel';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { TaskCategory } from '../types';

export default function DashboardScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const { taskHistory } = useSelector((state: RootState) => state.tasks);
  const [showFocusModal, setShowFocusModal] = useState(false);
  
  const xpPercentage = (user.xp / user.xpToNextLevel) * 100;
  const tasksCompleted = taskHistory.length;

  const handleSelectFocus = (category: TaskCategory) => {
    dispatch(setFocusArea(category));
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content}>
        <Text style={commonStyles.title}>Welcome back, {user.username}!</Text>
        
        {/* Level Progress Card */}
        <LinearGradient
          colors={[Colors.primary, Colors.secondary]}
          style={styles.levelCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.levelHeader}>
            <View>
              <Text style={styles.levelLabel}>Level {user.level}</Text>
              <Text style={styles.titleText}>{user.title}</Text>
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelNumber}>{user.level}</Text>
            </View>
          </View>
          
          <View style={styles.xpContainer}>
            <View style={styles.xpBarBg}>
              <View style={[styles.xpBar, { width: `${xpPercentage}%` }]} />
            </View>
            <Text style={styles.xpText}>
              {user.xp} / {user.xpToNextLevel} XP
            </Text>
          </View>
        </LinearGradient>

        {/* Stats Overview */}
        <StatsOverview
          level={user.level}
          totalXP={user.xp + (user.level - 1) * 100}
          streakDays={user.streakDays}
          tasksCompleted={tasksCompleted}
        />

        {/* Skills Spider Web
        <View style={commonStyles.card}>
          <SpiderWebChart skills={user.skills} />
        </View> */}

        {/* Focus Area Selection */}
        <View style={[commonStyles.card, styles.focusCard]}>
          <Text style={styles.focusTitle}>
            <Ionicons name="compass" size={20} color={Colors.primary} /> Focus Area
          </Text>
          <Text style={styles.focusSubtitle}>
            {user.focusArea 
              ? `Currently focusing on ${user.focusArea} skills`
              : 'Select an area to get extra daily tasks'}
          </Text>
          <TouchableOpacity 
            style={styles.changeFocusButton}
            onPress={() => setShowFocusModal(true)}
          >
            <Text style={styles.changeFocusText}>
              {user.focusArea ? 'Change Focus' : 'Set Focus Area'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Focus Area Modal */}
        <FocusAreaModal
          visible={showFocusModal}
          currentFocus={user.focusArea}
          onSelect={handleSelectFocus}
          onClose={() => setShowFocusModal(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  levelCard: {
    padding: 20,
    borderRadius: 16,
    marginTop: 16,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelLabel: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 4,
  },
  levelBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
  },
  xpContainer: {
    marginTop: 8,
  },
  xpBarBg: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  xpBar: {
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 6,
  },
  xpText: {
    fontSize: 14,
    color: Colors.white,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '600',
  },
  focusCard: {
    marginTop: 16,
    marginBottom: 20,
  },
  focusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 8,
  },
  focusSubtitle: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 16,
    lineHeight: 20,
  },
  changeFocusButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  changeFocusText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
});