import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import white_left_arrow from '../images/white-left-arrow.png';
import { TimeRange } from '../enums/enums';
import { TimeRangeSelector } from '../components/TimeRangeSelector';
import StatsGrid from '../components/StatsGrid';

export const StatisticsScreen = () => {
  const navigation = useNavigation();

  const [selectedTimeRange, setSelectedTimeRange] = useState(TimeRange.All);
  const StatsCards = [
    {
      type: "Total Workouts",
      value: 10
    },
    {
      type: "Maximum Streak",
      value: 8
    },
    {
      type: "Average Sets",
      value: 8.6
    },
    {
      type: "Average Weekly Sessions",
      value: 4.2
    },
     {
      type: "Favourite Exercise",
      value: "Push-ups"
    },
    {
      type: "Busiest Day",
      value: "Wednesday"
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
});