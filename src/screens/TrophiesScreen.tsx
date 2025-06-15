import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { commonStyles } from '../styles/consistentStyles';

export default function TrophiesScreen() {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.content}>
        <Text style={commonStyles.title}>Trophies</Text>
        <Text style={commonStyles.subtitle}>Your achievements</Text>
      </View>
    </SafeAreaView>
  );
}