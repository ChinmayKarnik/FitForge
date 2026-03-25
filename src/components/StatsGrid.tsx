
import React from 'react';
import { Text, View } from 'react-native';
import { normalizeWidth } from '../utils/normalize';
import StatsCard from './StatsCard';

const StatsGrid = ({ data }) => {
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
          <StatsCard
            title={data[idx * 2].title}
            text={data[idx * 2].value}
            isLeftCard={true}
            isLastRow={isLastRow}
            icon = {data[idx * 2].icon}
            iconStyle = {data[idx * 2].style}
          />
          <StatsCard
            title={data[idx * 2 + 1]?.title}
            text={data[idx * 2 + 1]?.value}
            icon = {data[idx * 2 + 1]?.icon}
            iconStyle = {data[idx * 2 + 1]?.style}
            isLeftCard={false}
            isLastRow={isLastRow}
          />
        </View>
      )
    }
      )}
    </>
  );
};

export default StatsGrid;
