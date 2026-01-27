import React from 'react';
import { View, Text, StyleSheet, TextInput, Switch } from 'react-native';
import { ExerciseParameter } from '../data/types';

type Props = {
  parameter: ExerciseParameter;
  isRequired: boolean;
  value: any;
  onChange: (value: any) => void;
};

const formatLabel = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1');
};

export const ExerciseFormField = ({ parameter, isRequired, value, onChange }: Props) => {
  const label = `${formatLabel(parameter.name)}${isRequired ? ' (Required)' : ' (Optional)'}`;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      {parameter.type === 'number' && (
        <TextInput
          style={styles.input}
          placeholder={`Enter ${parameter.name}`}
          value={value?.toString() || ''}
          onChangeText={onChange}
          keyboardType="numeric"
        />
      )}
      
      {parameter.type === 'string' && (
        <TextInput
          style={styles.input}
          placeholder={`Enter ${parameter.name}`}
          value={value || ''}
          onChangeText={onChange}
        />
      )}
      
      {parameter.type === 'boolean' && (
        <View style={styles.switchContainer}>
          <Switch
            value={value || false}
            onValueChange={onChange}
          />
          <Text style={styles.switchLabel}>{value ? 'Yes' : 'No'}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  switchLabel: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333333',
  },
});
