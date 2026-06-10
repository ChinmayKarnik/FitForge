import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import { normalizeHeight, normalizeWidth, normalize } from '../utils/normalize';
import white_left_arrow from '../images/white-left-arrow.png';
import clock from '../images/clock-thick-white.png';
import stopwatch from '../images/stopwatch-white.png';
import calendarIcon from '../images/calendar.png';
import notes2Icon from '../images/notes-2.png';
import { databaseController } from '../data/controllers';
import CurrentWorkoutList from '../components/CurrentWorkoutList';

const CARD_BG = '#272d46';
const CARD_BORDER = '#3d4563';
const CARD_RADIUS = normalize(12);
const PRIMARY = '#fefefe';

const cardStyle = {
  backgroundColor: CARD_BG,
  borderRadius: CARD_RADIUS,
  borderWidth: 1,
  borderColor: CARD_BORDER,
};

export default function WorkoutDetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const workout = route.params?.workout;

  const routineId = workout?.routineId;
  const routineName = routineId ? databaseController.getRoutineById(routineId)?.name || 'Unknown Routine' : '';

  let durationText = '';
  const durationMs = workout?.duration;
  if (typeof durationMs === 'number' && !isNaN(durationMs)) {
    const totalMinutes = Math.floor(durationMs / 60000);
    if (totalMinutes < 1) {
      durationText = '1 min';
    } else if (totalMinutes < 60) {
      durationText = `${totalMinutes} min`;
    } else {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      durationText = `${hours}h`;
      if (minutes > 0) durationText += ` ${minutes}m`;
    }
  }

  let dateText = '';
  const startTimestamp = workout?.startTime;
  if (typeof startTimestamp === 'number' && !isNaN(startTimestamp)) {
    const startDate = new Date(startTimestamp);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const startMidnight = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    if (startMidnight.getTime() === today.getTime()) {
      dateText = 'Today';
    } else if (startMidnight.getTime() === yesterday.getTime()) {
      dateText = 'Yesterday';
    } else {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      dateText = `${startDate.getDate()} ${months[startDate.getMonth()]} ${startDate.getFullYear()}`;
    }
  }
  let isTodayOrYesterday = (dateText == 'Today') || (dateText=='Yesterday')

  let timeText = '';
  if (typeof startTimestamp === 'number' && !isNaN(startTimestamp)) {
    const startDate = new Date(startTimestamp);
    let hours = startDate.getHours();
    const minutes = startDate.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    if (hours === 0) hours = 12;
    timeText = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }


  const [isListAtBottom, setIsListAtBottom] = useState(false);
  const handleListScroll = (event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    setIsListAtBottom(contentOffset.y + layoutMeasurement.height >= contentSize.height - 16);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1c2238' }}>
      {/* Header */}
      <View style={{
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(68, 75, 95)',
        alignItems: 'center',
        backgroundColor: 'rgba(36, 42, 65)',
        paddingTop: normalizeHeight(40),
        paddingBottom: normalizeHeight(12),
      }}>
        <TouchableOpacity
          style={{ position: 'absolute', top: normalizeHeight(46), left: normalizeWidth(16) }}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={{
              width: normalizeWidth(9),
              height: normalizeWidth(9) * (86.0 / 51.0),
              aspectRatio: 51.0 / 86.0,
              resizeMode: 'stretch',
            }}
            source={white_left_arrow}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, letterSpacing: 1, fontWeight: '700', color: PRIMARY }}>
          Workout Details
        </Text>
      </View>

      {/* Fixed top content */}
      <View style={{ paddingHorizontal: normalizeWidth(16), paddingTop: normalizeHeight(20) }}>
        {/* Workout Title */}
        <Text style={{
          fontSize: normalize(28),
          fontWeight: '500',
          color: PRIMARY,
          letterSpacing: -0.5,
          marginBottom: normalizeHeight(16),
        }}>
          {workout?.name}
        </Text>

        {/* Meta Row Card */}
        <View style={[cardStyle, {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: normalizeHeight(10),
          paddingVertical: normalizeHeight(10),
          borderRadius: normalize(10)
        }]}>
          <View style={{ flex: isTodayOrYesterday ? 93 : 118, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={calendarIcon} style={{ width: normalizeWidth(14), aspectRatio: 410/420, resizeMode: 'contain', marginRight: normalizeWidth(8), tintColor: 'rgba(255,255,255,0.85)' }} />
            <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: normalize(11), fontWeight: '500' }}>{dateText}</Text>
          </View>
          <View style={{ width: normalizeWidth(1), height: normalizeHeight(16), backgroundColor: 'rgba(255,255,255,0.15)' }} />
          <View style={{ flex: 92, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={clock} style={{ width: normalize(14), aspectRatio: 357/346, resizeMode: 'contain', marginRight: normalizeWidth(6), tintColor: 'rgba(255,255,255,0.85)' }} />
            <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: normalize(11), fontWeight: '500' }}>{timeText}</Text>
          </View>
          <View style={{ width: 1, height: normalizeHeight(16), backgroundColor: 'rgba(255,255,255,0.15)' }} />
          <View style={{ flex: 93, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={stopwatch} style={{ width: normalize(14), aspectRatio: 1, resizeMode: 'contain', marginRight: normalizeWidth(6), tintColor: 'rgba(255,255,255,0.85)' }} />
            <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: normalize(11), fontWeight: '500' }}>{durationText}</Text>
          </View>
        </View>

        {/* Routine Card */}
        {routineId && (
          <View style={[cardStyle, {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: normalizeHeight(8),
            paddingHorizontal: normalizeWidth(14),
            marginBottom: normalizeHeight(10),
          }]}>
            <Image source={notes2Icon} style={{ width: normalize(18), height: normalize(18) * (458.0 / 399.0), aspectRatio: (399.0 / 458.0), resizeMode: 'contain', tintColor: '#a1a9ea', marginRight: normalizeWidth(16) }} />
            <View>
              <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: normalize(11), fontWeight: '400', marginBottom: 1 }}>Routine</Text>
              <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: normalize(13), fontWeight: '600' }}>{routineName}</Text>
            </View>
          </View>
        )}
      </View>

      {/* Exercises section — scrollable */}
      <View style={{ flex: 1, paddingHorizontal: normalizeWidth(16) }}>
        <Text style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: normalize(14),
          fontWeight: '600',
          letterSpacing: 0.4,
          marginTop: normalizeHeight(6),
          marginBottom: normalizeHeight(2),
        }}>
          Exercises
        </Text>
        <View style={{ position: 'relative', flex: 1 }}>
          <CurrentWorkoutList
            workout={workout}
            showSectionHeader={false}
            horizontalPadding={false}
            onScroll={handleListScroll}
          />
          {!isListAtBottom && (
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: normalizeHeight(72) }} pointerEvents="none">
              <Svg height="100%" width="100%">
                <Defs>
                  <LinearGradient id="detailsListFade" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor="#1c2238" stopOpacity="0" />
                    <Stop offset="1" stopColor="#1c2238" stopOpacity="1" />
                  </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#detailsListFade)" />
              </Svg>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
