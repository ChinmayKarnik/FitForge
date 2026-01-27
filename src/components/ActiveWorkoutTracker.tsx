import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { databaseController } from '../data';
import { useWorkoutTimer, useWorkoutState, useActiveExercise } from '../hooks';
import { ExercisePickerModal } from './ExercisePickerModal';
import { ExerciseFormModal } from './ExerciseFormModal';
import { Exercise } from '../data/types';

type Props = {
  onEndWorkout: () => void;
};

export const ActiveWorkoutTracker = ({ onEndWorkout }: Props) => {
  const { startTime, elapsedTime, formatTime } = useWorkoutTimer();
  const { workout, addExercise, endWorkout } = useWorkoutState(startTime);
  const {
    activeExercise,
    formData,
    setFormData,
    startExercise,
    saveExercise,
    discardExercise,
  } = useActiveExercise(addExercise);

  const [showExercisePicker, setShowExercisePicker] = useState(false);
  const [showExerciseForm, setShowExerciseForm] = useState(false);

  const exercises = databaseController.getAllExercises();

  const handleSelectExercise = (exercise: Exercise) => {
    startExercise(exercise);
    setShowExercisePicker(false);
  };

  const handleStopExercise = () => {
    setShowExerciseForm(true);
  };

  const handleSaveExercise = () => {
    saveExercise();
    setShowExerciseForm(false);
  };

  const handleDiscardExercise = () => {
    discardExercise();
    setShowExerciseForm(false);
  };

  const handleEndWorkout = () => {
    const finalWorkout = endWorkout();
    console.log('Final workout:', finalWorkout);
    onEndWorkout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Workout Tracker</Text>

      {activeExercise ? (
        <>
          <Text style={styles.timer}>Exercise: {activeExercise.name}</Text>
          <Text style={styles.instructionText}>
            Doing exercise, press stop when done
          </Text>
          <TouchableOpacity style={styles.stopButton} onPress={handleStopExercise}>
            <Text style={styles.stopButtonText}>Stop Exercise</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.timer}>Total time: {formatTime(elapsedTime)}</Text>
          <TouchableOpacity
            style={styles.startExerciseButton}
            onPress={() => setShowExercisePicker(true)}
          >
            <Text style={styles.startExerciseButtonText}>Start Exercise</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.endButton} onPress={handleEndWorkout}>
        <Text style={styles.endButtonText}>End Workout</Text>
      </TouchableOpacity>

      <ExercisePickerModal
        visible={showExercisePicker}
        exercises={exercises}
        onSelectExercise={handleSelectExercise}
        onClose={() => setShowExercisePicker(false)}
      />

      <ExerciseFormModal
        visible={showExerciseForm}
        exercise={activeExercise}
        formData={formData}
        onFormDataChange={setFormData}
        onSave={handleSaveExercise}
        onDiscard={handleDiscardExercise}
        onClose={() => setShowExerciseForm(false)}
      />
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
});
