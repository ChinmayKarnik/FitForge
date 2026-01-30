
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { normalizeWidth, normalizeHeight } from '../utils/normalize';
import { databaseController } from '../data';


type Exercise = {
  name?: string;
  exerciseName?: string;
  exerciseId?: string;
  id?: string;
};

type Workout = {
  startTime: number;
  endTime: number;
  exercises?: Exercise[];
  routineName?: string;
};

type Props = {
  workout: Workout;
};

export const WorkoutSummaryCard: React.FC<Props> = ({ workout }) => {
  // Calculate duration in minutes and seconds
  const durationMs = workout.endTime - workout.startTime;
  const durationMin = Math.floor(durationMs / 60000);
  const durationSec = Math.floor((durationMs % 60000) / 1000);
  const durationStr = `${durationMin}m ${durationSec < 10 ? '0' : ''}${durationSec}s`;

  // Get distinct exercise names
  let exerciseNames: string[] = [];
  if (workout.exercises && workout.exercises.length > 0) {
    const allNames = workout.exercises.map((e: Exercise) => {
      const ex = databaseController.getExerciseById(e.id);
      return ex.name;
    });
    exerciseNames = Array.from(new Set(allNames));
  }

  // Theme colors
  const badgeBg = '#E5C97B'; // soft gold
  const badgeTextColor = '#7C6F57';
  const routine = databaseController.getRoutineById(workout.routineId)
  const routineName =routine?.name || 'Tuesday Workout';
  const dividerColor = '#F2E9D8';
  const cardShadow = '#E5C97B';

  return (
    <View style={styles.cardOuterShadow}>
      <View style={styles.cardContainer}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.timeText}>
              Jan 3, 2026, {new Date(workout.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
            <View style={styles.badgeRow}>
              <View style={styles.placeholderCircle} />
              <Text style={styles.badgeText}>{routineName}</Text>
            </View>
          </View>
          <Text style={styles.durationText}>{durationStr}</Text>
        </View>
        <View style={styles.exerciseList}>
          {exerciseNames.length > 0 ? exerciseNames.map((name, idx) => (
            <View key={name} style={styles.exerciseRow}>
              <View style={styles.exerciseIcon} />
              <Text style={styles.exerciseName}>{name}</Text>
              {idx < exerciseNames.length - 1 && <View style={[styles.divider, { backgroundColor: dividerColor }]} />}
            </View>
          )) : <Text style={styles.exerciseName}>No exercises</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardOuterShadow: {
    marginHorizontal: 16,
    marginVertical: 14,
    borderRadius: 24,
    shadowColor: '#E5C97B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 8,
  },
  cardContainer: {
    backgroundColor: '#FFFDF7',
    borderRadius: 24,
    padding: 22,
    minHeight: 120,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  headerLeft: {
    flex: 1,
  },
  timeText: {
    color: '#A89B7C',
    fontSize: 15,
    fontFamily: 'System',
    marginBottom: 6,
    fontWeight: '600',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  placeholderCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F7B733',
    marginRight: 8,
  },
  badgeText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#7C6F57',
    fontFamily: 'System',
    letterSpacing: 0.2,
  },
  durationText: {
    color: '#C6A15B',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'System',
    alignSelf: 'flex-start',
    marginLeft: 12,
  },
  exerciseList: {
    marginTop: 8,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  exerciseIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#E5C97B',
    marginRight: 10,
  },
  exerciseName: {
    color: '#7C6F57',
    fontSize: 15,
    fontFamily: 'System',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    flex: 1,
    marginLeft: 24,
    marginVertical: 2,
    backgroundColor: '#F2E9D8',
  },
});
