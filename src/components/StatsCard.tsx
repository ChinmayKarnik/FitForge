import React from 'react';

import { View, Text, Image } from 'react-native';
import { normalize, normalizeWidth } from '../utils/normalize';

const flameImg = require('../images/flame.png');


const StatsCard = ({ title, text, isLeftCard,isLastRow }) => {
   
 
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
              marginTop: normalize(10),
              flexDirection: 'row',
              alignItems: 'center',
          }}>
              <Image
                source={flameImg}
                style={{
                  width: normalize(60),
                  height: normalize(60),
                  resizeMode: 'contain',
                  marginRight: normalizeWidth(8),
                  marginLeft: normalizeWidth(8)
                }}
              />
              <Text
              style={{
                color: '#9797a4',
                fontSize: normalize(14),
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
