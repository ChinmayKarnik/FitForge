import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';

const YesNoSelection = ({ value, onChange }) => {
  return (
    <View style={{ flexDirection: 'row', borderRadius: normalize(8), overflow: 'hidden', backgroundColor: '#1a2138', borderWidth: normalize(1), borderColor: '#3d4563', minHeight: normalizeHeight(52) }}>
      <TouchableOpacity
        onPress={() => onChange(true)}
        style={{
          alignSelf: 'stretch',
          backgroundColor: value === true ? '#2f4880' : '#1a2138',
          paddingHorizontal: normalize(24),
          borderRightWidth: normalizeWidth(1),
          borderRightColor: '#3d4563',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: value === true ? '#F2F4F8' : 'rgba(255,255,255,0.38)', fontWeight: '600', fontSize: normalize(17) }}>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onChange(false)}
        style={{
          alignSelf: 'stretch',
          backgroundColor: value === false ? '#2f4880' : '#1a2138',
          paddingHorizontal: normalize(24),
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: value === false ? '#F2F4F8' : 'rgba(255,255,255,0.38)', fontWeight: '600', fontSize: normalize(17) }}>No</Text>
      </TouchableOpacity>
    </View>
  );
};

export default YesNoSelection;