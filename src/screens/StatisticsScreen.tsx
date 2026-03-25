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

export const StatisticsScreen = () => {
  const navigation = useNavigation();

  const [selectedTimeRange, setSelectedTimeRange] = useState(TimeRange.All);
  const StatsCards = [
    {
      title: "Total\nworkouts",
      value: 10,
      icon: dumbbell,
      style:styles.dumbbellIcon
    },
    {
      title: "Maximum\nStreak",
      value: 8,
      icon: flame,
      style:styles.flameIcon
    },
    {
      title: "Average\nsets per\nworkout",
      value: 8.6,
      icon: plates_stack,
      style:styles.platesStackIcon
    },
    {
      title: "Average\nweekly\nsessions",
      value: 4.2,
      icon: calendar_marked,
      style:styles.calendarIcon
    },
     {
      title: "Favourite\nExercise",
      value: "Push-ups",
      icon: dumbbell_with_heart,
      style:styles.dumbbellWithHeartIcon
    },
    {
      title: "Busiest\nDay",
      value: "Wednesday",
      icon: bar_graph,
      style:styles.barGraphIcon
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