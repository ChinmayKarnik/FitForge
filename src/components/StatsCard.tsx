import React from 'react';

import { View, Text, Image } from 'react-native';
import { normalize, normalizeWidth } from '../utils/normalize';


const StatsCard = ({ title, text, isLeftCard,isLastRow,
    icon, iconStyle
 }) => {
   
 
  return (
    <View
      style={{
        flex: 1,
        aspectRatio: 1,
        backgroundColor: '#282a41',
        borderWidth:normalize(2),
        borderRadius: normalize(10),
        borderColor: '#3d4256',
        marginRight: isLeftCard ? normalize(20) : 0,
        marginBottom: isLastRow ? 0 : normalize(10),
      }}
      >
          <View style={{
              marginTop: normalize(20),
              flexDirection: 'row',
              alignItems: 'center',
          }}>
              <Image
                source={icon}
                style={[iconStyle, {
                  marginRight: normalizeWidth(8),
                  marginLeft: normalizeWidth(16)
                }]}
              />
              <Text
              style={{
                color: '#9797a4',
                fontSize: normalize(17),
                fontWeight: '400',
              }}
              >{title}</Text>
          </View>
      <Text
        style={{
          position: 'absolute',
          bottom: normalize(18),
          left: 0,
          right: 0,
          textAlign: 'center',
          color: '#ff786e',
          fontSize: normalize(22),
          fontWeight: '500',
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default StatsCard;
