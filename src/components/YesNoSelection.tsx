import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { normalize, normalizeWidth } from '../utils/normalize';

const YesNoSelection = ({ value, onChange }) => {
  return (
    <View style={{ flexDirection: 'row', borderRadius: normalize(8), overflow: 'hidden', backgroundColor: '#232441', borderWidth: normalize(1), borderColor: '#5a5a74' }}>
      <TouchableOpacity
        onPress={() => onChange(true)}
        style={{
          backgroundColor: value === true ? '#3e4c84' : '#13142a',
          paddingVertical: normalize(5),
          paddingHorizontal: normalize(17),
          borderTopLeftRadius: normalize(7),
          borderBottomLeftRadius: normalize(7),
          borderRightWidth: normalizeWidth(1),
          borderRightColor: '#5a5a74',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: value === true ? '#F2F4F8' : '#A9B1C2', fontWeight: '600', fontSize: normalize(15) }}>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onChange(false)}
        style={{
          backgroundColor: value === false ? '#3e4c84' : '#13142a',
          paddingVertical: normalize(4),
          paddingHorizontal: normalize(17),
          borderTopRightRadius: normalize(8),
          borderBottomRightRadius: normalize(8),
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: value === false ? '#F2F4F8' : '#A9B1C2', fontWeight: '600', fontSize: normalize(15) }}>No</Text>
      </TouchableOpacity>
    </View>
  );
};

export default YesNoSelection;