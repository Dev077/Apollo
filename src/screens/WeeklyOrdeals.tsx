import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { commonStyles } from '../styles/consistentStyles';

export default function WeeklyOrdealsScreen() {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.content}>
        <Text style={commonStyles.title}>Weekly Ordeals</Text>
        <Text style={commonStyles.subtitle}>Push your limits</Text>
      </View>
    </SafeAreaView>
  );
}