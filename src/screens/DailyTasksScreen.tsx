// src/screens/DailyTasksScreen.tsx
import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { commonStyles } from '../styles/consistentStyles';

export default function DailyTasksScreen() {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.content}>
        <Text style={commonStyles.title}>Daily Tasks</Text>
        <Text style={commonStyles.subtitle}>Complete your daily quests</Text>
      </View>
    </SafeAreaView>
  );
}
