import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import { getEstimatedExerciseTimeSeconds } from '../utils/workoutUtils';
import clock from '../images/clock-thick-white.png';
import stopwatch from '../images/stopwatch-white.png';
import plates_stack_2 from '../images/plates-stack-2.png';
import dumbbell from '../images/dumbbell.png';
import cross_icon from '../images/cross-icon-white.png';

const ACCENT = '#4f7ee8';

interface RoutineDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  routine: any;
}

const Dot = () => (
  <View style={{
    width: normalizeWidth(3),
    height: normalizeHeight(3),
    borderRadius: normalize(2),
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: normalizeWidth(9),
    marginTop: normalizeHeight(1),
  }} />
);

const ShortDivider = () => (
  <View style={{
    height: normalizeHeight(1),
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginTop: normalizeHeight(12),
    marginBottom: normalizeHeight(8),
  }} />
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

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.55)',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: normalizeWidth(16),
        }}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: '100%',
            maxHeight: '85%',
            backgroundColor: '#1c2238',
            borderRadius: normalize(16),
            borderWidth: normalize(1),
            borderColor: '#383e55',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: normalizeWidth(16),
            paddingTop: normalizeHeight(14),
            paddingBottom: normalizeHeight(8),
          }}>
            <Text style={{ fontSize: normalize(17), fontWeight: '700', color: '#fefefe', letterSpacing: 0.5 }}>
              Routine Details
            </Text>
            <TouchableOpacity
              style={{ position: 'absolute', right: normalizeWidth(16) }}
              onPress={onClose}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Image source={cross_icon} style={{ width: normalize(12), height: normalize(12), tintColor: '#cecfd5' }} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: normalizeHeight(20) }}
          >
            {/* Hero Card */}
            <View style={{
              marginHorizontal: normalizeWidth(16),
              marginTop: normalizeHeight(8),
              borderRadius: normalize(12),
              backgroundColor: '#283050',
              borderWidth: normalize(1),
              borderColor: '#3d4563',
              overflow: 'hidden',
            }}>
              <View style={{ paddingLeft: normalizeWidth(20), paddingRight: normalizeWidth(14), paddingVertical: normalizeHeight(14) }}>
                <Text style={{ fontSize: normalize(20), fontWeight: '700', color: '#ffffff' }}>
                  {routine.name}
                </Text>
                {/* Chip tags */}
                <View style={{ flexDirection: 'row', marginTop: normalizeHeight(12), gap: normalizeWidth(8) }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: normalize(1),
                    borderColor: 'rgba(255,255,255,0.35)',
                    borderRadius: normalize(20),
                    paddingHorizontal: normalizeWidth(10),
                    paddingVertical: normalizeHeight(5),
                  }}>
                    <Image
                      source={dumbbell}
                      style={{ width: normalizeWidth(15), height: normalizeWidth(15) * (346.0 / 539.0), tintColor: ACCENT, marginRight: normalizeWidth(4), resizeMode: 'contain' }}
                    />
                    <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: normalize(12), fontWeight: '500' }}>
                      {exercisesText}
                    </Text>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: normalize(1),
                    borderColor: 'rgba(255,255,255,0.35)',
                    borderRadius: normalize(20),
                    paddingHorizontal: normalizeWidth(10),
                    paddingVertical: normalizeHeight(5),
                  }}>
                    <Image
                      source={clock}
                      style={{ width: normalizeWidth(12), height: normalizeWidth(12) * (448.0 / 453.0), tintColor: ACCENT, marginRight: normalizeWidth(5) }}
                    />
                    <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: normalize(12), fontWeight: '500' }}>
                      {totalEstimatedTimeText}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Exercise Cards */}
            {exercises.map((exercise: any, idx: number) => {
              let setRepsText = '';
              if (typeof exercise.sets === 'number') {
                setRepsText = typeof exercise.reps === 'number'
                  ? `${exercise.sets}×${exercise.reps}`
                  : `${exercise.sets} sets`;
              }
              let restText = '';
              if (typeof exercise.rest === 'number') {
                restText = `${exercise.rest}s rest`;
              }
              const estimatedTimeMin = Math.ceil(getEstimatedExerciseTimeSeconds(exercise) / 60);
              const areNotes = !!exercise.notes;

              return (
                <View key={exercise.id ?? idx} style={{
                  flexDirection: 'row',
                  marginHorizontal: normalizeWidth(16),
                  marginTop: normalizeHeight(idx === 0 ? 20 : 10),
                  borderRadius: normalize(12),
                  backgroundColor: '#252d47',
                  borderWidth: normalize(1),
                  borderColor: '#3d4563',
                  overflow: 'hidden',
                }}>
                  <View style={{ width: normalizeWidth(6), backgroundColor: ACCENT }} />
                  <View style={{ flex: 1, paddingHorizontal: normalizeWidth(14), paddingTop: normalizeHeight(12), paddingBottom: normalizeHeight(areNotes ? 4 : 12) }}>
                    <Text style={{ fontSize: normalize(16), fontWeight: '700', color: '#ffffff' }}>
                      {exercise.name}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: normalizeHeight(8) }}>
                      <Image source={plates_stack_2} style={{ width: normalizeWidth(14), height: normalizeWidth(14) * (425.0 / 469.0), tintColor: 'rgba(255,255,255,0.58)', marginRight: normalizeWidth(4), resizeMode: 'contain' }} />
                      <Text style={{ color: 'rgba(255,255,255,0.58)', fontSize: normalize(12) }}>{setRepsText}</Text>
                      {!!restText && <Dot />}
                      {!!restText && <Image source={clock} style={{ width: normalizeWidth(12), height: normalizeWidth(12) * (448.0 / 453.0), tintColor: 'rgba(255,255,255,0.58)', marginRight: normalizeWidth(4) }} />}
                      {!!restText && <Text style={{ color: 'rgba(255,255,255,0.58)', fontSize: normalize(12) }}>{restText}</Text>}
                      <Dot />
                      <Image source={stopwatch} style={{ width: normalizeWidth(12), height: normalizeWidth(12) * (395.0 / 346.0), tintColor: 'rgba(255,255,255,0.58)', marginRight: normalizeWidth(4), resizeMode: 'contain' }} />
                      <Text style={{ color: 'rgba(255,255,255,0.58)', fontSize: normalize(12) }}>{estimatedTimeMin} min</Text>
                    </View>
                    {areNotes && <ShortDivider />}
                    {areNotes && (
                      <Text style={{ fontSize: normalize(13), fontStyle: 'italic', color: 'rgba(255,255,255,0.4)', lineHeight: normalize(19) }}>
                        {exercise.notes}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default RoutineDetailsModal;
