import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import { getEstimatedExerciseTimeSeconds } from '../utils/workoutUtils';
import purple_dumbbell from '../images/purple-dumbbell.png';
import clock from '../images/clock.png';
import cross_icon from '../images/cross-icon-white.png';

interface RoutineDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  routine: any;
}

const ShortDivider = () => (
  <View style={styles.shortDivider} />
);

const RoutineDetailsModal = ({ visible, onClose, routine }: RoutineDetailsModalProps) => {
  if (!routine) return null;

  const exercises = Array.isArray(routine.exercises) ? routine.exercises : [];

  const totalEstimatedTimeText = (() => {
    const totalSeconds = exercises.reduce((sum: number, ex: any) => sum + getEstimatedExerciseTimeSeconds(ex), 0);
    return `${Math.ceil(totalSeconds / 60)} min`;
  })();

  const exercisesText = (() => {
    const count = new Set(exercises.map((ex: any) => ex.exerciseId || ex.id)).size;
    return `${count} Exercise${count === 1 ? '' : 's'}`;
  })();

  const createdAtText = (() => {
    if (!routine.createdAt) return '';
    const date = new Date(routine.createdAt);
    return `Created ${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
  })();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      >
        {/* Centered card — inner TouchableOpacity stops backdrop tap from propagating */}
        <TouchableOpacity activeOpacity={1} style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Routine Details</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            hitSlop={{ top: normalize(12), bottom: normalize(12), left: normalize(12), right: normalize(12) }}
          >
            <Image source={cross_icon} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Routine info card */}
          <View style={styles.routineCard}>
            <Image style={styles.dumbbellIcon} source={purple_dumbbell} />
            <View style={{ flex: 1 }}>
              <Text style={styles.routineName}>{routine.name}</Text>
              <View style={styles.routineMeta}>
                <Text style={styles.routineMetaText}>{exercisesText}</Text>
                <View style={styles.metaDot} />
                <Text style={styles.routineMetaText}>{createdAtText}</Text>
              </View>
            </View>
          </View>

          {/* Exercise cards */}
          {exercises.map((exercise: any, index: number) => {
            const setRepsText = typeof exercise.sets === 'number'
              ? typeof exercise.reps === 'number'
                ? `${exercise.sets} sets of ${exercise.reps} reps`
                : `${exercise.sets} sets`
              : '';
            const restText = typeof exercise.rest === 'number'
              ? `Rest ${exercise.rest} sec between sets`
              : '';
            const estimatedTimeMin = Math.ceil(getEstimatedExerciseTimeSeconds(exercise) / 60);
            const areNotes = !!exercise.notes;

            return (
              <View key={exercise.id ?? index} style={styles.exerciseCard}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <View style={styles.exerciseMeta}>
                  <Text style={styles.exerciseMetaText}>{setRepsText}</Text>
                  <View style={styles.metaDot} />
                  <Text style={styles.exerciseMetaText}>{restText}</Text>
                </View>
                {areNotes ? <ShortDivider /> : <View style={{ height: normalizeHeight(4) }} />}
                <View style={styles.timeRow}>
                  <Image source={clock} style={styles.clockIcon} />
                  <Text style={styles.exerciseMetaText}>
                    Estimated time: {estimatedTimeMin} min
                  </Text>
                </View>
                {areNotes && (
                  <>
                    <ShortDivider />
                    <Text style={styles.notesLabel}>Notes</Text>
                    <Text style={styles.notesText}>{exercise.notes}</Text>
                  </>
                )}
              </View>
            );
          })}

          {/* Total time footer */}
          <View style={styles.totalTimeRow}>
            <Image source={clock} style={styles.clockIcon} />
            <Text style={styles.totalTimeText}>
              Total Estimated Time:{' '}
              <Text style={styles.totalTimeValue}>{totalEstimatedTimeText}</Text>
            </Text>
          </View>
        </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalizeWidth(16),
  },
  card: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: '#1e2540',
    borderRadius: normalize(16),
    borderWidth: normalize(1),
    borderColor: '#383e55',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalizeWidth(16),
    paddingTop: normalizeHeight(12),
    paddingBottom: normalizeHeight(6),
  },
  headerTitle: {
    fontSize: normalize(17),
    fontWeight: '700',
    color: '#fefefe',
    letterSpacing: 0.5,
  },
  closeButton: {
    position: 'absolute',
    right: normalizeWidth(16),
  },
  closeIcon: {
    width: normalize(12),
    height: normalize(12),
    tintColor: '#cecfd5',
  },
  scrollContent: {
    paddingBottom: normalizeHeight(16),
  },
  routineCard: {
    marginHorizontal: normalizeWidth(16),
    marginTop: normalizeHeight(8),
    borderWidth: normalize(1),
    borderColor: '#383e55',
    borderRadius: normalize(12),
    backgroundColor: '#292f46',
    paddingHorizontal: normalizeWidth(16),
    paddingTop: normalizeHeight(16),
    paddingBottom: normalizeHeight(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  dumbbellIcon: {
    width: normalizeWidth(28),
    aspectRatio: 423.0 / 292.0,
    marginRight: normalizeWidth(10),
  },
  routineName: {
    fontSize: normalize(17),
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: normalizeHeight(4),
  },
  routineMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routineMetaText: {
    fontSize: normalize(13),
    color: '#9594af',
  },
  metaDot: {
    width: normalizeWidth(3),
    height: normalizeHeight(3),
    borderRadius: normalize(1),
    backgroundColor: '#808093',
    marginHorizontal: normalizeWidth(6),
    marginTop: normalizeHeight(1),
  },
  exerciseCard: {
    marginHorizontal: normalizeWidth(16),
    marginTop: normalizeHeight(10),
    borderWidth: normalize(1),
    borderColor: '#383e55',
    borderRadius: normalize(8),
    backgroundColor: '#292f46',
    paddingHorizontal: normalizeWidth(12),
    paddingTop: normalizeHeight(12),
    paddingBottom: normalizeHeight(10),
  },
  exerciseName: {
    fontSize: normalize(15),
    color: '#ffffff',
    fontWeight: '500',
  },
  exerciseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalizeHeight(6),
  },
  exerciseMetaText: {
    fontSize: normalize(12),
    fontWeight: '400',
    color: 'rgba(255,255,255,0.45)',
  },
  shortDivider: {
    height: normalizeHeight(1),
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: normalizeHeight(5),
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    width: normalizeWidth(12),
    aspectRatio: 357.0 / 346.0,
    marginRight: normalizeWidth(6),
  },
  notesLabel: {
    fontSize: normalize(14),
    fontWeight: '500',
    color: '#cfcfe3',
  },
  notesText: {
    fontSize: normalize(12),
    fontWeight: '400',
    color: 'rgba(255,255,255,0.45)',
    marginTop: normalizeHeight(4),
  },
  totalTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: normalizeWidth(16),
    marginTop: normalizeHeight(12),
  },
  totalTimeText: {
    fontSize: normalize(13),
    color: 'rgba(255,255,255,0.45)',
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  totalTimeValue: {
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
});

export default RoutineDetailsModal;
