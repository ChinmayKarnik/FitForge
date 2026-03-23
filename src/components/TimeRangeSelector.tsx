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
    <View style={styles.container}>
      <View
      
        style={{
          flexDirection: 'row',
          flex:1,
          justifyContent: 'space-between',
          backgroundColor: '#404153',
          borderRadius: normalize(20),
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
                                  borderColor:'#3b3e4e',
                                  //borderRadius: normalize(20),
                                  backgroundColor:'#2e2f42',
                                  justifyContent:'center',
                                  alignItems:'center'
                              },
                              isSelected && {},
                              !isLast && {
                                marginRight: normalizeWidth(4),
                              }

                          ]}
                          onPress={() => onSelectTimeRange(timeRange)}
                      >
                          <Text
                              style={[
                                  {fontWeight:'500',
                                    color:'white',
                                    fontSize:normalize(14)
                                  },
                              ]}
                          >All</Text>
                      </TouchableOpacity>
                  )
              }
              )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalizeHeight(16),
    paddingHorizontal: normalizeWidth(16),
  },

});
