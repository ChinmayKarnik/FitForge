import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { normalize, normalizeHeight } from '../utils/normalize';
import YesNoSelection from './YesNoSelection';
import NumberSelection from './NumberSelection';
import WeightSelection from './WeightSelection';

const ParameterValueSelection = ({ value, setValue, parameter }) => {
  if (parameter.type === 'boolean') {
    return <YesNoSelection value={value} onChange={setValue} />;
  }
  if (parameter.type === 'reps') {
    return <NumberSelection value={value} setValue={setValue} />;
  }
  if (parameter.type === 'weight') {
    return <WeightSelection value={value} setValue={setValue} />;
  }
  return <></>;
};

const RequiredParameterField = ({ parameter, showBottomSeparator = true, updateParameterWithValue }) => {
  let defaultValue = null;
  if (parameter.type === 'boolean') defaultValue = true;
  if (parameter.type === 'reps') defaultValue = 0;
  if (parameter.type === 'weight') defaultValue = 0;

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    updateParameterWithValue(parameter.name, defaultValue);
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
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: normalize(16),
            fontWeight: '400',
            lineHeight: normalize(18),
            letterSpacing: normalize(0.2),
            color: '#eeeef3',
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
            height: normalizeHeight(1.4),
            backgroundColor: '#545671',
          }}
        />
      )}
    </View>
  );
};

export default RequiredParameterField;
