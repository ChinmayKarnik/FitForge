import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import right_arrow from '../images/white-right-arrow.png';

const ProfilePageSection = ({ section }) => {
  const navigation = useNavigation();
  const { name, route, icon, aspectRatio } = section;

  const width = normalizeWidth(26);
  const height = width / aspectRatio;

  const arrowHeight = normalizeHeight(14);
  const arrowAspectRatio = 52.0 / 87.0;
  const arrowWidth = arrowHeight * arrowAspectRatio;

  return (
    <TouchableOpacity
      style={{
        paddingLeft: normalizeWidth(20),
        paddingRight: normalizeWidth(16),
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: normalize(1),
        borderColor: '#283156',
        backgroundColor: '#222a4e',
        borderRadius: normalize(10),
        marginHorizontal: normalizeWidth(12),
        marginBottom: normalizeHeight(12),
        height: normalizeHeight(54),
      }}
      onPress={() => navigation.navigate(route)}
    >
      <Image
        source={icon}
        style={{
          width,
          height,
          marginRight: normalizeWidth(10),
        }}
      />
      <Text
        style={{
          fontSize: normalize(16),
          fontWeight: '500',
          color: '#E6EBF2',
          letterSpacing: 0.2,
          flex: 1,
        }}
      >
        {name}
      </Text>
      <Image
        source={right_arrow}
        style={{
          width: arrowWidth,
          height: arrowHeight,
          tintColor: '#9fa5c4',
        }}
      />
    </TouchableOpacity>
  );
};

export default ProfilePageSection;
