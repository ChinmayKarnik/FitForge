
import React from 'react';
import { Text, View } from 'react-native';
import { normalizeWidth } from '../utils/normalize';

const StatsGrid = ({ data }) => {

  const renderCardForTypeValue = (type, value) => {
    return (
      <View style={{ flex: 1, height: 150, backgroundColor: '#eee', margin: 4 }} />
    );
  } 

  const numberOfRows = Math.ceil(data.length / 2);
  return (
    <>
      {[...Array(numberOfRows)].map((_, idx) => (
        <View key={idx} style={{
          flexDirection:'row',
          marginTop:10,
          paddingHorizontal:normalizeWidth(16),
        }}>
           {renderCardForTypeValue(3,3)}
           {renderCardForTypeValue(3,3)}
        </View>
      ))}
    </>
  );
};

export default StatsGrid;
