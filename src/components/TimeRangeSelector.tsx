import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { TimeRange } from '../enums/enums';
import { normalize, normalizeWidth, normalizeHeight } from '../utils/normalize';

interface TimeRangeSelectorProps {
  selectedTimeRange: TimeRange;
  onSelectTimeRange: (timeRange: TimeRange) => void;
}

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  selectedTimeRange,
  onSelectTimeRange,
}) => {
  const timeRanges = Object.values(TimeRange) as string[];

  return (
      <View
       style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#404153',
          borderRadius: normalize(20),
          marginHorizontal: normalizeWidth(16),
         marginVertical: normalizeHeight(16),
          padding: normalizeWidth(4)
        }}
      >
              {timeRanges.map((timeRange,index) => {
                const isSelected = selectedTimeRange === timeRange;
                const isLast = index === timeRanges.length - 1;
                const isFirst = index === 0;
                  return (
                      <TouchableOpacity
                          key={timeRange}
                          style={[
                              {
                                  flex: 1,
                                  borderWidth:normalize(1),
                                  borderColor:'#5b5e6f',
                                  borderRadius: normalize(20),
                                  backgroundColor:'#2e2f42',
                                  justifyContent:'center',
                              },

                              isSelected && {
                                borderColor: '#b05157',
                                backgroundColor:'#91273b'
                              },
                              !isLast && {
                                marginRight: normalizeWidth(4),
                              }

                          ]}
                          onPress={() => onSelectTimeRange(timeRange)}
                      >
                          <Text
                              style={[
                                  {fontWeight:'500',
                                    color:'#b1b0b7',
                                    textAlign:'center',
                                    fontSize:normalize(15),
                                   marginVertical:normalizeHeight(4),
                                  },
                                  isSelected && {
                                   color: '#ffd6d9'
                                  }
                              ]}
                          >{timeRange}</Text>
                      </TouchableOpacity>
                  )
              }
              )}
      </View>
  );
};

const styles = StyleSheet.create({
});
