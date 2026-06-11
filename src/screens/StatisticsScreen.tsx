//@ts-nocheck
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import white_left_arrow from '../images/white-left-arrow.png';
import { TimeRange } from '../enums/enums';
import { TimeRangeSelector } from '../components/TimeRangeSelector';
import { getStatsForTimeRange, getTimeRangeIntervalFormat } from '../utils/workoutUtils';
import sad_dumbbell from '../images/sweat-sad-dumbbell.png';
import flame from '../images/flame.png';
import flame_3 from '../images/flame-3.png';
import calendar_marked from '../images/calendar-marked.png';
import calendar from '../images/calendar.png';
import dumbbell from '../images/dumbbell-horizontal.png';
import dumbbell_2 from '../images/dumbbell-2.png';
import plates_stack from '../images/plates-stack.png';
import plates_stack_2 from '../images/plates-stack-2.png';
import trend_arrow from '../images/trend-arrow.png';
import trend_arrow_2 from '../images/trend-arrow-2.png';
import dumbbell_with_heart from '../images/dumbbell-with-heart.png';
import medal_white from '../images/medal-white.png';
import bar_graph from '../images/bar-graph.png';

const formatDate = (timestamp: number, includeYear: boolean) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    ...(includeYear ? { year: 'numeric' } : {}),
  });
};

const getDateRangeLabel = (selectedTimeRange: TimeRange, startTime: number, endTime: number) => {
  if (selectedTimeRange === TimeRange.All) return 'All time';
  const start = formatDate(startTime, false);
  const end = formatDate(endTime, true);
  return `${start} – ${end}`;
};

const IconContainer = ({ children }) => (
  <View style={{
    width: normalize(34),
    height: normalize(34),
    borderRadius: normalize(8),
    backgroundColor: 'rgba(127,179,255,0.09)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalizeHeight(10),
  }}>
    {children}
  </View>
);

// iconW and iconH are the pixel dimensions of the source image
const SmallCard = ({ icon, iconW, iconH, iconTint, value, valueColor, label, isLeft, iconSize }) => {
  const renderedW = iconSize ?? normalize(18);
  const renderedH = renderedW * (iconH / iconW);
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#272d46',
      borderRadius: normalize(12),
      borderWidth: normalize(1),
      borderColor: '#3d4563',
      padding: normalize(14),
      marginLeft: isLeft ? 0 : normalizeWidth(8),
      justifyContent: 'flex-start',
    }}>
      <IconContainer>
        <Image
          source={icon}
          style={{ width: renderedW, height: renderedH, tintColor: iconTint }}
        />
      </IconContainer>
      <Text style={{
        color: valueColor,
        fontSize: normalize(22),
        fontWeight: '700',
        marginBottom: normalizeHeight(2),
      }}>{value}</Text>
      <Text style={{
        color: '#9aadd0',
        fontSize: normalize(13),
        fontWeight: '500',
      }}>{label}</Text>
    </View>
  );
};

