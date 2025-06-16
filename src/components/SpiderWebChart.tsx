// src/components/SpiderWebChart.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polygon, Line, Circle, G } from 'react-native-svg';
import { Colors } from '../constants/colors';

// Define categoryColors locally to avoid import issues
const categoryColors = {
  cognitive: '#3B82F6', // Blue
  physical: '#EF4444',  // Red
  social: '#F59E0B',    // Yellow/Orange
  language: '#8B5CF6',  // Purple
};

interface SpiderWebChartProps {
  skills: {
    cognitive: number;
    physical: number;
    social: number;
    language: number;
  };
  size?: number;
}

export default function SpiderWebChart({ skills, size = 250 }: SpiderWebChartProps) {
  const center = size / 2;
  const radius = size * 0.35;
  const categories = ['cognitive', 'physical', 'social', 'language'] as const;
  const labels = ['Cognitive', 'Physical', 'Social', 'Language'];
  
  // Calculate angles for each category
  const angleStep = (Math.PI * 2) / categories.length;
  
  // Helper function to get point coordinates
  const getPoint = (value: number, index: number, maxValue: number = 100) => {
    const angle = index * angleStep - Math.PI / 2; // Start from top
    const normalizedValue = Math.min(value / maxValue, 1);
    const r = radius * normalizedValue;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };
  
  // Create points for the skill polygon
  const skillPoints = categories.map((cat, i) => getPoint(skills[cat], i));
  const skillPolygonPoints = skillPoints.map(p => `${p.x},${p.y}`).join(' ');
  
  // Create grid lines
  const gridLevels = [20, 40, 60, 80, 100];
  
  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Svg width={size} height={size} style={styles.svg}>
          {/* Grid circles */}
          {gridLevels.map((level, i) => (
            <Circle
              key={level}
              cx={center}
              cy={center}
              r={(radius * level) / 100}
              fill="none"
              stroke={Colors.lightGray}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
          ))}
          
          {/* Axis lines */}
          {categories.map((_, i) => {
            const endPoint = getPoint(100, i);
            return (
              <Line
                key={i}
                x1={center}
                y1={center}
                x2={endPoint.x}
                y2={endPoint.y}
                stroke={Colors.lightGray}
                strokeWidth="1"
                strokeOpacity="0.5"
              />
            );
          })}
          
          {/* Skill polygon */}
          <Polygon
            points={skillPolygonPoints}
            fill={Colors.primary}
            fillOpacity="0.3"
            stroke={Colors.primary}
            strokeWidth="2"
          />
          
          {/* Skill points */}
          {skillPoints.map((point, i) => (
            <Circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="6"
              fill={categoryColors[categories[i]]}
              stroke={Colors.white}
              strokeWidth="2"
            />
          ))}
        </Svg>
        
        {/* Labels as overlays */}
        {categories.map((cat, i) => {
          const labelPoint = getPoint(120, i);
          const label = labels[i];
          const value = Math.round(skills[cat]);
          
          return (
            <View
              key={i}
              style={[
                styles.labelContainer,
                {
                  left: labelPoint.x - 40,
                  top: labelPoint.y - 20,
                },
              ]}
            >
              <Text style={[styles.labelText, { color: categoryColors[cat] }]}>
                {label}
              </Text>
              <Text style={styles.valueText}>{value}</Text>
            </View>
          );
        })}
      </View>
      
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Skill Distribution</Text>
        <Text style={styles.legendSubtitle}>
          Complete tasks to improve your skills
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chartContainer: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  svg: {
    position: 'absolute',
  },
  labelContainer: {
    position: 'absolute',
    width: 80,
    alignItems: 'center',
  },
  labelText: {
    fontSize: 14,
    fontWeight: '600',
  },
  valueText: {
    fontSize: 12,
    color: Colors.gray,
  },
  legend: {
    alignItems: 'center',
    marginTop: 10,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark,
  },
  legendSubtitle: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 4,
  },
});