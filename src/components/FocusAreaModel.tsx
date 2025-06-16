// src/components/FocusAreaModal.tsx
import React from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TaskCategory } from '../types';
import { Colors } from '../constants/colors';
import { commonStyles } from '../styles/consistentStyles';

// Define categoryColors locally
const categoryColors = {
  cognitive: '#3B82F6', // Blue
  physical: '#EF4444',  // Red
  social: '#F59E0B',    // Yellow/Orange
  language: '#8B5CF6',  // Purple
};

interface FocusAreaModalProps {
  visible: boolean;
  currentFocus?: TaskCategory;
  onSelect: (category: TaskCategory) => void;
  onClose: () => void;
}

export default function FocusAreaModal({ 
  visible, 
  currentFocus, 
  onSelect, 
  onClose 
}: FocusAreaModalProps) {
  const categories: Array<{
    id: TaskCategory;
    name: string;
    icon: string;
    description: string;
  }> = [
    {
      id: 'cognitive',
      name: 'Cognitive',
      icon: 'bulb',
      description: 'Focus on mental challenges, learning, and problem-solving',
    },
    {
      id: 'physical',
      name: 'Physical',
      icon: 'fitness',
      description: 'Prioritize exercise, health, and physical activities',
    },
    {
      id: 'social',
      name: 'Social',
      icon: 'people',
      description: 'Enhance relationships and social connections',
    },
    {
      id: 'language',
      name: 'Language',
      icon: 'language',
      description: 'Improve communication and language skills',
    },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Choose Focus Area</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={Colors.gray} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.modalSubtitle}>
            Select an area to receive extra daily tasks and accelerate your growth
          </Text>

          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  currentFocus === category.id && styles.selectedCard,
                ]}
                onPress={() => {
                  onSelect(category.id);
                  onClose();
                }}
              >
                <View 
                  style={[
                    styles.iconContainer, 
                    { backgroundColor: categoryColors[category.id] + '20' }
                  ]}
                >
                  <Ionicons
                    name={category.icon as any}
                    size={32}
                    color={categoryColors[category.id]}
                  />
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryDescription}>{category.description}</Text>
                </View>
                {currentFocus === category.id && (
                  <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  modalSubtitle: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 24,
    lineHeight: 20,
  },
  categoriesContainer: {
    // gap is not supported in all RN versions
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.offWhite,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: 12,
  },
  selectedCard: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 18,
  },
});