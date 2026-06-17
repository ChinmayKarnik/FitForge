//@ts-nocheck
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ToastAndroid, Platform, ScrollView, Dimensions } from 'react-native';

const CARD_CAPTURE_WIDTH = Dimensions.get('window').width - 32;
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity, Image, Alert } from 'react-native';
import white_left_arrow from '../images/white-left-arrow.png';
import white_right_arrow from '../images/white-right-arrow.png';
import flame from '../images/flame.png';
import calendar2 from '../images/calendar-2.png';
import clock4 from '../images/clock-4.png';
import dumbbell from '../images/orange-dumbbell.png';
import shareIcon from '../images/share.png';
import fitforgeIcon from '../images/fitforge-icon.png';
import profile_photo_default from '../images/profile-photo-default.png';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import { doesDayHaveWorkout, getAverageWorkoutDurationCurrentWeekMins, getCurrentWeekWorkoutCount, getMaxStreakForMonth, getWorkoutCountForMonth, getAverageWorkoutDurationForMonth } from '../utils/workoutUtils';
import { shareViewAsImage } from '../utils/shareUtils';
import { databaseController } from '../data/controllers';
import ProfileImageCircular from '../components/ProfileImageCircular';

const DEV_SHARE_PREVIEW = false;

type RootStackParamList = {
  DayDetails: { date: Date };
};

// ─── Extracted calendar grid component ───────────────────────────────────────

type MonthCalendarGridProps = {
  selectedDate: Date;
  onPressCell?: (dateNumber: number | null, hasWorkout: boolean) => void;
};

