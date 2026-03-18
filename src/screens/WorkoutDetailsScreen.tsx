import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { normalizeHeight, normalizeWidth, normalize } from '../utils/normalize';
import white_left_arrow from '../images/white-left-arrow.png';
import clock from '../images/clock-thick.png';
import calendarWithBorder from '../images/calendar-with-border.png';
import { databaseController } from '../data/controllers';
import ExerciseLoggedDataInline from '../components/ExerciseLoggedDataInline';

export default function WorkoutDetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const workout = route.params?.workout;
  console.log("ckck workout here is ",workout)

  const routineId = workout?.routineId;
  const routineName = routineId ? databaseController.getRoutineById(routineId)?.name || 'Unknown Routine' : '';
  // Format duration from ms to human readable string
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
      durationText = `${hours} hour${hours === 1 ? '' : 's'}`;
      if (minutes > 0) {
        durationText += ` ${minutes} min`;
      }
    }
  }

  // Format date from workout.start timestamp
  let dateText = '';
  const startTimestamp = workout?.startTime;
  if (typeof startTimestamp === 'number' && !isNaN(startTimestamp)) {
    const startDate = new Date(startTimestamp);
    const now = new Date();
    // Get midnight for today and yesterday
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

  // Format time from workout.startTime timestamp
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

  return (
    <View style={{
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: '#1c2238',
    }}>
      {/* Header */}
      <View style={{
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(68, 75, 95)',
        alignItems: 'center',
        backgroundColor: 'rgba(36, 42, 65)',
        paddingTop: normalizeHeight(40),
        paddingBottom: normalizeHeight(12)
      }}>
        <TouchableOpacity 
          style={{
            position: 'absolute',
            top: normalizeHeight(46),
            left: normalizeWidth(16),
          }}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image 
            style={{
              width: normalizeWidth(9),
              height: normalizeWidth(9) * (86.0 / 51.0),
              aspectRatio: 51.0 / 86.0,
              resizeMode: 'stretch'
            }}
            source={white_left_arrow}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 22,
            letterSpacing: 1,
            fontWeight: '700',
            color: "#fefefe"
          }}
        >Workout Details</Text>
      </View>

      {/* Body Container */}
      <View style={{
        flex: 1,
        padding: normalizeWidth(16),
      }}>
        {/* Workout Title */}
        <Text style={{
          fontSize: normalizeHeight(24),
          fontWeight: '500',
          color: '#fefefe',
          marginBottom: normalizeHeight(12),
        }}>
          {workout?.name}
        </Text>

        
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: normalizeHeight(12),
        }}>
          {/* Calendar Icon */}
          <Image
            source={calendarWithBorder}
            style={{
              width: normalizeWidth(15),
              aspectRatio: (538.0/496.0),
              marginRight: normalizeWidth(8),
              resizeMode: 'contain',
            }}
          />
          <Text style={{
            fontSize: normalizeHeight(13),
            color: '#bebdd1',
            fontWeight: '400',
          }}>
            {dateText} • {timeText}
          </Text>
           <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Image
            source={clock}
            style={{
              width: normalizeWidth(13),
              marginRight: normalizeWidth(6),
              marginLeft: normalizeWidth(8),
              aspectRatio: (357.0/346.0),
              resizeMode: 'contain',
              tintColor: '#bebdd1',
            }}
          />
          <Text style={{
            fontSize: normalizeHeight(13),
            color: '#bebdd1',
            fontWeight: '400',
          }}>
            {durationText}
          </Text>
        </View>

        </View>
       
        {/* Divider */}
        <View style={{
          height: normalizeHeight(2),
          backgroundColor: 'rgba(68, 75, 95, 0.5)',
          marginBottom: normalizeHeight(24),
        }} />

        {/* Routine Section */}
        {routineId && (
          <>
            <Text style={{
              fontSize: normalizeHeight(13),
              color: '#8a8c9c',
              fontWeight: '400',
              marginBottom: normalizeHeight(8),
            }}>
              Routine
            </Text>
            <Text style={{
              fontSize: normalizeHeight(16),
              fontWeight: '600',
              color: '#fefefe',
              marginBottom: normalizeHeight(24),
            }}>
              {routineName}
            </Text>

            {/* Divider */}
            <View style={{
              height: normalizeHeight(2),
              backgroundColor: 'rgba(68, 75, 95, 0.5)',
              marginBottom: normalizeHeight(24),
            }} />
          </>
        )}

        {/* Exercises Section */}
        {workout?.exercises && workout.exercises.length > 0 && (
          <>
            <Text style={{
              fontSize: normalize(15),
              fontWeight: '600',
              color: '#B0B7C3',
              marginBottom: normalizeHeight(12),
            }}>
              Exercises
            </Text>
            <View style={{ marginBottom: normalizeHeight(24) }}>
              {(() => {
                // Group exercises by exerciseId
                const groupedExercises: { [key: string]: any[] } = {};
                workout.exercises.forEach((ex: any) => {
                  if (!groupedExercises[ex.exerciseId]) {
                    groupedExercises[ex.exerciseId] = [];
                  }
                  groupedExercises[ex.exerciseId].push(ex);
                });

                return Object.entries(groupedExercises).map(([exerciseId, sets]) => {
                  const exercise = databaseController.getExerciseById(exerciseId);
                  const allParams = [
                    ...(exercise?.requiredParameters || []),
                    ...(exercise?.optionalParameters || []),
                  ];

                  // Calculate total duration for the exercise
                  const totalDurationMs = sets.reduce((sum: number, set: any) => {
                    const setDuration = (set.endTime || 0) - (set.startTime || 0);
                    return sum + setDuration;
                  }, 0);

                  // Format duration
                  const totalMinutes = Math.floor(totalDurationMs / 60000);
                  let exerciseDurationText = '';
                  if (totalMinutes < 60) {
                    exerciseDurationText = `${totalMinutes} min`;
                  } else {
                    const hours = Math.floor(totalMinutes / 60);
                    const minutes = totalMinutes % 60;
                    exerciseDurationText = `${hours}h ${minutes}m`;
                  }

                  return (
                    <View key={exerciseId} style={{ marginBottom: normalizeHeight(12) }}>
                      <View style={{
                        backgroundColor: 'rgba(42, 50, 75, 1)',
                        borderWidth: normalize(1),
                        borderColor: '#404359',
                        borderRadius: normalize(12),
                        overflow: 'hidden',
                      }}>
                        <View style={{
                          backgroundColor: '#1b1f35',
                          borderTopLeftRadius: normalize(12),
                          borderTopRightRadius: normalize(12),
                          paddingTop: normalizeHeight(8),
                          paddingLeft: normalizeWidth(12),
                          paddingRight: normalizeWidth(12),
                          paddingBottom: normalizeHeight(8),
                          borderBottomWidth: normalize(1),
                          borderBottomColor: '#44475d',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                          <Text style={{
                            color: '#d6d3de',
                            fontSize: normalizeHeight(14),
                            fontWeight: '600',
                          }}>
                            {exercise?.name || 'Unknown Exercise'}
                          </Text>
                          <Text style={{
                            color: '#bebdd1',
                            fontSize: normalizeHeight(14),
                            fontWeight: '500',
                          }}>
                            {exerciseDurationText}
                          </Text>
                        </View>
                        {sets.map((set: any, setIdx: number) => (
                          <View
                            key={`${exerciseId}-${setIdx}`}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingVertical: normalizeHeight(10),
                              paddingHorizontal: normalizeWidth(8),
                              borderTopWidth: setIdx > 0 ? normalize(1) : 0,
                              borderTopColor: '#404359',
                            }}
                          >
                            <Text style={{
                              color: '#c6cbda',
                              fontSize: normalize(14),
                              fontWeight: '500',
                            }}>
                              Set {setIdx + 1}
                            </Text>
                            <View style={{
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'center',
                            }}>
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
                });
              })()}
            </View>
          </>
        )}
           
      </View>
    </View>
  );
}
