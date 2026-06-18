import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { normalize, normalizeF, normalizeHeight, normalizeWidth } from '../utils/normalize';
import push_person from '../images/push-person.png';

const ActiveExerciseInfo = ({ exerciseName, exerciseStartTime, workoutStartTime, elapsedTime }: any) => {
  const exerciseElapsed = elapsedTime - ((exerciseStartTime || 0) - (workoutStartTime || 0));

  const formatExerciseTime = (ms: number) => {
    const totalSeconds = Math.floor(Math.max(0, ms) / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <View style={styles.exerciseInfoCard}>

      <View style={styles.iconWithLinesRow}>
        <View style={styles.iconFlankLine} />
        <View style={styles.exerciseIconCircle}>
          <Image
            source={push_person}
            style={styles.exerciseIconImage}
          />
        </View>
        <View style={styles.iconFlankLine} />
      </View>

      <View style={styles.currentExercisePill}>
        <Text style={styles.currentExercisePillText}>CURRENT EXERCISE</Text>
      </View>

      <Text style={styles.exerciseNameText}>{exerciseName}</Text>

      <View style={styles.nameDivider} />

      <Text style={styles.instructionText}>
       {"Go smash that set!\n Tap finish exercise when done."}
      </Text>

      <View style={styles.exerciseTimerBox}>
        <Text style={styles.exerciseTimerLabel}>THIS EXERCISE</Text>
        <Text style={styles.exerciseTimerValue}>{formatExerciseTime(exerciseElapsed)}</Text>
      </View>

    </View>
  );
};

export default ActiveExerciseInfo;

const styles = StyleSheet.create({
  exerciseInfoCard: {
    marginTop: normalizeHeight(20),
    marginBottom: normalizeHeight(24),
    marginHorizontal: normalizeWidth(30),
    backgroundColor: '#20273d',
    borderWidth: normalizeF(3, 2),
    borderColor: '#485172',
    borderRadius: normalize(16),
    paddingHorizontal: normalizeWidth(30),
    paddingTop: normalizeHeight(12),
    paddingBottom: normalizeHeight(14),
    alignItems: 'center',
  },
  currentExercisePill: {
    backgroundColor: 'transparent',
    borderRadius: normalize(20),
    borderWidth: normalizeF(3, 2),
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: normalizeWidth(12),
    paddingVertical: normalizeHeight(4),
    marginBottom: normalizeHeight(12),
  },
  currentExercisePillText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: normalize(12),
    fontWeight: '400',
    letterSpacing: normalize(1),
  },
  exerciseIconCircle: {
    width: normalizeWidth(55),
    height: normalizeWidth(55),
    borderRadius: normalizeWidth(30),
    backgroundColor: 'transparent',
    borderWidth: normalizeF(3, 2),
    borderColor: '#485172',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: normalizeWidth(12),
  },
  exerciseIconImage: {
    width: normalizeWidth(25),
    height: normalizeWidth(25) * (287.0 / 332.0),
    aspectRatio: (332.0) / (287.0),
    tintColor: 'rgba(255,255,255,0.65)',
    resizeMode: 'contain',
  },
  iconWithLinesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: normalizeHeight(12),
  },
  iconFlankLine: {
    flex: 1,
    height: normalizeF(3, 2),
    backgroundColor: '#485172',
  },
  exerciseNameText: {
    fontSize: normalize(26),
    fontWeight: '700',
    lineHeight: normalize(32),
    letterSpacing: normalize(0.2),
    color: '#F2F4F8',
    textAlign: 'center',
  },
  nameDivider: {
    width: '24%',
    alignSelf: 'center',
    height: normalizeF(3.2, 2),
    backgroundColor: '#485172',
    marginTop: normalizeHeight(15),
    marginBottom: normalizeHeight(15),
  },
  instructionText: {
    fontSize: normalize(13),
    fontWeight: '400',
    color: '#A9B1C2',
    textAlign: 'center',
    lineHeight: normalize(18),
    paddingHorizontal: normalizeWidth(8),
    marginBottom: normalizeHeight(20),
  },
  exerciseTimerBox: {
    width: '70%',
    backgroundColor: '#1c2238',
    borderWidth: normalizeF(3, 2),
    borderColor: '#485172',
    borderRadius: normalize(10),
    paddingVertical: normalizeHeight(10),
    alignItems: 'center',
  },
  exerciseTimerLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: normalize(12),
    fontWeight: '400',
    letterSpacing: normalizeF(2, 10),
    marginBottom: normalizeHeight(2),
  },
  exerciseTimerValue: {
    color: '#F2F4F8',
    fontSize: normalize(22),
    fontWeight: '700',
    letterSpacing: normalize(1),
  },
});
