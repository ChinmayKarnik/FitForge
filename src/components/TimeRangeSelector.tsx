import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
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
    <View style={{
      flexDirection: 'row',
      backgroundColor: '#1e2340',
      borderRadius: normalize(24),
      borderWidth: normalize(1),
      borderColor: '#2e3354',
      marginHorizontal: normalizeWidth(16),
      marginTop: normalizeHeight(14),
      marginBottom: normalizeHeight(6),
      padding: normalize(3),
    }}>
      {timeRanges.map((timeRange, index) => {
        const isSelected = selectedTimeRange === timeRange;
        const isLast = index === timeRanges.length - 1;
        return (
          <TouchableOpacity
            key={timeRange}
            style={[
              {
                flex: 1,
                borderRadius: normalize(20),
                paddingVertical: normalizeHeight(6),
                alignItems: 'center',
                justifyContent: 'center',
              },
              isSelected && {
                backgroundColor: '#3a4fa0',
              },
              !isLast && { marginRight: normalize(2) },
            ]}
            onPress={() => onSelectTimeRange(timeRange as TimeRange)}
            activeOpacity={0.7}
          >
            <Text style={[
              {
                fontWeight: '500',
                color: '#6a7499',
                fontSize: normalize(13),
              },
              isSelected && {
                color: '#e8ecff',
                fontWeight: '600',
              },
            ]}>{timeRange}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
