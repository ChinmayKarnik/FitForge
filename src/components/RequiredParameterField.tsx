import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { normalize, normalizeHeight } from '../utils/normalize';
import YesNoSelection from './YesNoSelection';
import NumberSelection from './NumberSelection';
import WeightSelection from './WeightSelection';
import TimeSelection from './TimeSelection';

const ParameterValueSelection = ({ value, setValue, parameter }) => {
  if (parameter.type === 'boolean') {
    return <YesNoSelection value={value} onChange={setValue} />;
  }
  if (parameter.type === 'reps') {
    return <NumberSelection value={value} setValue={setValue} areNegativeNumbersAllowed={false} />;
  }
  if (parameter.type === 'weight') {
    return <WeightSelection value={value} setValue={setValue} />;
  }
  if (parameter.type === 'time') {
    return <TimeSelection value={value} setValue={setValue} />;
  }
  return <></>;
};

const RequiredParameterField = ({ parameter, showBottomSeparator = true, updateParameterWithValue, initialValue }) => {
  let defaultValue = null;
  if (parameter.type === 'boolean') defaultValue = true;
  if (parameter.type === 'reps') defaultValue = 0;
  if (parameter.type === 'weight') defaultValue = 0;
  if (parameter.type === 'time') defaultValue = 0;

  const [value, setValue] = useState(initialValue ?? defaultValue);

  useEffect(() => {
    updateParameterWithValue(parameter.name, initialValue ?? defaultValue);
  }, []);

  useEffect(() => {
    updateParameterWithValue(parameter.name, value);
  }, [value]);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: normalizeHeight(12),
        }}
      >
        <Text
          style={{
            fontSize: normalize(12),
            fontWeight: '600',
            letterSpacing: 1,
            color: 'rgba(255,255,255,0.58)',
            textTransform: 'uppercase',
          }}
        >
          {parameter.name}
        </Text>
        <ParameterValueSelection value={value} setValue={setValue} parameter={parameter} />
      </View>
      {!!showBottomSeparator && (
        <View
          style={{
            width: '100%',
            height: normalizeHeight(1),
            backgroundColor: 'rgba(255,255,255,0.1)',
          }}
        />
      )}
    </View>
  );
};

export default RequiredParameterField;
