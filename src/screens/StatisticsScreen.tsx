import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import white_left_arrow from '../images/white-left-arrow.png';
import { TimeRange } from '../enums/enums';
import { TimeRangeSelector } from '../components/TimeRangeSelector';
import StatsGrid from '../components/StatsGrid';
import flame from '../images/flame.png';
import calendar_marked from '../images/calendar-marked.png';
import dumbbell from '../images/dumbbell-horizontal.png';
import plates_stack from '../images/plates-stack.png';
import dumbbell_with_heart from '../images/dumbbell-with-heart.png';
import bar_graph from '../images/bar-graph.png';
import { get } from 'react-native/Libraries/NativeComponent/NativeComponentRegistry';
import { getStatsForTimeRange, getTimeRangeIntervalFormat } from '../utils/workoutUtils';
import { stat } from 'react-native-fs';

export const StatisticsScreen = () => {
  const navigation = useNavigation();

  const formatStreak = (streak: number | null) => {
    if (streak === null) return '-';
    return `${streak} ${streak === 1 ? 'day' : 'days'}`;
  };

  const formatAverageSets = (sets: number | null) => {
    if (sets === null) return '-';
    return `${sets} ${sets === 1 ? 'set' : 'sets'}`;
  };

  const formatWeeklySessions = (sessions: number | null) => {
    if (sessions === null || sessions === 0) return '-';
    return `${sessions} ${sessions === 1 ? 'session' : 'sessions'}`;
  };

  const [selectedTimeRange, setSelectedTimeRange] = useState(TimeRange.All);
  const timeRangeIntervalFormat = getTimeRangeIntervalFormat(selectedTimeRange);
  const statsData = getStatsForTimeRange(timeRangeIntervalFormat.start, timeRangeIntervalFormat.end);
  const isEmptyStats = true || statsData.totalWorkouts === 0;
  const StatsCards = [
    {
      title: "Total\nworkouts",
      value: statsData.totalWorkouts ?? '-',
      icon: dumbbell,
      style: styles.dumbbellIcon
    },
    {
      title: "Maximum\nstreak",
      value: formatStreak(statsData.maximumStreak),
      icon: flame,
      style: styles.flameIcon
    },
    {
      title: "Average\nsets per\nworkout",
      value: formatAverageSets(statsData.averageSets),
      icon: plates_stack,
      style: styles.platesStackIcon
    },
    {
      title: "Average\nWeekly\nSessions",
      value: formatWeeklySessions(statsData.averageWeeklySessions),
      icon: calendar_marked,
      style: styles.calendarIcon
    },
    {
      title: "Favourite\nExercise",
      value: statsData.favouriteExercise ?? '-',
      icon: dumbbell_with_heart,
      style: styles.dumbbellWithHeartIcon
    },
    {
      title: "Busiest\nDay",
      value: statsData.busiestDay ?? '-',
      icon: bar_graph,
      style: styles.barGraphIcon
    },
  ]

  return (
    <View style={styles.bg}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.backIcon}
            source={white_left_arrow}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Statistics</Text>
      </View>
      <TimeRangeSelector
        selectedTimeRange={selectedTimeRange}
        onSelectTimeRange={setSelectedTimeRange}
      />
      {!isEmptyStats ? (
        <>
          <View style={{
            marginLeft: normalizeWidth(16),
          }}>
            <Text style={{
              color: 'rgba(255,255,255,0.9)',
              fontWeight: '600',
              fontSize: normalize(16),
              marginBottom: normalizeHeight(8),
            }}>Your Stats</Text>
          </View>
          <StatsGrid data ={StatsCards}/>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: normalizeWidth(32),
          }}
        >
          <Text style={{
            color: 'rgba(255,255,255,0.95)',
            fontSize: normalize(28),
            fontWeight: '700',
            marginBottom: normalizeHeight(10),
            textAlign: 'center',
          }}>No workouts here</Text>
          <Text style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: normalize(15),
            fontWeight: '400',
            textAlign: 'center',
            letterSpacing: 0.3,
          }}>No workouts in the selected time range. Your stats will build as you track sessions</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#1c2238',
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
  headerTitle: {
    fontSize: normalize(18),
    letterSpacing: 1,
    fontWeight: '700',
    color: '#fefefe',
  },
  flameIcon: {
    width:normalize(45),
    aspectRatio: (506.0/656.0)
  },
  dumbbellIcon: {
    width:normalize(45),
    aspectRatio: (895.0/392.0)
  },
  calendarIcon: {
    width:normalize(45),
    aspectRatio: (648.0/652.0)
  },
  platesStackIcon: {
    width:normalize(45),
    aspectRatio: (624.0/595.0)
  },
  dumbbellWithHeartIcon: {
    width:normalize(45),
    aspectRatio: (644.0/508.0)
  },
  barGraphIcon: {
    width:normalize(45),
    aspectRatio: (735.0/628.0)
  },
});