import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { databaseController } from '../data';

export const WorkoutSummaryCard = ({ workout }) => {
  // Calculate duration in minutes and seconds
  const durationMs = workout.endTime - workout.startTime;
  const durationMin = Math.floor(durationMs / 60000);
  const durationSec = Math.floor((durationMs % 60000) / 1000);
  const durationStr = `${durationMin}m ${durationSec}s`;

  // Get distinct exercise names
  let exerciseNames = [];
  if (workout.exercises && workout.exercises.length > 0) {
    const allIds = workout.exercises.map(e => e.exerciseId || e.id);
    const uniqueIds = Array.from(new Set(allIds));
    exerciseNames = uniqueIds
      .map(id => {
        const ex = databaseController.getExerciseById(id);
        return ex ? ex.name : id;
      })
      .filter(Boolean);
  }

  return (
    <View style={styles.workoutItem}>
      <Text style={styles.workoutText}>Workout ID: {workout.id}</Text>
      <Text style={styles.workoutText}>Start: {new Date(workout.startTime).toLocaleString()}</Text>
      <Text style={styles.workoutText}>End: {new Date(workout.endTime).toLocaleString()}</Text>
      <Text style={styles.workoutText}>Duration: {durationStr}</Text>
      <Text style={styles.workoutText}>Exercises: {exerciseNames.length > 0 ? exerciseNames.join(', ') : 'N/A'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  workoutItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  workoutText: {
    fontSize: 16,
  },
});
