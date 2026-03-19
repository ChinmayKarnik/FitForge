import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Image } from 'react-native';
import white_left_arrow from '../images/white-left-arrow.png';
import flame from '../images/flame.png';
import calendar2 from '../images/calendar-2.png';
import clock2 from '../images/clock-2.png';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';



export const CalendarScreen = () => {
  const navigation = useNavigation();

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

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          {/* Current Streak Card */}
          <View style={styles.statCard}>
            <Image source={flame} style={styles.flameIcon} />
            <Text style={styles.statLabel}>Current Streak</Text>
            <Text style={styles.statValue}>15 Days</Text>
          </View>

          {/* This Week Card */}
          <View style={styles.statCard}>
            <Image source={calendar2} style={styles.calendarIcon} />
            <Text style={styles.statLabel}>This Week</Text>
            <Text style={styles.statValue}>4 Workouts</Text>
          </View>

          {/* Average Duration Card */}
          <View style={styles.statCard}>
            <Image source={clock2} style={styles.clockIcon} />
            <Text style={styles.statLabel}>Avg Duration</Text>
            <Text style={styles.statValue}>55 Min</Text>
          </View>
        </View>
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
    aspectRatio: (506.0)/(656.0),
    marginBottom: normalizeHeight(12),
    resizeMode: 'contain',
  },
  calendarIcon: {
    height: normalizeHeight(40),
    aspectRatio: (337.0/365.0),
    marginBottom: normalizeHeight(12),
    resizeMode: 'contain',
  },
  clockIcon: {
    height: normalizeHeight(40),
    aspectRatio: (304.0)/(351.0),
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
});