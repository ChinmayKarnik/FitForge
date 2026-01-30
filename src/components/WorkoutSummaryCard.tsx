import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import workoutSummaryCardBg from '../images/workout_summary_card_bg.png';
import { normalizeWidth, normalizeHeight } from '../utils/normalize';
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

  // Get routine name if routineId exists
  let routineName = null;
  if (workout.routineId) {
    const routine = databaseController.getRoutineById(workout.routineId);
    routineName = routine ? routine.name : null;
  }

  // Card background and badge colors
  const badgeBg = '#C6A15B'; // Closer to the reference gold
  const badgeTextColor = '#fff';
  const dividerColor = 'rgba(44, 36, 24, 0.08)';

  return (
    <ImageBackground
      source={workoutSummaryCardBg}
      style={styles.cardContainer}
     // imageStyle={styles.cardImage}
      resizeMode="stretch"
    >
     
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    overflow: 'hidden',
    width: normalizeWidth(320),
    aspectRatio: 1536/1024,
    alignSelf: 'center',
  },
  cardImage: {
    borderRadius: 18,
    width: '100%',
    height: '100%',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  timeText: {
    color: '#7C6F57',
    fontSize: 14,
    fontFamily: 'System',
  },
  durationText: {
    color: '#BFA76A',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'System',
  },
  routineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 2,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingVertical: 2,
    paddingHorizontal: 14,
    marginRight: 8,
    minWidth: 32,
    backgroundColor: '#C6A15B',
    shadowColor: '#BFA76A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  badgeIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#BFA76A',
    marginRight: 6,
  },
  badgeText: {
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'System',
  },
  routineName: {
    color: '#2D2212',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'System',
  },
  exerciseList: {
    marginTop: 2,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  exerciseIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E5C97B',
    marginRight: 10,
  },
  exerciseName: {
    color: '#2D2212',
    fontSize: 15,
    fontFamily: 'System',
  },
  divider: {
    height: 1,
    marginLeft: 28,
    marginVertical: 0,
    backgroundColor: '#E0DED9',
  },
});
