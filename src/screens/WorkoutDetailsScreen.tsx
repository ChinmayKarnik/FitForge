import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { shareViewAsImage } from '../utils/shareUtils';

const CARD_CAPTURE_WIDTH = Dimensions.get('window').width - 32;
import profile_photo_default from '../images/profile-photo-default.png';
import fitforgeIcon from '../images/fitforge-icon.png';

const DEV_SHARE_PREVIEW = false;
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import { normalizeHeight, normalizeWidth, normalize } from '../utils/normalize';
import white_left_arrow from '../images/white-left-arrow.png';
import shareIcon from '../images/share.png';
import clock from '../images/clock-thick-white.png';
import stopwatch from '../images/stopwatch-white.png';
import calendarIcon from '../images/calendar.png';
import notes2Icon from '../images/notes-2.png';
import infoIcon from '../images/info-icon.png';
import { databaseController } from '../data/controllers';
import { getExercisesListFromWorkout } from '../utils/workoutUtils';
import CurrentWorkoutList from '../components/CurrentWorkoutList';
import RoutineDetailsModal from '../components/RoutineDetailsModal';
import ProfileImageCircular from '../components/ProfileImageCircular';
import { thinSpace } from '../components/dateTimeUtils';

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
  const routine = routineId ? databaseController.getRoutineById(routineId) : null;
  const routineName = routine?.name || '';
  const [detailsRoutine, setDetailsRoutine] = useState<any>(null);
  const shareCardRef = useRef(null);

  const userInfo = databaseController.getUserInfo();
  const userName = userInfo?.name || 'FitForge User';
  const profilePhotoSource = userInfo?.profilePhotoPath
    ? { uri: userInfo.profilePhotoPath }
    : profile_photo_default;
  const profilePhotoCrop = userInfo?.profilePhotoCrop || { x: 0, y: 0, size: 1 };

  const exerciseRows = getExercisesListFromWorkout(workout);
  const totalSets = exerciseRows.reduce((sum: number, e: any) => sum + e.sets, 0);
  const MAX_EXERCISES_SHOWN = 5;
  const visibleExercises = exerciseRows.slice(0, MAX_EXERCISES_SHOWN);
  const hiddenCount = exerciseRows.length - visibleExercises.length;

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
        <TouchableOpacity
          style={{ position: 'absolute', top: normalizeHeight(46), right: normalizeWidth(16) }}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => shareViewAsImage(shareCardRef, `Check out my workout: ${workout?.name} 💪\nLog yours at https://fitforge.chinmaykarnik.com`)}
        >
          <Image source={shareIcon} style={{ width: normalize(22), height: normalize(22) * (344.0/350.0), resizeMode: 'contain',
             tintColor: 'rgba(255,255,255,0.75)' }} />
        </TouchableOpacity>
      </View>

      {/* Fixed top content */}
      <View style={{ paddingHorizontal: normalizeWidth(16), paddingTop: normalizeHeight(18) }}>
        {/* Workout Title */}
        <Text style={{
          fontSize: normalize(27),
          fontWeight: '700',
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
          marginBottom: normalizeHeight(12),
          paddingVertical: normalizeHeight(10),
          borderRadius: normalize(10)
        }]}>
          <View style={{ flex: isTodayOrYesterday ? 93 : 118, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={calendarIcon} style={{ width: normalizeWidth(14), aspectRatio: 410/420, resizeMode: 'contain', marginRight: normalizeWidth(8), tintColor: 'rgba(255,255,255,0.72)' }} />
            <Text style={{ color: 'rgba(255,255,255,0.72)', fontSize: normalize(11), fontWeight: '500' }}>{dateText}</Text>
          </View>
          <View style={{ width: normalizeWidth(1), height: normalizeHeight(16), backgroundColor: 'rgba(255,255,255,0.15)' }} />
          <View style={{ flex: 92, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={clock} style={{ width: normalize(14), aspectRatio: 357/346, resizeMode: 'contain', marginRight: normalizeWidth(6), tintColor: 'rgba(255,255,255,0.72)' }} />
            <Text style={{ color: 'rgba(255,255,255,0.72)', fontSize: normalize(11), fontWeight: '500' }}>{timeText}</Text>
          </View>
          <View style={{ width: 1, height: normalizeHeight(16), backgroundColor: 'rgba(255,255,255,0.15)' }} />
          <View style={{ flex: 93, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={stopwatch} style={{ width: normalize(14), aspectRatio: 1, resizeMode: 'contain', marginRight: normalizeWidth(6), tintColor: 'rgba(255,255,255,0.72)' }} />
            <Text style={{ color: 'rgba(255,255,255,0.72)', fontSize: normalize(11), fontWeight: '500' }}>{durationText}</Text>
          </View>
        </View>

        {/* Routine Card */}
        {routineId && (
          <View style={[cardStyle, {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: normalizeHeight(8),
            paddingHorizontal: normalizeWidth(14),
            marginBottom: normalizeHeight(12),
          }]}>
            <Image source={notes2Icon} style={{ width: normalize(18), height: normalize(18) * (458.0 / 399.0), aspectRatio: (399.0 / 458.0), resizeMode: 'contain', tintColor: '#a1a9ea', marginRight: normalizeWidth(16) }} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: normalize(11), fontWeight: '400', marginBottom: 1 }}>Routine</Text>
              <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: normalize(13), fontWeight: '600' }}>{routineName}</Text>
            </View>
            <TouchableOpacity
              onPress={() => setDetailsRoutine(routine)}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Image source={infoIcon} style={{ width: normalize(17), height: normalize(17) * (401.0 / 411.0), tintColor: 'rgba(255,255,255,0.5)' }} />
            </TouchableOpacity>
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
          marginTop: normalizeHeight(16),
          marginBottom: normalizeHeight(8),
        }}>
          Exercises
        </Text>
        <View style={{ position: 'relative', flex: 1 }}>
          <CurrentWorkoutList
            workout={workout}
            showSectionHeader={false}
            horizontalPadding={false}
            reverseOrder={false}
            avoidMonochrome={true}
            onScroll={handleListScroll}
          />
          {!isListAtBottom && (
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: normalizeHeight(100) }} pointerEvents="none">
              <Svg height="100%" width="100%">
                <Defs>
                  <LinearGradient id="detailsListFade" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor="#1c2238" stopOpacity="0" />
                    <Stop offset="0.4" stopColor="#1c2238" stopOpacity="0.3" />
                    <Stop offset="1" stopColor="#1c2238" stopOpacity="1" />
                  </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#detailsListFade)" />
              </Svg>
            </View>
          )}
        </View>
      </View>
      {/* Share card — always rendered for captureRef, off-screen when not debugging */}
      <View style={DEV_SHARE_PREVIEW
        ? { paddingHorizontal: normalizeWidth(16), marginBottom: normalizeHeight(12) }
        : { position: 'absolute', left: -9999, width: CARD_CAPTURE_WIDTH }
      }>
        <View
            ref={shareCardRef}
            collapsable={false}
            style={{ backgroundColor: '#272d46', borderRadius: normalize(12), paddingHorizontal: normalize(20), paddingTop: normalize(20), paddingBottom: normalize(12), marginBottom: normalizeHeight(12) }}
          >
            {/* Profile row */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: normalizeHeight(14) }}>
              <ProfileImageCircular
                imageSource={profilePhotoSource}
                width={normalize(60)}
                aspectRatio={1}
                crop={profilePhotoCrop}
              />
              <View style={{ flex: 1, marginLeft: normalizeWidth(12), justifyContent: 'center' }}>
                <Text style={{ color: '#ffffff', fontSize: normalize(15), fontWeight: '600' }}>{userName}</Text>
                {!!userInfo?.bio && (
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{ color: 'rgba(255,255,255,0.65)', fontSize: normalize(11), fontStyle: 'italic', marginTop: normalizeHeight(3), lineHeight: normalize(16) }}
                  >{userInfo.bio}</Text>
                )}
              </View>
              <Image source={fitforgeIcon} style={{ width: normalize(32), height: normalize(32), borderRadius: normalize(8), marginLeft: normalizeWidth(8), alignSelf: 'flex-start' }} />
            </View>

            {/* Divider */}
            <View style={{ height: normalize(1), backgroundColor: 'rgba(255,255,255,0.12)', marginBottom: normalizeHeight(18) }} />

            {/* WORKOUT COMPLETE label + accent line */}
            <View style={{ alignItems: 'center', marginBottom: normalizeHeight(16) }}>
              <Text style={{ color: '#b7c4ef', fontSize: normalize(11), fontWeight: '400', letterSpacing: 1.5 }}>WORKOUT COMPLETE</Text>
              <View style={{ width: normalizeWidth(36), height: normalize(1), backgroundColor: '#7fb3ff', marginTop: normalizeHeight(6) }} />
            </View>

            {/* Hero duration */}
            <View style={{ alignItems: 'center', marginBottom: normalizeHeight(4) }}>
              <Text style={{ color: '#ffffff', fontSize: normalize(38), fontWeight: '700', letterSpacing: -1 }}>{durationText}</Text>
              <Text style={{ color: '#8090bc', fontSize: normalize(10), fontWeight: '500', letterSpacing: 1.5 }}>TOTAL DURATION</Text>
            </View>

            {/* Stats row */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: normalizeHeight(16), marginTop: normalizeHeight(16) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#7fb3ff', fontSize: normalize(22), fontWeight: '700' }}>{exerciseRows.length}</Text>
                <Text style={{ color: '#9aadd0', fontSize: normalize(11), marginLeft: normalizeWidth(8) }}>Exercises</Text>
              </View>
              <View style={{ width: 1, height: normalizeHeight(18), backgroundColor: 'rgba(255,255,255,0.3)', marginHorizontal: normalizeWidth(24) }} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#7fb3ff', fontSize: normalize(22), fontWeight: '700' }}>{totalSets}</Text>
                <Text style={{ color: '#9aadd0', fontSize: normalize(11), marginLeft: normalizeWidth(8) }}>Sets</Text>
              </View>
            </View>

            {/* Divider */}
            <View style={{ height: normalize(1), backgroundColor: 'rgba(255,255,255,0.12)', marginBottom: normalizeHeight(14) }} />

            {/* Workout name */}
            <Text style={{ color: '#ffffff', fontSize: normalize(22), fontWeight: '300', fontStyle: 'italic', letterSpacing: -0.5, marginBottom: normalizeHeight(10) }}>{workout?.name}</Text>

            {/* Exercise list */}
            <View style={{ borderWidth: normalize(1), borderColor: 'rgba(127,179,255,0.25)', backgroundColor: '#1d2039', borderRadius: normalize(6), paddingHorizontal: normalizeWidth(12) }}>
              {visibleExercises.map((ex: any, i: number) => {
                const isLast = i === visibleExercises.length - 1 && hiddenCount === 0;
                return (
                  <View key={i} style={[{ flexDirection: 'row', alignItems: 'center', paddingVertical: normalizeHeight(7) },
                    !isLast && { borderBottomWidth: normalize(1), borderBottomColor: '#31324f' }]}>
                    <View style={{ width: normalize(5), height: normalize(5), borderRadius: normalize(4), backgroundColor: '#7fb3ff', marginRight: normalizeWidth(10) }} />
                    <Text style={{ flex: 1, color: 'rgba(255,255,255,0.8)', fontSize: normalize(12), fontFamily: 'RobotoMono-Regular' }}>{ex.name}</Text>
                    <Text style={{ color: '#8f99c5', fontSize: normalize(12), fontFamily: 'RobotoMono-Regular' }}>{ex.sets} {ex.sets === 1 ? 'set' : 'sets'}</Text>
                  </View>
                );
              })}
              {hiddenCount > 0 && (
                <View style={{ paddingVertical: normalizeHeight(7) }}>
                  <Text style={{ color: 'rgba(255,255,255,0.35)', fontSize: normalize(11) }}>+{hiddenCount} more</Text>
                </View>
              )}
            </View>

            {/* Date + time */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: normalizeHeight(10) }}>
              <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: normalize(11), fontFamily: 'RobotoMono-Regular' }}>{thinSpace(dateText)}</Text>
              <View style={{ width: normalize(3), height: normalize(3), borderRadius: normalize(2), backgroundColor: 'rgba(255,255,255,0.4)', marginHorizontal: normalizeWidth(8) }} />
              <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: normalize(11), fontFamily: 'RobotoMono-Regular' }}>{thinSpace(timeText)}</Text>
            </View>
        </View>
      </View>

<RoutineDetailsModal
        visible={!!detailsRoutine}
        routine={detailsRoutine}
        onClose={() => setDetailsRoutine(null)}
      />
    </View>
  );
}
