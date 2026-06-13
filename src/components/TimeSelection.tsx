import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import clock_icon from '../images/clock-thick-white.png';

const formatDisplay = (totalSecs: number): string => {
  const m = Math.floor(totalSecs / 60);
  const s = totalSecs % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const parseInput = (text: string): number => {
  if (text.includes(':')) {
    const [mPart, sPart] = text.split(':');
    const mins = parseInt(mPart) || 0;
    const secs = Math.min(parseInt(sPart) || 0, 59);
    return mins * 60 + secs;
  }
  return parseInt(text) || 0;
};

const TimeSelection = ({ value, setValue }) => {
  const [inputText, setInputText] = useState(formatDisplay(value || 0));
  const [isFocused, setIsFocused] = useState(false);
  const [snapCursorToEnd, setSnapCursorToEnd] = useState(false);

  const handleChange = (text: string) => {
    setInputText(text);
    setValue(parseInput(text));
  };

  const handleBlur = () => {
    setIsFocused(false);
    setInputText(formatDisplay(parseInput(inputText)));
  };

  return (
    <View style={styles.container}>
      <Image
        source={clock_icon}
        style={styles.icon}
      />
      <TextInput
        style={styles.valueText}
        value={inputText}
        onChangeText={handleChange}
        onFocus={() => {
          setIsFocused(true);
          setSnapCursorToEnd(true);
          setTimeout(() => setSnapCursorToEnd(false), 0);
        }}
        onBlur={handleBlur}
        keyboardType="numbers-and-punctuation"
        placeholder="00:00"
        placeholderTextColor="#F2F4F8"
        selectionColor="#F2F4F8"
        textAlign="center"
        caretHidden={!isFocused}
        selection={snapCursorToEnd ? { start: inputText.length, end: inputText.length } : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: normalize(1),
    borderColor: '#7A8CB3',
    borderRadius: normalize(10),
    overflow: 'hidden',
    backgroundColor: '#21203f',
    paddingLeft: normalizeWidth(4),
  },
  icon: {
    width: normalize(16),
    height: normalize(16) * (448.0 / 453.0),
    opacity: 0.88,
  },
  valueText: {
    color: 'white',
    fontSize: normalizeHeight(22),
    fontWeight: '600',
    letterSpacing: 0.5,
    paddingVertical: normalize(8),
    paddingLeft: normalize(6),
    paddingRight: normalize(14),
    margin: 0,
    includeFontPadding: false,
  },
});

export default TimeSelection;
