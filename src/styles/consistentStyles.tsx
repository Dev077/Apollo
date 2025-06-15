// src/styles/commonStyles.ts
import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export const commonStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Typography
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 14,
    color: Colors.dark,
    lineHeight: 20,
  },
  
  // Cards
  card: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Buttons
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  buttonSecondaryText: {
    color: Colors.primary,
  },
  
  // Progress bars
  progressContainer: {
    height: 8,
    backgroundColor: Colors.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  
  // Lists
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  
  // Spacing
  marginTop: {
    marginTop: 20,
  },
  marginBottom: {
    marginBottom: 20,
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
});

// Category specific colors
export const categoryColors = {
  cognitive: '#3B82F6', // Blue
  physical: '#EF4444',  // Red
  social: '#F59E0B',    // Yellow/Orange
  language: '#8B5CF6',  // Purple
};