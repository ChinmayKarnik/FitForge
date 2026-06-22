//@ts-nocheck
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import white_left_arrow from '../images/white-left-arrow.png';
import shareIcon from '../images/share.png';
import fitforgeIcon from '../images/fitforge-icon.png';
import profile_photo_default from '../images/profile-photo-default.png';
import { databaseController } from '../data/controllers';
import { shareViewAsImage } from '../utils/shareUtils';
import { StatsShareCard } from '../components/StatsShareCard';

const CARD_CAPTURE_WIDTH = Dimensions.get('window').width - 32;
import { TimeRange } from '../enums/enums';
import { TimeRangeSelector } from '../components/TimeRangeSelector';
import { getStatsForTimeRange, getTimeRangeIntervalFormat, getStatsStartDate } from '../utils/workoutUtils';
import sad_dumbbell from '../images/sweat-sad-dumbbell.png';
import flame from '../images/flame.png';
import flame_3 from '../images/flame-3.png';
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
  if (selectedTimeRange === TimeRange.All) {
    const firstDate = getStatsStartDate();
    if (firstDate === null) return 'All Time';
    return `Since ${formatDate(firstDate, true)}`;
  }
  const firstDate = getStatsStartDate();
  const effectiveStart = firstDate !== null && firstDate > startTime ? firstDate : startTime;
  const startYear = new Date(effectiveStart).getFullYear();
  const endYear = new Date(endTime).getFullYear();
  const crossesYears = startYear !== endYear;
  const start = formatDate(effectiveStart, crossesYears);
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
  }}>
    {children}
  </View>
);

// iconW and iconH are the pixel dimensions of the source image
const SmallCard = ({ icon, iconW, iconH, iconTint, value, valueColor, label, isLeft, iconSize, valueFontSize, valueLines, groupLabelValue, valueFirst, labelFontSize, labelColor }) => {
  const renderedW = iconSize ?? normalize(18);
  const renderedH = renderedW * (iconH / iconW);
  const labelEl = (
    <Text style={{
      color: labelColor ?? 'rgba(255,255,255,0.68)',
      fontSize: labelFontSize ?? normalize(12),
      fontWeight: '600',
      letterSpacing: 0.6,
    }}>{label}</Text>
  );
  const valueEl = (
    <Text
      numberOfLines={valueLines ?? undefined}
      adjustsFontSizeToFit={valueLines === 1}
      minimumFontScale={0.7}
      ellipsizeMode="tail"
      style={{
        color: valueColor,
        fontSize: valueFontSize ?? normalize(24),
        fontWeight: '800',
      }}>{value}</Text>
  );
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#272d46',
      borderRadius: normalize(12),
      borderWidth: normalize(1),
      borderColor: '#3d4563',
      padding: normalize(16),
      marginLeft: isLeft ? 0 : normalizeWidth(8),
      justifyContent: 'space-between',
    }}>
      <IconContainer>
        <Image
          source={icon}
          style={{ width: renderedW, height: renderedH, tintColor: iconTint }}
        />
      </IconContainer>
      {groupLabelValue ? (
        <View>
          {valueFirst ? valueEl : labelEl}
          {valueFirst ? labelEl : valueEl}
        </View>
      ) : (
        <>
          {labelEl}
          {valueEl}
        </>
      )}
    </View>
  );
};

