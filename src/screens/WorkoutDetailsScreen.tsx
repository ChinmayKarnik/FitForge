import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { normalizeHeight, normalizeWidth } from '../utils/normalize';
import white_left_arrow from '../images/white-left-arrow.png';
import clock from '../images/clock.png';
import calendarWithBorder from '../images/calendar-with-border.png';

export default function WorkoutDetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const workout = route.params?.workout;

  return (
    <View style={{
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: '#1c2238',
    }}>
      {/* Header */}
      <View style={{
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(68, 75, 95)',
        alignItems: 'center',
        backgroundColor: 'rgba(36, 42, 65)',
        paddingTop: normalizeHeight(40),
        paddingBottom: normalizeHeight(12)
      }}>
        <TouchableOpacity 
          style={{
            position: 'absolute',
            top: normalizeHeight(46),
            left: normalizeWidth(16),
          }}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image 
            style={{
              width: normalizeWidth(9),
              height: normalizeWidth(9) * (86.0 / 51.0),
              aspectRatio: 51.0 / 86.0,
              resizeMode: 'stretch'
            }}
            source={white_left_arrow}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 22,
            letterSpacing: 1,
            fontWeight: '700',
            color: "#fefefe"
          }}
        >Workout Details</Text>
      </View>

      {/* Body Container */}
      <View style={{
        flex: 1,
        padding: normalizeWidth(16),
      }}>
        {/* Workout Title */}
        <Text style={{
          fontSize: normalizeHeight(24),
          fontWeight: '500',
          color: '#fefefe',
          marginBottom: normalizeHeight(12),
        }}>
          {workout?.name}
        </Text>

        
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: normalizeHeight(12),
        }}>
          {/* Calendar Icon */}
          <Image
            source={calendarWithBorder}
            style={{
              width: normalizeWidth(15),
              aspectRatio: (538.0/496.0),
              marginRight: normalizeWidth(8),
              resizeMode: 'contain',
            }}
          />
          <Text style={{
            fontSize: normalizeHeight(13),
            color: '#bebdd1',
            fontWeight: '400',
          }}>
            {'Jan 30'} • {'3:08 PM'}
          </Text>
           <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Image
            source={clock}
            style={{
              width: normalizeWidth(13),
              marginRight: normalizeWidth(6),
              marginLeft: normalizeWidth(8),
              aspectRatio: (357.0/346.0),
              resizeMode: 'contain',
              tintColor: '#bebdd1',
            }}
          />
          <Text style={{
            fontSize: normalizeHeight(13),
            color: '#bebdd1',
            fontWeight: '400',
          }}>
            {'28'} min
          </Text>
        </View>

        </View>
       
        {/* Divider */}
        <View style={{
          height: normalizeHeight(2),
          backgroundColor: 'rgba(68, 75, 95, 0.5)',
          marginBottom: normalizeHeight(24),
        }} />
      </View>
    </View>
  );
}