export const StatisticsScreen = () => {
  const navigation = useNavigation();
  const [selectedTimeRange, setSelectedTimeRange] = useState(TimeRange.All);
  const timeRangeIntervalFormat = getTimeRangeIntervalFormat(selectedTimeRange);
  const statsData = getStatsForTimeRange(timeRangeIntervalFormat.start, timeRangeIntervalFormat.end);
  const isEmptyStats = statsData.totalWorkouts === 0;

  const dateRangeLabel = getDateRangeLabel(selectedTimeRange, timeRangeIntervalFormat.start, timeRangeIntervalFormat.end);

  const streakValue = statsData.maximumStreak !== null ? String(statsData.maximumStreak) : '-';
  const streakUnit = statsData.maximumStreak === 1 ? 'day in a row' : 'days in a row';
  const avgSets = statsData.averageSets !== null ? String(statsData.averageSets) : '-';
  const avgSessions = (statsData.averageWeeklySessions !== null && statsData.averageWeeklySessions !== 0)
    ? String(statsData.averageWeeklySessions)
    : '-';

  // dumbbell-2 in icon container: source is 410x241px, rendered width normalize(20)
  const dumbbellW = normalize(20);
  const dumbbellH = dumbbellW * (241 / 410);
  // flame-3 in icon container: source is 462x620px, rendered width normalize(16)
  const flameW = normalize(16);
  const flameH = flameW * (620 / 462);
  // calendar in date range row: source is 410x420px, rendered width normalize(14)
  const calW = normalize(14);
  const calH = calW * (420 / 410);

  return (
    <View style={{ flex: 1, backgroundColor: '#1c2238' }}>
      {/* Header */}
      <View style={{
        width: '100%',
        borderBottomWidth: 1,
        borderColor: 'rgba(68,75,95,1)',
        alignItems: 'center',
        backgroundColor: 'rgba(36,42,65,1)',
        paddingTop: normalizeHeight(40),
        paddingBottom: normalizeHeight(12),
        position: 'relative',
      }}>
        <TouchableOpacity
          style={{ position: 'absolute', top: normalizeHeight(46), left: normalizeWidth(16) }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={white_left_arrow}
            style={{
              width: normalizeWidth(9),
              height: normalizeWidth(9) * (86.0 / 51.0),
              resizeMode: 'stretch',
            }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: normalize(18), letterSpacing: 1, fontWeight: '700', color: '#fefefe' }}>
          Statistics
        </Text>
      </View>

      {/* Time Range Selector */}
      <TimeRangeSelector
        selectedTimeRange={selectedTimeRange}
        onSelectTimeRange={setSelectedTimeRange}
      />

      {/* Date Range Label */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: normalizeHeight(16),
        marginTop: normalizeHeight(8),
      }}>
        <Image
          source={calendar}
          style={{ width: calW, height: calH, 
            tintColor: 'rgba(255,255,255,0.8)',
             marginRight: normalizeWidth(6) }}
        />
        <Text style={{
          color: 'rgba(255,255,255,1)',
          fontSize: normalize(14),
          fontWeight: '600',
          letterSpacing: 0.2,
        }}>{dateRangeLabel}</Text>
      </View>

      {!isEmptyStats ? (
        <View style={{ paddingHorizontal: normalizeWidth(16), paddingTop: normalizeHeight(4), paddingBottom: normalizeHeight(10) }}>
          {/* Featured top card: Total Workouts + Max Streak */}
          <View style={{
            height: normalizeHeight(185),
            flexDirection: 'row',
            backgroundColor: '#272d46',
            borderRadius: normalize(12),
            borderWidth: normalize(1),
            borderColor: '#3d4563',
            marginBottom: normalizeHeight(12),
            padding: normalize(16),
          }}>
            {/* Total Workouts */}
            <View style={{ flex: 1, paddingRight: normalizeWidth(12) }}>
              <IconContainer>
                <Image source={dumbbell_2} style={{ width: dumbbellW, height: dumbbellH, tintColor: '#ffffff' }} />
              </IconContainer>
              <Text style={{
                color: '#9aadd0',
                fontSize: normalize(12),
                fontWeight: '600',
                letterSpacing: 1.2,
                marginBottom: normalizeHeight(6),
              }}>TOTAL WORKOUTS</Text>
              <Text style={{
                color: '#ffffff',
                fontSize: normalize(52),
                fontWeight: '700',
                letterSpacing: -1,
                lineHeight: normalize(56),
              }}>{statsData.totalWorkouts ?? '-'}</Text>
            </View>

            {/* Divider */}
            <View style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.08)', marginHorizontal: normalizeWidth(4) }} />

            {/* Max Streak */}
            <View style={{ flex: 1, paddingLeft: normalizeWidth(12) }}>
              <LinearGradient
                colors={['#4a2510', '#2a1508']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: normalize(34),
                  height: normalize(34),
                  borderRadius: normalize(8),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: normalizeHeight(10),
                }}
              >
                <Image source={flame_3} style={{ width: flameW, height: flameH, tintColor: '#fb7028' }} />
              </LinearGradient>
              <Text style={{
                color: '#9aadd0',
                fontSize: normalize(12),
                fontWeight: '600',
                letterSpacing: 1.2,
                marginBottom: normalizeHeight(6),
              }}>MAX STREAK</Text>
              <Text style={{
                color: '#fb7028',
                fontSize: normalize(52),
                fontWeight: '700',
                letterSpacing: -1,
                lineHeight: normalize(56),
              }}>{streakValue}</Text>
              <Text style={{
                color: '#9aadd0',
                fontSize: normalize(13),
                fontWeight: '400',
                marginTop: normalizeHeight(2),
              }}>{streakUnit}</Text>
            </View>
          </View>

          {/* Row 1: Favourite Exercise + Busiest Day */}
          <View style={{ height: normalizeHeight(155), flexDirection: 'row', marginBottom: normalizeHeight(12) }}>
            <SmallCard
              icon={medal_white}
              iconW={437} iconH={562}
              iconTint="#ffffff"
              iconSize={normalize(14)}
              value={statsData.favouriteExercise ?? '-'}
              valueColor="#ffffff"
              label="Favourite Exercise"
              isLeft={true}
            />
            <SmallCard
              icon={calendar}
              iconW={410} iconH={420}
              iconTint="#ffffff"
              value={statsData.busiestDay ?? '-'}
              valueColor="#7fb3ff"
              label="Busiest Day"
              isLeft={false}
            />
          </View>

          {/* Row 2: Avg Sessions + Avg Sets */}
          <View style={{ height: normalizeHeight(155), flexDirection: 'row' }}>
            <SmallCard
              icon={trend_arrow_2}
              iconW={512} iconH={325}
              iconTint="#ffffff"
              value={avgSessions}
              valueColor="#7fb3ff"
              label="Avg Sessions / Week"
              isLeft={true}
            />
            <SmallCard
              icon={plates_stack_2}
              iconW={469} iconH={425}
              iconTint="#ffffff"
              value={avgSets}
              valueColor="#7fb3ff"
              label="Avg Sets / Workout"
              isLeft={false}
            />
          </View>
        </View>
      ) : (
        <View style={{
          flex: 1,
          alignItems: 'center',
          paddingHorizontal: normalizeWidth(32),
          marginTop: normalizeHeight(120),
        }}>
          <Image
            source={sad_dumbbell}
            style={{
              width: normalizeWidth(80),
              height: normalizeWidth(80) * (818.0 / 604.0),
              marginBottom: normalizeHeight(20),
            }}
          />
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
