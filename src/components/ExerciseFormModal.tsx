import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Exercise } from '../data/types';
import { ExerciseFormField } from './ExerciseFormField';

type Props = {
  visible: boolean;
  exercise: Exercise | null;
  formData: Record<string, any>;
  onFormDataChange: (data: Record<string, any>) => void;
  onSave: () => void;
  onDiscard: () => void;
  onClose: () => void;
};

export const ExerciseFormModal = ({
  visible,
  exercise,
  formData,
  onFormDataChange,
  onSave,
  onDiscard,
  onClose,
}: Props) => {
  const handleFieldChange = (fieldName: string, value: any) => {
    onFormDataChange({ ...formData, [fieldName]: value });
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.title}>Log Exercise Data</Text>
            <Text style={styles.exerciseName}>{exercise?.name}</Text>

            {exercise?.requiredParameters?.map((param) => (
              <ExerciseFormField
                key={param.name}
                parameter={param}
                isRequired={true}
                value={formData[param.name]}
                onChange={(value) => handleFieldChange(param.name, value)}
              />
            ))}

            {exercise?.optionalParameters?.map((param) => (
              <ExerciseFormField
                key={param.name}
                parameter={param}
                isRequired={false}
                value={formData[param.name]}
                onChange={(value) => handleFieldChange(param.name, value)}
              />
            ))}

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.discardButton} onPress={onDiscard}>
                <Text style={styles.discardButtonText}>Discard</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    maxHeight: '85%',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#007AFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#34C759',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  discardButton: {
    flex: 1,
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  discardButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
