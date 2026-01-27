import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import { Exercise } from '../data/types';

type Props = {
  visible: boolean;
  exercises: Exercise[];
  onSelectExercise: (exercise: Exercise) => void;
  onClose: () => void;
};

export const ExercisePickerModal = ({ visible, exercises, onSelectExercise, onClose }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExercises = useMemo(() => {
    if (!searchQuery.trim()) {
      return exercises;
    }
    return exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [exercises, searchQuery]);

  const handleClose = () => {
    setSearchQuery('');
    onClose();
  };

  const handleSelectExercise = (exercise: Exercise) => {
    setSearchQuery('');
    onSelectExercise(exercise);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Exercise</Text>
          
          <TextInput
            style={styles.searchInput}
            placeholder="Search exercises..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <FlatList
            data={filteredExercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.exerciseItem}
                onPress={() => handleSelectExercise(item)}
              >
                <Text style={styles.exerciseItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No exercises found</Text>
              </View>
            }
          />
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleClose}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
  },
  emptyContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888888',
  },
  exerciseItem: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  exerciseItemText: {
    fontSize: 16,
    color: '#333333',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
