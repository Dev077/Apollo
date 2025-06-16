// src/components/LevelProgress.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

interface LevelProgressProps {
  currentXP: number;
  requiredXP: number;
  level: number;
}

export default function LevelProgress({ currentXP, requiredXP, level }: LevelProgressProps) {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const percentage = (currentXP / requiredXP) * 100;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressText}>
            {currentXP} / {requiredXP} XP
          </Text>
        </View>
      </View>
      <Text style={styles.percentageText}>{Math.round(percentage)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  progressBarContainer: {
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
  progressTextContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark,
  },
  percentageText: {
    fontSize: 12,
    color: Colors.white,
    textAlign: 'right',
    marginTop: 4,
    fontWeight: '600',
  },
});