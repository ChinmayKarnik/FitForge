// @ts-nocheck
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { normalizeWidth, normalizeHeight, normalize } from '../utils/normalize';
import { databaseController } from '../data';
import { getDayOfWeek } from '../utils/dateTimeUtils';
import { formatDateString, formatTimeString } from './dateTimeUtils';
import clock from '../images/clock-thick.png';
import calendarIcon from '../images/calendar.png';

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
  onPress?: () => void;
  disableHorizontalMargin?: boolean;
};

const ACCENT = '#4f7ee8';

export const WorkoutSummaryCard: React.FC<Props> = ({ workout, onPress, disableHorizontalMargin = false }) => {
  const durationMs = workout.endTime - workout.startTime;
  const durationMin = Math.floor(durationMs / 60000);
  const dayOfTheWeek = getDayOfWeek(workout.startTime);

  const exerciseSetCounts: Record<string, number> = {};
  if (workout.exercises?.length > 0) {
    workout.exercises.forEach((e: Exercise) => {
      const ex = databaseController.getExerciseById(e.exerciseId);
      if (ex?.name) exerciseSetCounts[ex.name] = (exerciseSetCounts[ex.name] || 0) + 1;
    });
  }
  const exerciseNames = Object.keys(exerciseSetCounts);

  const routine = databaseController.getRoutineById(workout.routineId);
  const routineName = routine?.name || 'Free Workout';
  const workoutTitle = workout.name ? workout.name : `${dayOfTheWeek} - ${routineName}`;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={{
        marginHorizontal: disableHorizontalMargin ? 0 : normalizeWidth(16),
        backgroundColor: '#272d46',
        borderRadius: normalize(10),
        borderWidth: normalize(1),
        borderColor: '#3d4563',
      }}>

        {/* Header */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: normalizeWidth(14),
          paddingVertical: normalizeHeight(12),
        }}>
          <Text
            style={{
              flex: 1,
              color: '#f0f2ff',
              fontSize: normalize(15),
              fontWeight: '700',
            }}
            numberOfLines={1}
          >
            {workoutTitle}
          </Text>
          <View style={{
            marginLeft: normalizeWidth(8),
            borderWidth: normalize(1),
            borderColor: '#5a7bb3',
            borderRadius: normalize(4),
            backgroundColor: '#1f243b',
            paddingHorizontal: normalizeWidth(6),
            paddingVertical: normalizeHeight(3),
          }}>
            <Text style={{
              color: '#7fb3ff',
              fontSize: normalize(10),
              fontWeight: '600',
              letterSpacing: 0.3,
            }}>
              {exerciseNames.length} EXERCISES
            </Text>
          </View>
        </View>

        {/* Exercise list */}
        <View style={{
          paddingHorizontal: normalizeWidth(14),
          paddingVertical: normalizeHeight(10),
        }}>
          {exerciseNames.map((exName, index) => (
            <View
              key={exName}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: index < exerciseNames.length - 1 ? normalizeHeight(6) : 0,
              }}
            >
              <View style={{
                width: normalize(7),
                height: normalize(7),
                borderRadius: normalize(4),
                backgroundColor: '#7a7f98',
                marginRight: normalizeWidth(10),
              }} />
              <Text style={{
                flex: 1,
                color: '#c8ccdf',
                fontSize: normalize(13),
              }}>
                {exName}
              </Text>
              <Text style={{
                color: '#7a7f98',
                fontSize: normalize(12),
              }}>
                {exerciseSetCounts[exName]} sets
              </Text>
            </View>
          ))}
        </View>

        <View style={{ height: normalize(1), backgroundColor: 'rgba(180,180,180,0.15)' }} />

        {/* Footer */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: normalizeWidth(14),
          paddingVertical: normalizeHeight(12),
        }}>
          <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={calendarIcon}
              style={{
                width: normalizeWidth(16),
                height: normalizeWidth(16) * (420.0 / 410.0),
                aspectRatio: (410.0 / 420.0),
                resizeMode: 'contain',
                tintColor: '#AEB3D1',
                marginRight: normalizeWidth(8),
              }}
            />
            <Text style={{ color: '#AEB3D1', fontSize: normalize(12), fontFamily: 'SpaceMono-Regular' }}>
              {formatDateString(workout.startTime)}
            </Text>
            <View style={{
              width: normalize(3),
              height: normalize(3),
              borderRadius: normalize(2),
              backgroundColor: '#AEB3D1',
              marginHorizontal: normalizeWidth(6),
            }} />
            <Text style={{ color: '#AEB3D1', fontSize: normalize(12), fontFamily: 'SpaceMono-Regular' }}>
              {formatTimeString(workout.startTime)}
            </Text>
          </View>
          <View style={{
            width: normalize(1),
            height: normalizeHeight(14),
            backgroundColor: 'rgba(255,255,255,0.25)',
          }} />
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: normalizeWidth(14) }}>
            <Image
              source={clock}
              style={{
                width: normalizeWidth(13),
                aspectRatio: (357.0 / 346.0),
                resizeMode: 'contain',
                tintColor: '#AEB3D1',
                marginRight: normalizeWidth(7),
                marginLeft:normalizeWidth(20)
              }}
            />
            <Text style={{ color: '#AEB3D1', fontSize: normalize(12), fontFamily: 'SpaceMono-Regular' }}>
              {durationMin} min
            </Text>
          </View>
        </View>

      </View>
    </TouchableOpacity>
  );
};
