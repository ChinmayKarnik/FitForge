import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalizeHeight, normalizeWidth } from '../utils/normalize';
import white_left_arrow from '../images/white-left-arrow.png';
import { databaseController } from '../data';

export default function ProfilePhotoView() {
  const navigation = useNavigation<any>();
  const userInfo = databaseController.getUserInfo();
  const profilePhotoPath = userInfo?.profilePhotoPath;

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
        >Profile Photo</Text>
      </View>

      {/* Image display area */}
      <View style={{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {profilePhotoPath && (
          <Image
            source={{ uri: profilePhotoPath }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain'
            }}
          />
        )}
      </View>
    </View>
  );
}
