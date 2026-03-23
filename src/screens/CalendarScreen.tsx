import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Image } from 'react-native';
import white_left_arrow from '../images/white-left-arrow.png';
import white_right_arrow from '../images/white-right-arrow.png';
import flame from '../images/flame.png';
import calendar2 from '../images/calendar-2.png';
import clock2 from '../images/clock-2.png';
import dumbbell from '../images/orange-dumbbell.png';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import { get } from 'react-native/Libraries/NativeComponent/NativeComponentRegistry';
import { doesDayHaveWorkout, getAverageWorkoutDurationCurrentWeekMins, getCurrentWeekWorkoutCount, getStreakForDate } from '../utils/workoutUtils';
import { getSectionKeys } from 'react-native/types_generated/Libraries/ReactNative/AppRegistryImpl';



export const CalendarScreen = () => {
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const monthYearString = selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = firstDay + daysInMonth;
  const numberOfRows = Math.ceil(totalCells / 7);
  const currentStreak = getStreakForDate(new Date()); 
  const numberOfWorkoutsThisWeek = getCurrentWeekWorkoutCount();
  const workoutsText = numberOfWorkoutsThisWeek === 1 ? "1 Workout" : `${numberOfWorkoutsThisWeek} Workouts`;
  const streakText = currentStreak === 1 ? "1 Day" : `${currentStreak} Days`;
  const avrDurationThisWeekMins = getAverageWorkoutDurationCurrentWeekMins();
  
  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const getDateNumberFromRowCol = (rowIndex: number, colIndex: number) => {
    // Get the first day of the month (0=Sun, 1=Mon, ...)
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Calculate the cell's index in the grid (0-based)
    const cellIndex = rowIndex * 7 + colIndex;
    // The first date appears at index = firstDay
    const dateNumber = cellIndex - firstDay + 1;
    if (dateNumber < 1 || dateNumber > daysInMonth) {
      return null;
    }
    return dateNumber;
  }
  
  const getIfDateHasWorkout = (dateNumber: number | null) => {
    if (!dateNumber) return false;
    // Use the current calendar's year and month, and the given dateNumber
    const date = new Date(year, month, dateNumber);
    return doesDayHaveWorkout(date);
  }

  return (
    <View style={styles.bg}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          hitSlop={{ top: normalizeHeight(20), bottom: normalizeHeight(20), left: normalizeWidth(20), right: normalizeWidth(20) }}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.backIcon}
            source={white_left_arrow}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendar</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.statsContainer}>
          {/* Current Streak Card */}
          <View style={styles.statCard}>
            <Image source={flame} style={styles.flameIcon} />
            <Text style={styles.statLabel}>Current Streak</Text>
            <Text style={styles.statValue}>{streakText}</Text>
          </View>

          {/* This Week Card */}
          <View style={styles.statCard}>
            <Image source={calendar2} style={styles.calendarIcon} />
            <Text style={styles.statLabel}>This Week</Text>
            <Text style={styles.statValue}>{workoutsText}</Text>
          </View>

          {/* Average Duration Card */}
          <View style={styles.statCard}>
            <Image source={clock2} style={styles.clockIcon} />
            <Text style={styles.statLabel}>Avg Duration</Text>
            <Text style={styles.statValue}>{avrDurationThisWeekMins} Min</Text>
          </View>
        </View>

        <View>
          <View style={{
            backgroundColor: '#282d4b',
            height: normalizeHeight(50),
            borderTopWidth: normalize(1),
            borderTopColor: '#3d4868',
            borderLeftColor: '#3d4868',
            borderRightColor: '#3d4868',
            borderTopLeftRadius: normalize(8),
            borderTopRightRadius: normalize(8),
            borderLeftWidth: normalize(1),
            borderRightWidth: normalize(1),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <TouchableOpacity
              onPress={handlePrevMonth}
              hitSlop={{ top: normalizeHeight(16), bottom: normalizeHeight(16), left: normalizeWidth(16), right: normalizeWidth(16) }}
            >
              <Image source={white_left_arrow} style={styles.inlineLeftArrow} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text
                style={{
                  color: '#e7ebf5',
                  fontWeight: '500',
                  fontSize: normalize(16),
                }}
              >{monthYearString}</Text>
            </View>
            <TouchableOpacity
              onPress={handleNextMonth}
              hitSlop={{ top: normalizeHeight(16), bottom: normalizeHeight(16), left: normalizeWidth(16), right: normalizeWidth(16) }}
            >
              <Image source={white_right_arrow} style={styles.inlineRightArrow} />
            </TouchableOpacity>
          </View>

          <View style={{
            flexDirection: 'row',
            backgroundColor: 'transparent',
            borderBottomWidth: normalize(1),
            borderBottomColor: '#353c58',
            paddingVertical: normalizeHeight(8),
            borderRightWidth: normalize(2),
            borderLeftWidth: normalize(2),
            borderLeftColor:  '#2e3754' ,
            borderRightColor:'#2e3754' ,
            borderTopWidth: normalize(1),
            borderTopColor: '#2e3754',
          }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
              <View
                key={day}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    color: '#e7ebf5',
                    fontWeight: '500',
                    fontSize: normalize(13),
                    opacity: 0.8,
                  }}
                >{day}</Text>
              </View>
            ))}
          </View>

          <View>
            {Array.from({ length: numberOfRows }).map((_, rowIndex) => {
              const isFirstRow = rowIndex === 0;
              const isLastRow = rowIndex === numberOfRows - 1;

              return (
                <View key={rowIndex} style={{ flexDirection: 'row' }}>
                  {Array.from({ length: 7 }).map((_, colIndex) => {
                    const dateNumber = getDateNumberFromRowCol(rowIndex, colIndex);
                    const isFirstCell = colIndex === 0;
                    const isLastCell = colIndex === 6;
                    const isBottomLeftCell = isLastRow && isFirstCell;
                    const isBottomRightCell = isLastRow && isLastCell;
                    const hasWorkout = getIfDateHasWorkout(dateNumber);
                    const today = new Date();
                    const isToday = (
                      dateNumber === today.getDate() &&
                      month === today.getMonth() &&
                      year === today.getFullYear()
                    );
                    return (<View
                      key={colIndex}
                      style={[{
                        flex: 1,
                        height: normalizeHeight(50),
                        borderWidth: normalize(1),
                        borderColor: '#30374c',

                      },
                      isFirstRow && { borderTopWidth: normalize(0) },
                      isFirstCell && { borderLeftWidth: normalize(2) },
                      isLastCell && { borderRightWidth: normalize(2) },
                      isLastRow && { borderBottomWidth: normalize(2) },
                      isBottomLeftCell && { borderBottomLeftRadius: normalize(8) },
                      isBottomRightCell && { borderBottomRightRadius: normalize(8) },
                      ]}
                    >

                      {(hasWorkout && !isToday) ?
                        (<View style={{
                          flex: 1,
                          alignItems: 'center',
                          margin: normalize(2),
                          borderWidth:normalize(1),
                          borderColor: '#6e414c',
                          borderRadius: normalize(4),
                          paddingTop: normalizeHeight(6),
                          backgroundColor:'rgba(234, 48, 4, 0.3)',

                        }}>
                          <Text style={{
                            color: 'white',
                            fontSize: normalize(14),
                            fontWeight: '400',
                          }}>{dateNumber}</Text>
                          <Image 
                            source={dumbbell}
                            style={{
                              aspectRatio: (333.0/198.0),
                              height: normalizeHeight(9),
                              marginTop: normalizeHeight(3),
                            }}
                          />
                        </View>
                        )
                        :
                        (<View style={[{
                          flex: 1,
                          alignItems: 'center',
                          paddingTop: normalizeHeight(8),
                        },
                        isToday && {backgroundColor:'rgba(234, 48, 4)'}
                        ]}>
                          <Text style={{
                            color: 'white',
                            fontSize: normalize(14),
                            fontWeight: '400',
                          }}>{dateNumber}</Text>
                        </View>)
                      }
                    </View>
                    )
                  }
                  )}
                </View>
              );
            })
            }
          </View>
        </View>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: 'rgba(36, 42, 65)',
  },
  header: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(68, 75, 95)',
    alignItems: 'center',
    backgroundColor: 'rgba(36, 42, 65)',
    paddingTop: normalizeHeight(40),
    paddingBottom: normalizeHeight(12),
    position: 'relative',
  },
  headerTitle: {
    fontSize: normalizeWidth(22),
    letterSpacing: 1,
    fontWeight: '700',
    color: '#fefefe',
  },
  backButton: {
    position: 'absolute',
    top: normalizeHeight(46),
    left: normalizeWidth(16),
  },
  backIcon: {
    width: normalizeWidth(9),
    height: normalizeWidth(9) * (86.0 / 51.0),
    aspectRatio: 51.0 / 86.0,
    resizeMode: 'stretch',
  },
  inlineLeftArrow: {
    width: normalizeWidth(9),
    height: normalizeWidth(9) * (86.0 / 51.0),
    aspectRatio: 51.0 / 86.0,
    resizeMode: 'contain',
    marginLeft: normalizeWidth(15),
  },
  inlineRightArrow: {
    width: normalizeWidth(9),
    height: normalizeWidth(9) * (86.0 / 51.0),
    aspectRatio: 51.0 / 86.0,
    resizeMode: 'contain',
    marginRight: normalizeWidth(15),
  },
  container: {
    flex: 1,
    paddingHorizontal: normalizeWidth(16),
    paddingTop: normalizeHeight(20),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: normalizeWidth(12),
    marginBottom: normalizeHeight(24),
  },
  statCard: {
    flex: 1,
    backgroundColor: '#252c49',
    borderRadius: normalizeWidth(12),
    borderWidth: 1,
    borderColor: '#353c58',
    paddingVertical: normalizeHeight(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: normalizeWidth(50),
    height: normalizeHeight(50),
    marginBottom: normalizeHeight(12),
    resizeMode: 'contain',
  },
  flameIcon: {
    height: normalizeHeight(40),
    aspectRatio: (506.0) / (656.0),
    marginBottom: normalizeHeight(12),
    resizeMode: 'contain',
  },
  calendarIcon: {
    height: normalizeHeight(40),
    aspectRatio: (337.0 / 365.0),
    marginBottom: normalizeHeight(12),
    resizeMode: 'contain',
  },
  clockIcon: {
    height: normalizeHeight(40),
    aspectRatio: (304.0) / (351.0),
    marginBottom: normalizeHeight(12),
    resizeMode: 'contain',
  },
  statLabel: {
    fontSize: normalize(12),
    color: 'rgba(254, 254, 254, 0.7)',
    fontWeight: '400',
    marginBottom: normalizeHeight(8),
    textAlign: 'center',
  },
  statValue: {
    fontSize: normalizeWidth(16),
    fontWeight: '500',
    color: '#fefefe',
    textAlign: 'center',
  },
  calendarSection: {
    marginTop: normalizeHeight(24),
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalizeHeight(20),
    paddingHorizontal: normalizeWidth(16),
  },
  monthName: {
    fontSize: normalizeWidth(18),
    fontWeight: '600',
    color: '#fefefe',
  },
  navButton: {
    fontSize: normalizeWidth(24),
    fontWeight: '600',
    color: '#fefefe',
    paddingHorizontal: normalizeWidth(16),
  },
  weekdayRow: {
    flexDirection: 'row',
    paddingHorizontal: normalizeWidth(16),
    marginBottom: normalizeHeight(12),
  },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    color: 'rgba(254, 254, 254, 0.6)',
    fontWeight: '500',
    fontSize: normalizeWidth(12),
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: normalizeWidth(16),
  },
  dayCell: {
    width: '14.285%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalizeHeight(8),
  },
  dayText: {
    fontSize: normalizeWidth(14),
    color: '#fefefe',
    fontWeight: '500',
  },
});