const MonthCalendarGrid = ({ selectedDate, onPressCell }: MonthCalendarGridProps) => {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = firstDay + daysInMonth;
  const numberOfRows = Math.ceil(totalCells / 7);

  const getDateNumberFromRowCol = (rowIndex: number, colIndex: number) => {
    const cellIndex = rowIndex * 7 + colIndex;
    const dateNumber = cellIndex - firstDay + 1;
    if (dateNumber < 1 || dateNumber > daysInMonth) return null;
    return dateNumber;
  };

  const getIfDateHasWorkout = (dateNumber: number | null) => {
    if (!dateNumber) return false;
    return doesDayHaveWorkout(new Date(year, month, dateNumber));
  };

  return (
    <View>
      {/* Day headers */}
      <View style={{
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderBottomWidth: normalize(1),
        borderBottomColor: '#353c58',
        paddingVertical: normalizeHeight(8),
        borderRightWidth: normalize(2),
        borderLeftWidth: normalize(2),
        borderLeftColor: '#2e3754',
        borderRightColor: '#2e3754',
        borderTopWidth: normalize(1),
        borderTopColor: '#2e3754',
      }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <View key={day} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#e7ebf5', fontWeight: '500', fontSize: normalize(13), opacity: 0.8 }}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Day cells */}
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
                const isAfterToday = dateNumber && (
                  year > today.getFullYear() ||
                  (year === today.getFullYear() && month > today.getMonth()) ||
                  (year === today.getFullYear() && month === today.getMonth() && dateNumber > today.getDate())
                );
                return (
                  <TouchableOpacity
                    key={colIndex}
                    onPress={() => onPressCell?.(dateNumber, hasWorkout)}
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
                    {(hasWorkout && !isToday) ? (
                      <View style={{
                        flex: 1,
                        alignItems: 'center',
                        margin: normalize(2),
                        borderWidth: normalize(1),
                        borderColor: '#6e414c',
                        borderRadius: normalize(4),
                        paddingTop: normalizeHeight(6),
                        backgroundColor: 'rgba(234, 48, 4, 0.3)',
                      }}>
                        <Text style={{ color: 'white', fontSize: normalize(14), fontWeight: '400' }}>{dateNumber}</Text>
                        <Image source={dumbbell} style={{ aspectRatio: (333.0 / 198.0), height: normalizeHeight(9), marginTop: normalizeHeight(3) }} />
                      </View>
                    ) : (
                      <View style={[{ flex: 1, alignItems: 'center', paddingTop: normalizeHeight(8) },
                        isToday && { backgroundColor: 'rgba(234, 48, 4)' }
                      ]}>
                        <Text style={{ color: 'white', fontSize: normalize(14), fontWeight: '400', opacity: isAfterToday ? 0.4 : 1 }}>{dateNumber}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

// ─── Main screen ──────────────────────────────────────────────────────────────

export const CalendarScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const toastLock = useRef(false);
  const shareCardRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const monthYearString = selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  const userInfo = databaseController.getUserInfo();
  const userName = userInfo?.name || 'FitForge User';
  const profilePhotoSource = userInfo?.profilePhotoPath ? { uri: userInfo.profilePhotoPath } : profile_photo_default;
  const profilePhotoCrop = userInfo?.profilePhotoCrop || { x: 0, y: 0, size: 1 };

  const numberOfWorkoutsThisWeek = getCurrentWeekWorkoutCount();
  const workoutsText = numberOfWorkoutsThisWeek === 1 ? '1 Workout' : `${numberOfWorkoutsThisWeek} Workouts`;
  const avrDurationThisWeekMins = getAverageWorkoutDurationCurrentWeekMins();

  const maxStreakThisMonth = getMaxStreakForMonth(year, month);
  const workoutCountThisMonth = getWorkoutCountForMonth(year, month);
  const avgDurationThisMonthMins = getAverageWorkoutDurationForMonth(year, month);

  const handlePrevMonth = () => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  const handleNextMonth = () => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));

  const onPressCell = (dateNumber: number | null, hasWorkout: boolean) => {
    if (!dateNumber || toastLock.current) return;
    if (!hasWorkout) {
      if (toastLock.current) return;
      toastLock.current = true;
      const message = 'No workout on this day';
      if (Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT);
        setTimeout(() => { toastLock.current = false; }, 2000);
      } else {
        Alert.alert('', message, [{ text: 'OK', onPress: () => { toastLock.current = false; } }]);
      }
      return;
    }
    const date = new Date(year, month, dateNumber);
    navigation.navigate('DayDetails', { date });
  };

  const shareCard = (
    <View
      ref={shareCardRef}
      collapsable={false}
      style={{
        backgroundColor: '#1c2238',
        borderRadius: normalize(12),
        padding: normalize(16),
      }}
    >
      {/* Profile row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: normalizeHeight(14) }}>
        <ProfileImageCircular
          imageSource={profilePhotoSource}
          width={normalize(48)}
          aspectRatio={1}
          crop={profilePhotoCrop}
        />
        <View style={{ flex: 1, marginLeft: normalizeWidth(10), justifyContent: 'center' }}>
          <Text style={{ color: '#ffffff', fontSize: normalize(14), fontWeight: '600' }}>{userName}</Text>
          {!!userInfo?.bio && (
            <Text numberOfLines={2} ellipsizeMode="tail" style={{ color: 'rgba(255,255,255,0.6)', fontSize: normalize(11), fontStyle: 'italic', marginTop: normalizeHeight(2), lineHeight: normalize(16) }}>
              {userInfo.bio}
            </Text>
          )}
        </View>
        <Image source={fitforgeIcon} style={{ width: normalize(28), height: normalize(28), borderRadius: normalize(6), marginLeft: normalizeWidth(8), alignSelf: 'flex-start' }} />
      </View>

      {/* Divider */}
      <View style={{ height: normalize(1), backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: normalizeHeight(14) }} />

      {/* Stats: same style as calendar screen stat cards, scaled down */}
      <View style={{ flexDirection: 'row', marginBottom: normalizeHeight(14) }}>
        <View style={{ flex: 1, backgroundColor: '#252c49', borderRadius: normalize(10), borderWidth: 1, borderColor: '#353c58', paddingVertical: normalizeHeight(12), alignItems: 'center', justifyContent: 'center', marginRight: normalizeWidth(4) }}>
          <Image source={flame} style={{ height: normalizeHeight(24), width: normalizeHeight(24) * (506.0 / 656.0), resizeMode: 'contain', marginBottom: normalizeHeight(6) }} />
          <Text style={{ color: 'rgba(254,254,254,0.7)', fontSize: normalize(10), fontWeight: '400', marginBottom: normalizeHeight(4), textAlign: 'center' }}>Max Streak</Text>
          <Text style={{ fontSize: normalize(14), fontWeight: '500', color: '#fefefe', textAlign: 'center' }}>{maxStreakThisMonth} {maxStreakThisMonth === 1 ? 'Day' : 'Days'}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: '#252c49', borderRadius: normalize(10), borderWidth: 1, borderColor: '#353c58', paddingVertical: normalizeHeight(12), alignItems: 'center', justifyContent: 'center', marginHorizontal: normalizeWidth(4) }}>
          <Image source={calendar2} style={{ height: normalizeHeight(24), width: normalizeHeight(24) * (337.0 / 365.0), resizeMode: 'contain', marginBottom: normalizeHeight(6) }} />
          <Text style={{ color: 'rgba(254,254,254,0.7)', fontSize: normalize(10), fontWeight: '400', marginBottom: normalizeHeight(4), textAlign: 'center' }}>This Month</Text>
          <Text style={{ fontSize: normalize(14), fontWeight: '500', color: '#fefefe', textAlign: 'center' }}>{workoutCountThisMonth} {workoutCountThisMonth === 1 ? 'Workout' : 'Workouts'}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: '#252c49', borderRadius: normalize(10), borderWidth: 1, borderColor: '#353c58', paddingVertical: normalizeHeight(12), alignItems: 'center', justifyContent: 'center', marginLeft: normalizeWidth(4) }}>
          <Image source={clock4} style={{ height: normalizeHeight(24), width: normalizeHeight(24) * (300.0 / 348.0), resizeMode: 'contain', marginBottom: normalizeHeight(6) }} />
          <Text style={{ color: 'rgba(254,254,254,0.7)', fontSize: normalize(10), fontWeight: '400', marginBottom: normalizeHeight(4), textAlign: 'center' }}>Avg Duration</Text>
          <Text style={{ fontSize: normalize(14), fontWeight: '500', color: '#fefefe', textAlign: 'center' }}>{avgDurationThisMonthMins} Min</Text>
        </View>
      </View>

      {/* Calendar grid — static, no nav */}
      <View style={{ backgroundColor: '#1c2238' }}>
        <View style={{
          backgroundColor: '#282d4b',
          height: normalizeHeight(40),
          borderTopWidth: normalize(1),
          borderTopColor: '#3d4868',
          borderLeftWidth: normalize(1),
          borderRightWidth: normalize(1),
          borderLeftColor: '#3d4868',
          borderRightColor: '#3d4868',
          borderTopLeftRadius: normalize(8),
          borderTopRightRadius: normalize(8),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={{ color: '#e7ebf5', fontWeight: '500', fontSize: normalize(14) }}>{monthYearString}</Text>
        </View>
        <MonthCalendarGrid selectedDate={selectedDate} />
      </View>
    </View>
  );

  if (DEV_SHARE_PREVIEW) {
    return (
      <View style={[styles.bg, { padding: normalize(16), justifyContent: 'center' }]}>
        {shareCard}
        <TouchableOpacity
          onPress={() => shareViewAsImage(shareCardRef, `Check out my ${monthYearString} workout consistency! 💪\nTracked on https://fitforge.chinmaykarnik.com`)}
          activeOpacity={0.8}
          style={{ marginTop: normalizeHeight(20), backgroundColor: '#3a4fa0', borderRadius: normalize(10), paddingVertical: normalizeHeight(14), alignItems: 'center', borderWidth: 1, borderColor: '#5a72c4' }}
        >
          <Text style={{ color: '#eef0fb', fontSize: normalize(15), fontWeight: '600' }}>Share</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.bg}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          hitSlop={{ top: normalizeHeight(20), bottom: normalizeHeight(20), left: normalizeWidth(20), right: normalizeWidth(20) }}
          onPress={() => navigation.goBack()}
        >
          <Image style={styles.backIcon} source={white_left_arrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendar</Text>
        <TouchableOpacity
          style={styles.shareButton}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => shareViewAsImage(shareCardRef, `Check out my ${monthYearString} workout consistency! 💪\nTracked on https://fitforge.chinmaykarnik.com`)}
        >
          <Image source={shareIcon} style={{ width: normalize(22), height: normalize(22) * (344.0 / 350.0), resizeMode: 'contain', tintColor: 'rgba(255,255,255,0.75)' }} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: normalizeHeight(40) }}>
        <View style={styles.container}>
          {/* Stat cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Image source={flame} style={styles.flameIcon} />
              <Text style={styles.statValue} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.85}>{maxStreakThisMonth} {maxStreakThisMonth === 1 ? 'Day' : 'Days'}</Text>
              <Text style={styles.statLabel}>Max Streak</Text>
            </View>
            <View style={styles.statCard}>
              <Image source={calendar2} style={styles.calendarIcon} />
              <Text style={styles.statValue} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.85}>{workoutsText}</Text>
              <Text style={styles.statLabel}>This Week</Text>
            </View>
            <View style={styles.statCard}>
              <Image source={clock4} style={styles.clockIcon} />
              <Text style={styles.statValue} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.85}>{avrDurationThisWeekMins} Min</Text>
              <Text style={styles.statLabel}>Avg Duration</Text>
            </View>
          </View>

          {/* Interactive calendar */}
          <View style={{ backgroundColor: '#1c2238' }}>
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
              <TouchableOpacity onPress={handlePrevMonth} hitSlop={{ top: normalizeHeight(16), bottom: normalizeHeight(16), left: normalizeWidth(16), right: normalizeWidth(16) }}>
                <Image source={white_left_arrow} style={styles.inlineLeftArrow} />
              </TouchableOpacity>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ color: '#e7ebf5', fontWeight: '500', fontSize: normalize(16) }}>{monthYearString}</Text>
              </View>
              <TouchableOpacity onPress={handleNextMonth} hitSlop={{ top: normalizeHeight(16), bottom: normalizeHeight(16), left: normalizeWidth(16), right: normalizeWidth(16) }}>
                <Image source={white_right_arrow} style={styles.inlineRightArrow} />
              </TouchableOpacity>
            </View>
            <MonthCalendarGrid selectedDate={selectedDate} onPressCell={onPressCell} />
          </View>

          {/* Share card off-screen for capture */}
          <View style={{ position: 'absolute', left: -9999, width: CARD_CAPTURE_WIDTH }}>
            {shareCard}
          </View>
        </View>
      </ScrollView>
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
  headerTitle: {
    fontSize: normalize(18),
    letterSpacing: 1,
    fontWeight: '700',
    color: '#fefefe',
  },
  backButton: {
    position: 'absolute',
    top: normalizeHeight(46),
    left: normalizeWidth(16),
  },
  shareButton: {
    position: 'absolute',
    top: normalizeHeight(46),
    right: normalizeWidth(16),
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
    gap: normalizeWidth(8),
    marginBottom: normalizeHeight(18),
  },
  statCard: {
    flex: 1,
    backgroundColor: '#252c49',
    borderRadius: normalizeWidth(12),
    borderWidth: 1,
    borderColor: '#353c58',
    paddingVertical: normalizeHeight(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  flameIcon: {
    height: normalizeHeight(30),
    aspectRatio: (506.0) / (656.0),
    marginBottom: normalizeHeight(8),
    resizeMode: 'contain',
  },
  calendarIcon: {
    height: normalizeHeight(32),
    aspectRatio: (337.0 / 365.0),
    marginBottom: normalizeHeight(8),
    resizeMode: 'contain',
  },
  clockIcon: {
    height: normalizeHeight(34),
    aspectRatio: (300.0 / 348.0),
    marginBottom: normalizeHeight(8),
    resizeMode: 'contain',
  },
  statLabel: {
    fontSize: normalize(11),
    color: 'rgba(254, 254, 254, 0.7)',
    fontWeight: '400',
    letterSpacing: 0.3,
    marginTop: normalizeHeight(6),
    textAlign: 'center',
  },
  statValue: {
    fontSize: normalizeWidth(16),
    fontWeight: '600',
    color: '#fefefe',
    textAlign: 'center',
  },
});
