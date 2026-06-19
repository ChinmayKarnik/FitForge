import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';

const WeightSelection = ({ value,setValue}) => {

  const [inputText,setInputText] = useState(String(value || 0))
  const [isFocused, setIsFocused] = useState(false)
  const [snapCursorToEnd, setSnapCursorToEnd] = useState(false)



  const handleChange = (text) => {
    setInputText(text)
    // Allow only numbers and decimal point
    const cleaned = text.replace(/[^0-9.]/g, '');
    setValue(Number(cleaned));
  };
 
  return (
    <View style={styles.container}>
      <View style={styles.valueContainer}>
        <TextInput
          style={styles.valueText}
          value={inputText}
          onChangeText={handleChange}
          keyboardType="numeric"
          //placeholder={String(value?.toFixed?.(1) || 0)}
          placeholderTextColor="#F2F4F8"
          selectionColor="#F2F4F8"
          textAlign="center"
          caretHidden={!isFocused}
          selection={snapCursorToEnd ? { start: inputText.length, end: inputText.length } : undefined}
          onFocus={() => {
            setIsFocused(true);
            setSnapCursorToEnd(true);
            setTimeout(() => setSnapCursorToEnd(false), 0);
          }}
          onBlur={() => setIsFocused(false)}
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
    borderColor: '#3d4563',
    borderRadius: normalize(10),
    overflow: 'hidden',
    backgroundColor: '#1a2138',
    alignItems: 'center',
    minHeight:normalizeHeight(44)
  },
  valueContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161d30',
    borderRightWidth: normalize(1),
    borderRightColor: '#3d4563',
  },
  valueText: {
    color: 'white',
    fontSize: normalize(20),
    fontWeight: '600',
    letterSpacing: 0.5,
    paddingVertical: normalize(7),
    paddingHorizontal: normalize(13),
    margin: 0,
    includeFontPadding: false,
  },
  unitContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a2138',
    paddingVertical:normalizeHeight(5),
    paddingHorizontal:normalizeWidth(8)
  },
  unitText: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: normalize(13),
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});

export default WeightSelection;
