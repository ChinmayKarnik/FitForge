import React, { useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { routines } from '../data/dummy/routines';
import { databaseController } from '../data/controllers';

type SetInput = { [key: string]: string };
type SetInputs = { [exerciseId: string]: SetInput[] };

interface Props {
  selectedRoutineId: string;
  setInputs: SetInputs;
  handleSetInputChange: (exerciseId: string, setIdx: number, field: keyof SetInput, value: string) => void;
  handleSubmitRoutineWorkout: () => void;
  onDiscard: () => void;
  workoutDateTime: number | null;
}

export const BackdatedWorkoutRoutineInput = ({
  selectedRoutineId,
  setInputs,
  handleSetInputChange,
  addSetsForExercise,
  submitWorkout,
  onDiscard,
  workoutDateTime,
}: Props) => {


  // Collect all set parameters for the selected routine and exercises
  let allSetParameters: { [exerciseId: string]: { setIdx: number; param: string; value: string }[] } = {};
  const routine = routines.find(r => r.id === selectedRoutineId);
  if (routine) {
    routine.exercises.forEach(ex => {
      const exercise = databaseController.getExerciseById(ex.id);
      if (!exercise) return;
      const allParams = [
        ...(exercise.requiredParameters || []),
        ...(exercise.optionalParameters || []),
      ];
      if (!allSetParameters[ex.id]) allSetParameters[ex.id] = [];
      if (setInputs[ex.id]) {
        setInputs[ex.id].forEach((set, idx) => {
          allParams.forEach(param => {
            allSetParameters[ex.id].push({ setIdx: idx, param: param.name, value: set[param.name] || '' });
          });
        });
      }
    });
  }

  // Now you can use allSetParameters anywhere in the component
console.log("ckck rout",routine)
  const onSubmitWorkout = () => {
    routine?.exercises.forEach((ex ,idx)=>{
       const data = setInputs[ex.id];
       addSetsForExercise(ex,{
        numberOfSets:data.length,
        restTimeBetweenSets: Number(ex.rest)*(1000)
    },data)
    })
    submitWorkout();
    onDiscard()
  }


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Backdated Workout (Routine Entry)</Text>
      <Text style={styles.subtitle}>Workout start time: {workoutDateTime ? new Date(workoutDateTime).toLocaleString() : 'Not set'}</Text>
      {/* Display sets for selected routine */}
      {(() => {
        const routine = routines.find(r => r.id === selectedRoutineId);
        if (!routine) return null;
        return routine.exercises.map(ex => {
          const exercise = databaseController.getExerciseById(ex.id);
          if (!exercise) return null;
          const allParams = [
            ...(exercise.requiredParameters || []),
            ...(exercise.optionalParameters || []),
          ];
          return (
            <View key={ex.id} style={styles.exerciseLogCard}>
              <Text style={styles.exerciseName}>{ex.name}</Text>
              <Text style={styles.exerciseDetail}>Sets: {ex.sets}, Reps: {ex.reps}, Rest: {ex.rest}s</Text>
              {ex.notes && <Text style={styles.exerciseDetail}>Notes: {ex.notes}</Text>}
              {setInputs[ex.id] && setInputs[ex.id].map((set, idx) => (
                <View key={idx} style={styles.setInputRowVertical}>
                  <Text style={styles.setLabel}>Set {idx + 1}</Text>
                  {allParams.map(param => (
                    <View key={param.name} style={styles.paramInputGroup}>
                      <Text style={styles.paramLabel}>{param.name}{exercise.requiredParameters?.some(p => p.name === param.name) ? '' : ' (optional)'}</Text>
                      <TextInput
                        style={styles.smallInput}
                        placeholder={param.name}
                        value={set[param.name] || ''}
                        onChangeText={val => handleSetInputChange(ex.id, idx, param.name, val)}
                        keyboardType={param.type === 'number' ? 'numeric' : 'default'}
                        maxLength={param.type === 'number' ? 4 : 40}
                        placeholderTextColor="#888"
                      />
                    </View>
                  ))}
                </View>
              ))}
            </View>
          );
        });
      })()}
      <TouchableOpacity style={styles.confirmButton} onPress={onSubmitWorkout}>
        <Text style={styles.confirmButtonText}>Submit Workout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.discardButton} onPress={onDiscard}>
        <Text style={styles.discardButtonText}>Discard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  exerciseLogCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  exerciseDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  setInputRowVertical: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingVertical: 8,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 8,
  },
  paramInputGroup: {
    width: '100%',
    marginBottom: 8,
  },
  paramLabel: {
    fontSize: 13,
    color: '#444',
    marginBottom: 2,
    marginLeft: 4,
  },
  setLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
    color: '#666',
    minWidth: 50,
  },
  smallInput: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    width: '100%',
    minWidth: 60,
    color: '#333',
  },
  discardButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  discardButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});