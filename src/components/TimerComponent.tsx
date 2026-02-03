import React from 'react';
import { View, Text } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';

type TimerComponentProps = {
  formatTime: (time: number) => string;
  elapsedTime: number;
};

export const TimerComponent: React.FC<TimerComponentProps> = ({ formatTime, elapsedTime }) => {
  return (
    <View style={{
      borderWidth: normalize(2),
      borderColor: '#4b5171',
      borderRadius: normalize(12),
      marginHorizontal: normalizeWidth(30),
      marginTop: normalizeHeight(40),
    }}>
      <View style={{
        backgroundColor: '#282e4e',
        borderTopLeftRadius: normalize(12),
        borderTopRightRadius: normalize(12),
        width: '100%',
        alignItems: 'center'
      }}>
        <View style={{
          position: 'absolute',
          right: normalizeWidth(15),
          top: normalizeHeight(18),
          paddingHorizontal: normalizeWidth(5),
          paddingVertical: normalizeHeight(4),
          backgroundColor: '#4ba15c',
          borderRadius: normalize(8),
          borderWidth: normalize(1),
          borderColor: '#b0dbb5'
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <View style={{
              backgroundColor: 'white',
              width: normalizeWidth(5),
              height: normalizeHeight(5),
              borderRadius: normalize(20),
            }}></View>
            <Text style={{
              marginLeft: normalizeWidth(4),
              fontSize: normalize(10),
              fontWeight: '600',
              letterSpacing: normalize(0.5),
              color: '#FFFFFF',
            }}>LIVE</Text>
          </View>
        </View>
        <Text style={{
          paddingTop: normalizeHeight(12),
          fontSize: normalize(30),
          fontWeight: '600',
          letterSpacing: normalize(1),
          lineHeight: normalizeHeight(52),
          color: '#f2f1f4',
        }}>{formatTime(elapsedTime)}</Text>
      </View>

      <View style={{
        alignItems: 'center',
        borderTopWidth: normalize(1),
        borderColor: '#2b304b',
        backgroundColor: 'rgb(30, 35, 52)',
        borderBottomLeftRadius: normalize(12),
        borderBottomRightRadius: normalize(12)
      }}>
        <Text
          style={{
            fontSize: normalize(14),
            fontWeight: '500',
            lineHeight: normalize(18),
            color: '#818398',
            paddingVertical: normalizeHeight(8),
          }}
        >Elapsed Time</Text>
      </View>
    </View>
  );
};