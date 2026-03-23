import React, { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Image } from 'react-native';
import white_left_arrow from '../images/white-left-arrow.png';
import white_right_arrow from '../images/white-right-arrow.png';
import flame from '../images/flame.png';
import calendar2 from '../images/calendar-2.png';
import clock2 from '../images/clock-2.png';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';



export const CalendarScreen = () => {
  const navigation = useNavigation();
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
  const numberOfRows = 5;

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };



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

        <View>
          <View style={{
            backgroundColor:'#282d4b',
            height:normalizeHeight(50),
            borderTopWidth: normalize(1),
            borderTopColor: '#3d4868',
            borderLeftColor: '#3d4868',
            borderRightColor: '#3d4868',
            borderTopLeftRadius: normalize(8),
            borderTopRightRadius: normalize(8),
            borderLeftWidth: normalize(1),
            borderRightWidth: normalize(1),
            flexDirection:'row',
            alignItems: 'center',
            }}>
            <Image source={white_left_arrow} style={styles.inlineLeftArrow} />
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text
                style={{
                  color: '#e7ebf5',
                  fontWeight: '500',
                  fontSize: normalize(16),
                }}
              >October 2023</Text>
            </View>
            <Image source={white_right_arrow} style={styles.inlineRightArrow} />
          </View>
          
          <View style={{
            flexDirection: 'row',
            backgroundColor: 'transparent',
            borderBottomWidth: normalize(1),
            borderBottomColor: '#353c58',
            paddingVertical: normalizeHeight(8),
            borderRightWidth: normalize(1),
            borderLeftWidth:normalize(1),
            borderLeftColor: '#1f2639',
            borderRightColor: '#1f2639',
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
            {Array.from({ length: numberOfRows }).map((_,rowIndex)=>{
              const isFirstRow = rowIndex === 0;
              const isLastRow = rowIndex === numberOfRows - 1;
              
              return <></>
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