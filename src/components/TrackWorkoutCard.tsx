import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import live_workout_clock from '../images/live_workout_clock.png';
import live_workout_routine_calendar from '../images/live_workout_routine_calendar.png'
import backdated_workout_calendar from '../images/backdated_workout_calendar.png'
import white_arrow_right from '../images/white-right-arrow.png'

const all_data = {
    "live-free": {
        title: "Track a Live Workout",
        description: "Start a session and log exercises as you go",
        image: live_workout_clock,
        imageAspectRatio: (178.0/192.0),
        iconWidth: 50,
    },
    "live-routine": {
        title: "Live Workout with Routine",
        description: "Pre-planned schedule with rest timers and structure",
        image: live_workout_routine_calendar,
        imageAspectRatio: (173.0/185.0),
        iconWidth: 50,
    },
    "live-backdated": {
        title: "Log a Backdated Workout",
        description: "Log a workout done previously",
        image: backdated_workout_calendar,
        imageAspectRatio: (176.0/147.0),
        iconWidth: 54,
    }
}

export const TrackWorkoutCard= ({ type, onPress, titleMarginTop = 14, titleDescGap = 8, descMarginBottom = 14 }: { type: keyof typeof all_data, onPress: () => void, titleMarginTop?: number, titleDescGap?: number, descMarginBottom?: number }) => {
  const data = all_data[type] || {};
  const title = data.title;
  const description =data.description
  const image = data.image
  const imageAspectRatio = data.imageAspectRatio
  const iconWidth = data.iconWidth
  return (
    <TouchableOpacity style={{
        backgroundColor:'#292f46',
        borderWidth:normalize(1),
        borderColor: '#484d63',
        borderRadius:normalize(10),
        marginHorizontal: normalizeWidth(16),
        flexDirection:'row',
        alignItems:'center'
    }}
    onPress={onPress}
    >
              <Image style={{
                  width: normalizeWidth(iconWidth),
                  marginLeft: normalizeWidth(20),
                  marginRight: normalizeWidth(10),
                  aspectRatio: imageAspectRatio
              }}
                  source={image}>
              </Image>

      <View style={{flex:1,marginRight:normalizeWidth(12),
      }}>
              <Text style={{
                  marginTop: normalizeHeight(titleMarginTop),
                  fontSize: normalize(16),
                  fontWeight: '600',
                  lineHeight: normalize(22),
                  color: '#F2F4F7'
              }}>{title}</Text>
              <Text style={{
                  marginTop: normalizeHeight(titleDescGap),
                  marginBottom: normalizeHeight(descMarginBottom),
                  fontSize: normalize(13),
                  fontWeight: '400',
                  lineHeight: normalize(18),
                  color: '#b8c2d4',
              }}>{description}</Text>
      </View>
      <Image source={white_arrow_right} style={{
        aspectRatio: (52.0/87.0),
        width:normalizeWidth(8),
        marginRight:normalizeWidth(15)
      }}/>
         
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
 
});

export default TrackWorkoutCard;