export const StatisticsScreen = () => {
  const navigation = useNavigation();
  const shareCardRef = useRef(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState(TimeRange.All);

  const userInfo = databaseController.getUserInfo();
  const userName = userInfo?.name || 'FitForge User';
  const profilePhotoSource = userInfo?.profilePhotoPath ? { uri: userInfo.profilePhotoPath } : profile_photo_default;
  const profilePhotoCrop = userInfo?.profilePhotoCrop || { x: 0, y: 0, size: 1 };
  const timeRangeIntervalFormat = getTimeRangeIntervalFormat(selectedTimeRange);
  const statsData = getStatsForTimeRange(timeRangeIntervalFormat.start,timeRangeIntervalFormat.end );

  const dateRangeLabel = getDateRangeLabel(selectedTimeRange, timeRangeIntervalFormat.start, timeRangeIntervalFormat.end);

  const streakValue = statsData.maximumStreak !== null ? String(statsData.maximumStreak) : '0';
  const streakUnit = statsData.maximumStreak === 1 ? 'day in a row' : 'days in a row';
  const avgSets = statsData.averageSets !== null ? String(statsData.averageSets) : '0';
  const avgSessions = (statsData.averageWeeklySessions !== null && statsData.averageWeeklySessions !== 0)
    ? String(statsData.averageWeeklySessions)
    : '0';

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
        {!!statsData.totalWorkouts && (
          <TouchableOpacity
            style={{ position: 'absolute', top: normalizeHeight(46), right: normalizeWidth(16) }}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            onPress={() => shareViewAsImage(shareCardRef, `Check out my fitness stats on FitForge! 💪\nhttps://fitforge.chinmaykarnik.com`)}
          >
            <Image source={shareIcon} style={{ width: normalize(22), height: normalize(22) * (344.0 / 350.0), resizeMode: 'contain', tintColor: 'rgba(255,255,255,0.75)' }} />
          </TouchableOpacity>
        )}
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
        marginTop: normalizeHeight(14),
      }}>
        <Image
          source={calendar}
          style={{ width: calW, height: calH, 
            tintColor: 'rgba(255,255,255,0.65)',
             marginRight: normalizeWidth(6) }}
        />
        <Text style={{
          color: 'rgba(255,255,255,1)',
          fontSize: normalize(14),
          fontWeight: '600',
          letterSpacing: 0.2,
        }}>{dateRangeLabel}</Text>
      </View>

      <View style={{ paddingHorizontal: normalizeWidth(16), paddingTop: normalizeHeight(4), paddingBottom: normalizeHeight(16) }}>
          {/* Featured top card: Total Workouts + Max Streak */}
          <View style={{
            height: normalizeHeight(168),
            flexDirection: 'row',
            backgroundColor: '#272d46',
            borderRadius: normalize(12),
            borderWidth: normalize(1),
            borderColor: '#3d4563',
            marginBottom: normalizeHeight(12),
            padding: normalize(16),
          }}>
            {/* Total Workouts */}
            <View style={{ flex: 1, paddingRight: normalizeWidth(12), justifyContent: 'space-between' }}>
              <IconContainer>
                <Image source={dumbbell_2} style={{ width: dumbbellW, height: dumbbellH, tintColor: '#ffffff' }} />
              </IconContainer>
              <View style={{ marginBottom: normalizeHeight(22) }}>
                <Text style={{
                  color: '#ffffff',
                  fontSize: normalize(44),
                  fontWeight: '800',
                  letterSpacing: -1,
                  lineHeight: normalize(48),
                  textAlign: 'center',
                }}>{statsData.totalWorkouts ?? '0'}</Text>
                <Text style={{
                  color: 'rgba(255,255,255,0.68)',
                  fontSize: normalize(11),
                  fontWeight: '600',
                  letterSpacing: 1.8,
                  marginTop: normalizeHeight(4),
                  textAlign: 'center',
                }}>TOTAL WORKOUTS</Text>
              </View>
            </View>

            {/* Divider */}
            <View style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.22)', marginHorizontal: normalizeWidth(4) }} />

            {/* Max Streak */}
            <View style={{ flex: 1, paddingLeft: normalizeWidth(12), justifyContent: 'space-between' }}>
              <View style={{
                  width: normalize(34),
                  height: normalize(34),
                  borderRadius: normalize(8),
                  backgroundColor: 'rgba(251,112,40,0.12)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image source={flame_3} style={{ width: flameW, height: flameH, tintColor: '#fb7028' }} />
              </View>
              <View style={{ marginBottom: normalizeHeight(22) }}>
                <Text style={{
                  color: '#fb7028',
                  fontSize: normalize(44),
                  fontWeight: '800',
                  letterSpacing: -1,
                  lineHeight: normalize(48),
                  textAlign: 'center',
                }}>{streakValue}</Text>
                <Text style={{
                  color: 'rgba(255,255,255,0.68)',
                  fontSize: normalize(11),
                  fontWeight: '600',
                  letterSpacing: 1.8,
                  marginTop: normalizeHeight(4),
                  textAlign: 'center',
                }}>MAX STREAK</Text>
              </View>
            </View>
          </View>

          {/* Row 1: Favourite Exercise + Busiest Day */}
          <View style={{ height: normalizeHeight(156), flexDirection: 'row', marginBottom: normalizeHeight(12) }}>
            <SmallCard
              icon={medal_white}
              iconW={437} iconH={562}
              iconTint="#ffffff"
              iconSize={normalize(14)}
              value={statsData.favouriteExercise ?? '-'}
              valueColor="#ffffff"
              valueFontSize={normalize(20)}
              valueLines={2}
              label="Favourite Exercise"
              isLeft={true}
              groupLabelValue={true}
              valueFirst={true}
            />
            <SmallCard
              icon={calendar}
              iconW={410} iconH={420}
              iconTint="#ffffff"
              value={statsData.busiestDay ?? '-'}
              valueColor="#7fb3ff"
              valueFontSize={normalize(26)}
              valueLines={1}
              label="Busiest Day"
              isLeft={false}
              groupLabelValue={true}
            />
          </View>

          {/* Row 2: Avg Sessions + Avg Sets */}
          <View style={{ height: normalizeHeight(156), flexDirection: 'row' }}>
            <SmallCard
              icon={trend_arrow_2}
              iconW={512} iconH={325}
              iconTint="#ffffff"
              value={avgSessions}
              valueColor="#7fb3ff"
              valueFontSize={normalize(31)}
              labelFontSize={normalize(11)}
              labelColor="rgba(255,255,255,0.56)"
              label="Avg Sessions / Week"
              isLeft={true}
              groupLabelValue={true}
            />
            <SmallCard
              icon={plates_stack_2}
              iconW={469} iconH={425}
              iconTint="#ffffff"
              value={avgSets}
              valueColor="#7fb3ff"
              valueFontSize={normalize(31)}
              labelFontSize={normalize(11)}
              labelColor="rgba(255,255,255,0.56)"
              label="Avg Sets / Workout"
              isLeft={false}
              groupLabelValue={true}
            />
          </View>
        </View>


      {/* Share card — off-screen for capture */}
      <View style={{ position: 'absolute', left: -9999, width: CARD_CAPTURE_WIDTH }}>
        <StatsShareCard
          ref={shareCardRef}
          statsData={statsData}
          dateRangeLabel={dateRangeLabel}
          selectedTimeRange={selectedTimeRange}
          streakValue={streakValue}
          avgSets={avgSets}
          avgSessions={avgSessions}
          userName={userName}
          userInfo={userInfo}
          profilePhotoSource={profilePhotoSource}
          profilePhotoCrop={profilePhotoCrop}
        />
      </View>
    </View>
  );
};
