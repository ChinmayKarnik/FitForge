// @ts-nocheck
import React from 'react';
import { View, Text, Image } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import { TimeRange } from '../enums/enums';
import ProfileImageCircular from './ProfileImageCircular';
import fitforgeIcon from '../images/fitforge-icon.png';
import flame_3 from '../images/flame-3.png';
import calendar from '../images/calendar.png';
import dumbbell_2 from '../images/dumbbell-2.png';
import plates_stack_2 from '../images/plates-stack-2.png';
import trend_arrow_2 from '../images/trend-arrow-2.png';
import medal_white from '../images/medal-white.png';

type Props = {
  statsData: any;
  dateRangeLabel: string;
  selectedTimeRange: string;
  streakValue: string;
  avgSets: string;
  avgSessions: string;
  userName: string;
  userInfo: any;
  profilePhotoSource: any;
  profilePhotoCrop: any;
};

export const StatsShareCard = React.forwardRef<View, Props>(({
  statsData,
  dateRangeLabel,
  selectedTimeRange,
  streakValue,
  avgSets,
  avgSessions,
  userName,
  userInfo,
  profilePhotoSource,
  profilePhotoCrop,
}, ref) => (
  <View
    ref={ref}
    collapsable={false}
    style={{ backgroundColor: '#1c2238', borderRadius: normalize(12), padding: normalize(16) }}
  >
    {/* Profile row */}
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: normalizeHeight(14) }}>
      <ProfileImageCircular imageSource={profilePhotoSource} width={normalize(48)} aspectRatio={1} crop={profilePhotoCrop} />
      <View style={{ flex: 1, marginLeft: normalizeWidth(10) }}>
        <Text style={{ color: '#ffffff', fontSize: normalize(14), fontWeight: '600' }}>{userName}</Text>
        {!!userInfo?.bio && (
          <Text numberOfLines={2} style={{ color: 'rgba(255,255,255,0.6)', fontSize: normalize(11), fontStyle: 'italic', marginTop: normalizeHeight(2), lineHeight: normalize(16) }}>{userInfo.bio}</Text>
        )}
      </View>
      <Image source={fitforgeIcon} style={{ width: normalize(28), height: normalize(28), borderRadius: normalize(6), marginLeft: normalizeWidth(8), alignSelf: 'flex-start' }} />
    </View>

    {/* Divider */}
    <View style={{ height: normalize(1), backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: normalizeHeight(12) }} />

    {/* Time range label */}
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: normalizeHeight(12) }}>
      <View style={{ width: normalizeWidth(2), height: normalizeHeight(14), backgroundColor: 'rgba(127,179,255,0.5)', borderRadius: normalize(2), marginRight: normalizeWidth(4) }} />
      <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: normalize(11), letterSpacing: 0.3, fontWeight: '600' }}>{dateRangeLabel}</Text>
    </View>

    {/* Top stat row: Total | Max Streak | Sessions/Wk */}
    <View style={{ flexDirection: 'row', marginBottom: normalizeHeight(8) }}>

      <View style={{ flex: 1, backgroundColor: '#272d46', borderRadius: normalize(12), borderWidth: 1, borderColor: '#3d4563', padding: normalize(10), marginRight: normalizeWidth(4), justifyContent: 'space-between' }}>
        <View style={{ width: normalize(26), height: normalize(26), borderRadius: normalize(6), backgroundColor: 'rgba(127,179,255,0.09)', alignItems: 'center', justifyContent: 'center', marginBottom: normalizeHeight(8) }}>
          <Image source={dumbbell_2} style={{ width: normalize(14), height: normalize(14) * (241.0 / 410.0), resizeMode: 'contain', tintColor: '#ffffff' }} />
        </View>
        <Text style={{ color: 'rgba(255,255,255,0.68)', fontSize: normalize(10), fontWeight: '600', letterSpacing: 0.6, marginBottom: normalizeHeight(4) }}>WORKOUTS</Text>
        <Text style={{ color: '#ffffff', fontSize: normalize(22), fontWeight: '800' }}>{statsData.totalWorkouts ?? '-'}</Text>
      </View>

      <View style={{ flex: 1, backgroundColor: '#272d46', borderRadius: normalize(12), borderWidth: 1, borderColor: '#3d4563', padding: normalize(10), marginHorizontal: normalizeWidth(4), justifyContent: 'space-between' }}>
        <View style={{ width: normalize(26), height: normalize(26), borderRadius: normalize(6), backgroundColor: 'rgba(251,112,40,0.12)', alignItems: 'center', justifyContent: 'center', marginBottom: normalizeHeight(8) }}>
          <Image source={flame_3} style={{ width: normalize(12), height: normalize(12) * (620.0 / 462.0), resizeMode: 'contain', tintColor: '#fb7028' }} />
        </View>
        <Text style={{ color: 'rgba(255,255,255,0.68)', fontSize: normalize(10), fontWeight: '600', letterSpacing: 0.6, marginBottom: normalizeHeight(4) }}>MAX STREAK</Text>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <Text style={{ color: '#fb7028', fontSize: normalize(22), fontWeight: '800' }}>{streakValue}</Text>
          {streakValue !== '-' && <Text style={{ fontSize: normalize(11), fontWeight: '600', color: 'rgba(251,112,40,0.65)', marginLeft: normalize(4), marginBottom: normalize(4) }}>days</Text>}
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: '#272d46', borderRadius: normalize(12), borderWidth: 1, borderColor: '#3d4563', padding: normalize(10), marginLeft: normalizeWidth(4), justifyContent: 'space-between' }}>
        <View style={{ width: normalize(26), height: normalize(26), borderRadius: normalize(6), backgroundColor: 'rgba(127,179,255,0.09)', alignItems: 'center', justifyContent: 'center', marginBottom: normalizeHeight(8) }}>
          {selectedTimeRange === TimeRange.OneWeek
            ? <Image source={plates_stack_2} style={{ width: normalize(14), height: normalize(14) * (425.0 / 469.0), resizeMode: 'contain', tintColor: '#ffffff' }} />
            : <Image source={trend_arrow_2} style={{ width: normalize(14), height: normalize(14) * (325.0 / 512.0), resizeMode: 'contain', tintColor: '#ffffff' }} />}
        </View>
        <Text style={{ color: 'rgba(255,255,255,0.68)', fontSize: normalize(10), fontWeight: '600', letterSpacing: 0.6, marginBottom: normalizeHeight(4) }}>
          {selectedTimeRange === TimeRange.OneWeek ? 'AVG SETS' : 'SESSIONS/WK'}
        </Text>
        <Text style={{ color: '#7fb3ff', fontSize: normalize(22), fontWeight: '800' }}>
          {selectedTimeRange === TimeRange.OneWeek ? avgSets : avgSessions}
        </Text>
      </View>

    </View>

    {/* Bottom row: Favourite Exercise + Busiest Day */}
    <View style={{ flexDirection: 'row' }}>

      <View style={{ flex: 1, backgroundColor: '#272d46', borderRadius: normalize(12), borderWidth: 1, borderColor: '#3d4563', padding: normalize(10), marginRight: normalizeWidth(4), justifyContent: 'space-between' }}>
        <View style={{ width: normalize(26), height: normalize(26), borderRadius: normalize(6), backgroundColor: 'rgba(127,179,255,0.09)', alignItems: 'center', justifyContent: 'center', marginBottom: normalizeHeight(8) }}>
          <Image source={medal_white} style={{ width: normalize(12), height: normalize(12) * (562.0 / 437.0), resizeMode: 'contain', tintColor: '#ffffff' }} />
        </View>
        <Text style={{ color: '#ffffff', fontSize: normalize(14), fontWeight: '800', marginBottom: normalizeHeight(4) }} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.6}>{statsData.favouriteExercise ?? '-'}</Text>
        <Text style={{ color: 'rgba(255,255,255,0.68)', fontSize: normalize(10), fontWeight: '600', letterSpacing: 0.6 }}>FAVOURITE</Text>
      </View>

      <View style={{ flex: 1, backgroundColor: '#272d46', borderRadius: normalize(12), borderWidth: 1, borderColor: '#3d4563', padding: normalize(10), marginLeft: normalizeWidth(4), justifyContent: 'space-between' }}>
        <View style={{ width: normalize(26), height: normalize(26), borderRadius: normalize(6), backgroundColor: 'rgba(127,179,255,0.09)', alignItems: 'center', justifyContent: 'center', marginBottom: normalizeHeight(8) }}>
          <Image source={calendar} style={{ width: normalize(12), height: normalize(12) * (420.0 / 410.0), resizeMode: 'contain', tintColor: '#ffffff' }} />
        </View>
        <Text style={{ color: '#7fb3ff', fontSize: normalize(14), fontWeight: '800', marginBottom: normalizeHeight(4) }}>{statsData.busiestDay ?? '-'}</Text>
        <Text style={{ color: 'rgba(255,255,255,0.68)', fontSize: normalize(10), fontWeight: '600', letterSpacing: 0.6 }}>BUSIEST DAY</Text>
      </View>

    </View>
  </View>
));
