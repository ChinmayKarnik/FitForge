import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput, ScrollView, Switch } from 'react-native';
import { databaseController } from '../data';
import { Exercise, ExerciseParameter } from '../data/types';

type Props = {
  onEndWorkout: () => void;
};

export const ActiveWorkoutTracker = ({ onEndWorkout }: Props) => {
  const startTime = useRef(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [workout, setWorkout] = useState({
    startTime: startTime.current,
    exercises: [],
  });
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [showExercisePicker, setShowExercisePicker] = useState(false);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const exercises = databaseController.getAllExercises();

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime.current);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  const addExerciseToWorkout = (exercise) =>{
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      exercises: [...prevWorkout.exercises, exercise],
    }));
  }

    const onClickEndWorkout = () => {
        setWorkout((prevWorkout) => ({
            ...prevWorkout,
            endTime: Date.now(),
            duration: Date.now() - startTime.current,
        }));

        console.log("ckck final workout is ",
          {
            ...workout,
            endTime: Date.now(),
          }  
        )
        onEndWorkout();
    }

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const onExerciseEnd = () => {
    setShowExerciseForm(true);
  };

  const handleSaveExercise = () => {
    addExerciseToWorkout({
       exerciseId: activeExercise?.id || '',
       loggedData: formData,
       startTime: activeExercise?.startTime,
       endTime: Date.now(),
    })
    setFormData({});
    setShowExerciseForm(false);
    setActiveExercise(null);
  };

  const handleDiscardExercise = () => {
    setFormData({});
    setShowExerciseForm(false);
    setActiveExercise(null);
  };

  const renderFormField = (param: ExerciseParameter, isRequired: boolean) => {
    const value = formData[param.name];
    
    return (
      <View key={param.name}>
        <Text style={styles.formLabel}>
          {param.name.charAt(0).toUpperCase() + param.name.slice(1).replace(/([A-Z])/g, ' $1')}
          {isRequired ? ' (Required)' : ' (Optional)'}
        </Text>
        {param.type === 'number' && (
          <TextInput
            style={styles.formInput}
            placeholder={`Enter ${param.name}`}
            value={value?.toString() || ''}
            onChangeText={(text) => setFormData({ ...formData, [param.name]: text })}
            keyboardType="numeric"
          />
        )}
        {param.type === 'string' && (
          <TextInput
            style={styles.formInput}
            placeholder={`Enter ${param.name}`}
            value={value || ''}
            onChangeText={(text) => setFormData({ ...formData, [param.name]: text })}
          />
        )}
        {param.type === 'boolean' && (
          <View style={styles.switchContainer}>
            <Switch
              value={value || false}
              onValueChange={(val) => setFormData({ ...formData, [param.name]: val })}
            />
            <Text style={styles.switchLabel}>{value ? 'Yes' : 'No'}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Workout Tracker</Text>
      {
        !!activeExercise ? (
          <>
            <Text style={styles.timer}>Exercise : {activeExercise.name}</Text>
            <Text style={styles.instructionText}>Doing exercise, press stop when done</Text>
            <TouchableOpacity 
              style={styles.stopButton} 
              onPress={onExerciseEnd}
            >
              <Text style={styles.stopButtonText}>Stop Exercise</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.timer}>Total time : {formatTime(elapsedTime)}</Text>
            <TouchableOpacity 
              style={styles.startExerciseButton} 
              onPress={() => setShowExercisePicker(true)}
            >
              <Text style={styles.startExerciseButtonText}>Start Exercise</Text>
            </TouchableOpacity>
          </>
        )
      }

      <TouchableOpacity 
        style={styles.endButton} 
        onPress={onClickEndWorkout}
      >
        <Text style={styles.endButtonText}>End Workout</Text>
      </TouchableOpacity>

      <Modal
        visible={showExercisePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowExercisePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Exercise</Text>
            <FlatList
              data={exercises}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.exerciseItem}
                  onPress={() => {
                    setActiveExercise({...item, startTime: Date.now()});
                    setShowExercisePicker(false);
                  }}
                >
                  <Text style={styles.exerciseItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowExercisePicker(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showExerciseForm}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowExerciseForm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.formModalContent}>
            <ScrollView>
              <Text style={styles.formTitle}>Log Exercise Data</Text>
              <Text style={styles.formExerciseName}>{activeExercise?.name}</Text>

              {activeExercise?.requiredParameters?.map((param) => renderFormField(param, true))}
              {activeExercise?.optionalParameters?.map((param) => renderFormField(param, false))}

              <View style={styles.formButtonContainer}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveExercise}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.discardButton}
                  onPress={handleDiscardExercise}
                >
                  <Text style={styles.discardButtonText}>Discard</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 40,
  },
  timer: {
    fontSize: 48,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 60,
  },
  instructionText: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 20,
    textAlign: 'center',
  },
  startExerciseButton: {
    backgroundColor: '#34C759',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 20,
  },
  startExerciseButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  stopButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 20,
  },
  stopButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  endButton: {
    backgroundColor: '#FF9500',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 40,
  },
  endButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
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
  formModalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '85%',
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  formExerciseName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#007AFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    marginTop: 12,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  formTextArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  formButtonContainer: {
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  switchLabel: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333333',
  },
});
