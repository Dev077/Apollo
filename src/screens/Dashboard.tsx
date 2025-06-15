import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { commonStyles } from '../styles/consistentStyles';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function DashboardScreen() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.content}>
        <Text style={commonStyles.title}>Welcome, {user.username}!</Text>
        <View style={[commonStyles.card, commonStyles.marginTop]}>
          <Text style={[commonStyles.heading, { marginBottom: 4 }]}>
            Level {user.level}
          </Text>
          <Text style={[commonStyles.bodyText, { fontSize: 18, marginBottom: 8 }]}>
            {user.title}
          </Text>
          <View style={commonStyles.progressContainer}>
            <View 
              style={[
                commonStyles.progressBar, 
                { width: `${(user.xp / user.xpToNextLevel) * 100}%` }
              ]} 
            />
          </View>
          <Text style={[commonStyles.bodyText, { marginTop: 8 }]}>
            {user.xp}/{user.xpToNextLevel} XP
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}