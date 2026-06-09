import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { normalizeHeight, normalizeWidth, normalize } from '../utils/normalize';
import white_left_arrow from '../images/white-left-arrow.png';
import clock from '../images/clock-thick-white.png';
import stopwatch from '../images/stopwatch-white.png';
import calendarIcon from '../images/calendar.png';
import { databaseController } from '../data/controllers';
import ExerciseLoggedDataInline from '../components/ExerciseLoggedDataInline';

const CARD_BG = '#272d46';
const CARD_BORDER = '#3d4563';
const CARD_RADIUS = normalize(12);
const MUTED = '#8a8d9c';
const PRIMARY = '#fefefe';

const cardStyle = {
  backgroundColor: CARD_BG,
  borderRadius: CARD_RADIUS,
  borderWidth: 1,
  borderColor: CARD_BORDER,
};

const IconPlaceholder = ({ size = 22 }: { size?: number }) => (
  <View style={{
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: 'rgba(255,255,255,0.08)',
  }} />
);

export default function WorkoutDetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const workout = route.params?.workout;

  const routineId = workout?.routineId;
  const routineName = routineId ? databaseController.getRoutineById(routineId)?.name || 'Unknown Routine' : '';

  let durationText = '';
  const durationMs = workout?.duration;
  if (typeof durationMs === 'number' && !isNaN(durationMs)) {
    const totalMinutes = Math.floor(durationMs / 60000);
    if (totalMinutes < 1) {
      durationText = '1 min';
    } else if (totalMinutes < 60) {
      durationText = `${totalMinutes} min`;
    } else {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      durationText = `${hours}h`;
      if (minutes > 0) durationText += ` ${minutes}m`;
    }
  }

  let dateText = '';
  const startTimestamp = workout?.startTime;
  if (typeof startTimestamp === 'number' && !isNaN(startTimestamp)) {
    const startDate = new Date(startTimestamp);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const startMidnight = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    if (startMidnight.getTime() === today.getTime()) {
      dateText = 'Today';
    } else if (startMidnight.getTime() === yesterday.getTime()) {
      dateText = 'Yesterday';
    } else {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      dateText = `${startDate.getDate()} ${months[startDate.getMonth()]} ${startDate.getFullYear()}`;
    }
  }

  let timeText = '';
  if (typeof startTimestamp === 'number' && !isNaN(startTimestamp)) {
    const startDate = new Date(startTimestamp);
    let hours = startDate.getHours();
    const minutes = startDate.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    if (hours === 0) hours = 12;
    timeText = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }

  // Compute stats
  const groupedExercises: { [key: string]: any[] } = {};
  if (workout?.exercises) {
    workout.exercises.forEach((ex: any) => {
      if (!groupedExercises[ex.exerciseId]) groupedExercises[ex.exerciseId] = [];
      groupedExercises[ex.exerciseId].push(ex);
    });
  }
  const exerciseCount = Object.keys(groupedExercises).length;
  const setCount = workout?.exercises?.length || 0;

  return (
    <View style={{ flex: 1, backgroundColor: '#1c2238' }}>
      {/* Header */}
      <View style={{
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(68, 75, 95)',
        alignItems: 'center',
        backgroundColor: 'rgba(36, 42, 65)',
        paddingTop: normalizeHeight(40),
        paddingBottom: normalizeHeight(12),
      }}>
        <TouchableOpacity
          style={{ position: 'absolute', top: normalizeHeight(46), left: normalizeWidth(16) }}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={{
              width: normalizeWidth(9),
              height: normalizeWidth(9) * (86.0 / 51.0),
              aspectRatio: 51.0 / 86.0,
              resizeMode: 'stretch',
            }}
            source={white_left_arrow}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, letterSpacing: 1, fontWeight: '700', color: PRIMARY }}>
          Workout Details
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: normalizeWidth(16), paddingTop: normalizeHeight(20), paddingBottom: normalizeHeight(40) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Workout Title */}
        <Text style={{
          fontSize: normalize(28),
          fontWeight: '500',
          color: PRIMARY,
          letterSpacing: -0.5,
          marginBottom: normalizeHeight(16),
        }}>
          {workout?.name}
        </Text>

        {/* Meta Row Card */}
        <View style={[cardStyle, {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: normalizeHeight(10),
          paddingVertical: normalizeHeight(10),
          borderRadius: normalize(10)
        }]}>
          {/* Date */}
          <View style={{ flex: 118, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' ,
           
          }}>
            <Image source={calendarIcon} style={{ 
              width: normalizeWidth(14), aspectRatio: 410/420, resizeMode: 'contain',
               marginRight: normalizeWidth(8),
             tintColor: 'rgba(255,255,255,85)',
            }} />
            <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: normalize(11), fontWeight: '500' }}>{dateText}</Text>
          </View>

          <View style={{ width: normalizeWidth(1), height: normalizeHeight(16), backgroundColor: 'rgba(255,255,255,0.15)' }} />
          {/* Time */}
          <View style={{ flex: 92, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={clock} style={{ width: normalize(14), aspectRatio: 357/346, resizeMode: 'contain', marginRight: normalizeWidth(6),  
              tintColor: 'rgba(255,255,255,0.85)' }} />
            <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: normalize(11), fontWeight: '500' }}>{timeText}</Text>
          </View>
          <View style={{ width: 1, height: normalizeHeight(16), backgroundColor: 'rgba(255,255,255,0.15)' }} />
          {/* Duration */}
          <View style={{ flex: 93, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={stopwatch} style={{ width: normalize(14), aspectRatio: 1, resizeMode: 'contain', marginRight: normalizeWidth(6), 
               tintColor: 'rgba(255,255,255,0.85)' }} />
            <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: normalize(11), fontWeight: '500' }}>{durationText}</Text>
          </View>
        </View>

        {/* Routine Card */}
        {routineId && (
          <View style={[cardStyle, {
            flexDirection: 'row',
            alignItems: 'center',
            padding: normalizeWidth(14),
            marginBottom: normalizeHeight(10),
          }]}>
            <View style={{
              width: normalize(40),
              height: normalize(40),
              borderRadius: normalize(10),
              backgroundColor: 'rgba(255,255,255,0.06)',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: normalizeWidth(12),
            }}>
              <IconPlaceholder size={20} />
            </View>
            <View>
              <Text style={{ color: MUTED, fontSize: normalize(12), fontWeight: '400', marginBottom: 2 }}>Routine</Text>
              <Text style={{ color: PRIMARY, fontSize: normalize(16), fontWeight: '600' }}>{routineName}</Text>
            </View>
          </View>
        )}

        {/* Stats Chips */}
        <View style={{ flexDirection: 'row', gap: normalizeWidth(10), marginBottom: normalizeHeight(16) }}>
          {/* Exercises */}
          <View style={[cardStyle, {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: normalizeHeight(14),
            paddingHorizontal: normalizeWidth(14),
          }]}>
            <View style={{
              width: normalize(38),
              height: normalize(38),
              borderRadius: normalize(19),
              backgroundColor: 'rgba(255,255,255,0.07)',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: normalizeWidth(10),
            }}>
              <IconPlaceholder size={18} />
            </View>
            <View>
              <Text style={{ color: PRIMARY, fontSize: normalize(22), fontWeight: '700', lineHeight: normalize(26) }}>{exerciseCount}</Text>
              <Text style={{ color: MUTED, fontSize: normalize(11), fontWeight: '500', letterSpacing: 0.5 }}>EXERCISES</Text>
            </View>
          </View>
          {/* Sets */}
          <View style={[cardStyle, {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: normalizeHeight(14),
            paddingHorizontal: normalizeWidth(14),
          }]}>
            <View style={{
              width: normalize(38),
              height: normalize(38),
              borderRadius: normalize(19),
              backgroundColor: 'rgba(255,255,255,0.07)',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: normalizeWidth(10),
            }}>
              <IconPlaceholder size={18} />
            </View>
            <View>
              <Text style={{ color: PRIMARY, fontSize: normalize(22), fontWeight: '700', lineHeight: normalize(26) }}>{setCount}</Text>
              <Text style={{ color: MUTED, fontSize: normalize(11), fontWeight: '500', letterSpacing: 0.5 }}>SETS</Text>
            </View>
          </View>
        </View>

        {/* Exercise Cards */}
        {Object.entries(groupedExercises).map(([exerciseId, sets]) => {
          const exercise = databaseController.getExerciseById(exerciseId);
          const allParams = [
            ...(exercise?.requiredParameters || []),
            ...(exercise?.optionalParameters || []),
          ];

          const totalDurationMs = sets.reduce((sum: number, set: any) => {
            return sum + ((set.endTime || 0) - (set.startTime || 0));
          }, 0);
          const totalMinutes = Math.floor(totalDurationMs / 60000);
          const exerciseDurationText = totalMinutes < 60
            ? `${totalMinutes} min`
            : `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;

          return (
            <View key={exerciseId} style={{ marginBottom: normalizeHeight(10) }}>
              <View style={[cardStyle, { overflow: 'hidden' }]}>
                {/* Exercise header */}
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: normalizeWidth(14),
                  paddingVertical: normalizeHeight(12),
                  borderBottomWidth: 1,
                  borderBottomColor: CARD_BORDER,
                  backgroundColor: 'rgba(255,255,255,0.03)',
                }}>
                  <Text style={{ color: PRIMARY, fontSize: normalize(15), fontWeight: '700' }}>
                    {exercise?.name || 'Unknown Exercise'}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={clock} style={{ width: normalize(12), aspectRatio: 357/346, resizeMode: 'contain', marginRight: normalizeWidth(5), tintColor: MUTED }} />
                    <Text style={{ color: MUTED, fontSize: normalize(13), fontWeight: '400' }}>{exerciseDurationText}</Text>
                  </View>
                </View>
                {/* Set rows */}
                {sets.map((set: any, setIdx: number) => (
                  <View
                    key={`${exerciseId}-${setIdx}`}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: normalizeHeight(11),
                      paddingHorizontal: normalizeWidth(14),
                      borderTopWidth: setIdx > 0 ? 1 : 0,
                      borderTopColor: 'rgba(68, 75, 95, 0.3)',
                    }}
                  >
                    <Text style={{ color: MUTED, fontSize: normalize(13), fontWeight: '400', width: normalizeWidth(44) }}>
                      Set {setIdx + 1}
                    </Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', gap: normalizeWidth(16) }}>
                      <ExerciseLoggedDataInline
                        loggedData={set.loggedData || null}
                        params={allParams}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
