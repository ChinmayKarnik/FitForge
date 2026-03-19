import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Image } from 'react-native';
import white_left_arrow from '../images/white-left-arrow.png';
import { normalizeHeight, normalizeWidth } from '../utils/normalize';

export const CalendarScreen = () => {
  const navigation = useNavigation();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Mock data for workouts per day
  const workoutDays = [1, 3, 5, 8, 12, 15, 18, 22, 25, 28];
  const today = new Date();

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const isToday = (day: number | null) => {
    if (!day) return false;
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const hasWorkout = (day: number | null) => {
    return day ? workoutDays.includes(day) : false;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const getSelectedDateWorkouts = () => {
    if (!selectedDate) return [];
    return [
      { name: 'Upper Body', duration: '45 min', exercises: 6 },
      { name: 'Cardio', duration: '30 min', exercises: 3 },
    ];
  };

  return (
    <View style={styles.bg}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.backIcon}
            source={white_left_arrow}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendar</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Month Navigation */}
        <View style={styles.monthNav}>
          <TouchableOpacity onPress={handlePrevMonth}>
            <Text style={styles.navButton}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.monthName}>{monthName}</Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <Text style={styles.navButton}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* Weekday Headers */}
        <View style={styles.weekdayRow}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <Text key={day} style={styles.weekdayText}>
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>
          {days.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayCell,
                isToday(day) && styles.todayCell,
                selectedDate?.getDate() === day && currentMonth.getMonth() === selectedDate.getMonth() && styles.selectedCell,
              ]}
              onPress={() => {
                if (day) {
                  setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
                }
              }}
              disabled={!day}
            >
              {day && (
                <>
                  <Text style={[styles.dayText, isToday(day) && styles.todayText]}>
                    {day}
                  </Text>
                  {hasWorkout(day) && <View style={styles.workoutIndicator} />}
                </>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Current Streak</Text>
            <Text style={styles.statValue}>7 days</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>This Week</Text>
            <Text style={styles.statValue}>4 workouts</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Avg Duration</Text>
            <Text style={styles.statValue}>42 min</Text>
          </View>
        </View>

        {/* Day Summary */}
        {selectedDate && (
          <View style={styles.daySummary}>
            <Text style={styles.daySummaryTitle}>
              {selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'short', day: 'numeric' })}
            </Text>
            {getSelectedDateWorkouts().map((workout, index) => (
              <TouchableOpacity key={index} style={styles.workoutItem}>
                <View>
                  <Text style={styles.workoutName}>{workout.name}</Text>
                  <Text style={styles.workoutDetails}>
                    {workout.duration} • {workout.exercises} exercises
                  </Text>
                </View>
                <Text style={styles.viewMore}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
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
    fontSize: 22,
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
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  monthName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fefefe',
  },
  navButton: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fefefe',
    paddingHorizontal: 16,
  },
  weekdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    color: 'rgba(254, 254, 254, 0.6)',
    fontWeight: '500',
    fontSize: 12,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(68, 75, 95, 0.3)',
  },
  todayCell: {
    backgroundColor: 'rgba(67, 233, 123, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(67, 233, 123, 0.8)',
  },
  selectedCell: {
    backgroundColor: 'rgba(67, 233, 123, 0.4)',
    borderWidth: 2,
    borderColor: '#43E97B',
  },
  dayText: {
    fontSize: 14,
    color: '#fefefe',
    fontWeight: '500',
  },
  todayText: {
    fontWeight: '700',
  },
  workoutIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#43E97B',
    position: 'absolute',
    bottom: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(68, 75, 95, 0.5)',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(68, 75, 95)',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(254, 254, 254, 0.7)',
    fontWeight: '500',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#43E97B',
  },
  daySummary: {
    backgroundColor: 'rgba(68, 75, 95, 0.5)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(68, 75, 95)',
    padding: 16,
    marginBottom: 24,
  },
  daySummaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fefefe',
    marginBottom: 12,
  },
  workoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(254, 254, 254, 0.1)',
  },
  workoutName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fefefe',
    marginBottom: 4,
  },
  workoutDetails: {
    fontSize: 12,
    color: 'rgba(254, 254, 254, 0.6)',
  },
  viewMore: {
    fontSize: 18,
    color: '#43E97B',
    fontWeight: '600',
  },
});