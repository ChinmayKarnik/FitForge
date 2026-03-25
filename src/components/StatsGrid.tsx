
import React from 'react';
import { Text, View } from 'react-native';
import { normalizeWidth } from '../utils/normalize';
import StatsCard from './StatsCard';

const StatsGrid = ({ data }) => {

  const renderCardForTypeValue = (type, value,isLeft,isLastRow) => {
    return (
      <StatsCard title={type} text={value}
      isLeftCard={isLeft}
      isLastRow={isLastRow}
       />
    );
  } 

  const numberOfRows = Math.ceil(data.length / 2);
  return (
    <>
      {[...Array(numberOfRows)].map((_, idx) => {
        const isLastRow = idx === numberOfRows - 1;
      return (
        <View key={idx} style={{
          flexDirection:'row',
          marginTop:10,
          paddingHorizontal:normalizeWidth(16),
        }}>
           {renderCardForTypeValue("Maximum\nStreak",32,true,isLastRow)}
           {renderCardForTypeValue("Maximum\nStreak",32,false,isLastRow)}
        </View>
      )
    }
      )}
    </>
  );
};

export default StatsGrid;
