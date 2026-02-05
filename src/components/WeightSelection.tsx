import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';

const WeightSelection = ({ value,setValue}) => {

  const handleChange = (text) => {
    // Allow only numbers and decimal point
    const cleaned = text.replace(/[^0-9.]/g, '');
    setValue(cleaned);
  };

  return (
    <View style={styles.container}>
      <View style={styles.valueContainer}>
        <TextInput
          style={styles.valueText}
          value={value}
          onChangeText={handleChange}
          keyboardType="numeric"
          placeholder={String(value?.toFixed?.(1) || 0)}
          placeholderTextColor="#F2F4F8"
          selectionColor="#F2F4F8"
          textAlign="center"
        />
      </View>
      <View style={styles.unitContainer}>
        <Text style={styles.unitText}>kg</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: normalize(1),
    borderColor: '#7A8CB3',
    borderRadius: normalize(10),
    overflow: 'hidden',
    backgroundColor: '#22274c',
    alignItems: 'center',
  },
  valueContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#21203f',
    borderRightWidth: normalize(1),
    borderRightColor: '#323863',
  },
  valueText: {
    color: 'white',
    fontSize: normalizeHeight(20),
    fontWeight: '600',
    letterSpacing: 0.5,
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(10),
    margin: 0,
    includeFontPadding: false,
  },
  unitContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#22264c',
    paddingVertical:normalizeHeight(5),
    paddingHorizontal:normalizeWidth(5)
  },
  unitText: {
    color: '#d7d7e1',
    fontSize: normalize(15),
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});

export default WeightSelection;
