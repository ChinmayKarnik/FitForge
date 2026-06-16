// @ts-nocheck
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { normalizeWidth, normalizeHeight, normalize } from '../utils/normalize';
import { databaseController } from '../data';
import { getDayOfWeek } from '../utils/dateTimeUtils';
import { formatDateString, formatTimeString, thinSpace } from './dateTimeUtils';
import clock from '../images/clock-thick-white.png';
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
  const workoutTitle = workout.name || '';


  const isWorkoutInvalid = !workout.name || !workout.startTime
  if(isWorkoutInvalid){
     return null;
  }
  
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
          paddingTop: normalizeHeight(12),
          paddingBottom: normalizeHeight(10)
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
              {exerciseNames.length} {exerciseNames.length === 1 ? 'EXERCISE' : 'EXERCISES'}
            </Text>
          </View>
        </View>

        {/* Exercise list */}
        <View style={{
          paddingHorizontal: normalizeWidth(14),
          paddingTop: normalizeHeight(1),
          paddingBottom: normalizeHeight(10),
        }}>
          {exerciseNames.map((exName, index) => (
            <View
              key={exName}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: index < exerciseNames.length - 1 ? normalizeHeight(4) : 0,
              }}
            >
              <View style={{
                width: normalize(5),
                height: normalize(5),
                borderRadius: normalize(4),
                backgroundColor: '#7fb3ff',
                marginRight: normalizeWidth(10),
              }} />
              <Text style={{
                flex: 1,
                color: 'rgba(255,255,255,0.8)',
                fontSize: normalize(12),
                fontFamily: 'RobotoMono-Regular',
              }}>
                {exName}
              </Text>
              <Text style={{
                color: '#8f99c5',
                fontSize: normalize(12),
                fontFamily: 'RobotoMono-Regular',
              }}>
                {thinSpace(`${exerciseSetCounts[exName]} ${exerciseSetCounts[exName] === 1 ? 'set' : 'sets'}`)}
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
          paddingVertical: normalizeHeight(7),
        }}>
          <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={calendarIcon}
              style={{
                width: normalizeHeight(13) * (410.0 / 420.0),
                height: normalizeHeight(13),
                aspectRatio: (410.0 / 420.0),
                resizeMode: 'contain',
                tintColor: 'rgba(255,255,255,0.7)',
                marginRight: normalizeWidth(8),
              }}
            />
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: normalize(11), fontFamily: 'RobotoMono-Regular' }}>
              {formatDateString(workout.startTime)}
            </Text>
            <View style={{
              width: normalize(3),
              height: normalize(3),
              borderRadius: normalize(2),
              backgroundColor: 'rgba(255,255,255,0.6)',
              marginHorizontal: normalizeWidth(6),
            }} />
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: normalize(11), fontFamily: 'RobotoMono-Regular' }}>
              {formatTimeString(workout.startTime)}
            </Text>
          </View>
          <View style={{
            width: normalize(1),
            height: normalizeHeight(14),
            backgroundColor: 'rgba(255,255,255,0.3)',
            marginLeft:normalizeWidth(25)
          }} />
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: normalizeWidth(14) }}>
            <Image
              source={clock}
              style={{
                height: normalizeHeight(13),
                aspectRatio: (453.0 / 448.0),
                width: normalizeHeight(13) * (453.0 / 448.0),
                resizeMode: 'contain',
                tintColor: 'rgba(255,255,255,0.6)',
                marginRight: normalizeWidth(7),
                marginLeft:normalizeWidth(12),
                marginTop:normalizeHeight(1)
              }}
            />
            <Text style={{ color: 'rgba(255,255,255, 0.6)', fontSize: normalize(11), fontFamily: 'RobotoMono-Regular' }}>
              {thinSpace(`${durationMin} min`)}
            </Text>
          </View>
        </View>

      </View>
    </TouchableOpacity>
  );
};
