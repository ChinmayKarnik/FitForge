import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import clock_icon from '../images/clock-thick-white.png';

const formatNormalized = (secs: number): string => {
  const m = Math.min(Math.floor(secs / 60), 99);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
};

const parseText = (t: string): number => {
  const [mPart, sPart] = t.split(':');
  return (parseInt(mPart) || 0) * 60 + (parseInt(sPart) || 0);
};

// Valid while typing: 1-2 minute digits, colon, 0-2 second digits; seconds ≤ 59 if both filled
const isValidPartial = (t: string): boolean => {
  if (!/^\d{0,2}:\d{0,2}$/.test(t)) return false;
  const secPart = t.split(':')[1];
  if (secPart.length === 2 && parseInt(secPart) > 59) return false;
  return true;
};

const TimeSelection = ({ value, setValue }: { value: number; setValue: (v: number) => void }) => {
  const [text, setText] = useState(() => formatNormalized(value || 0));
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (newText: string) => {
    if (isValidPartial(newText)) {
      setText(newText);
      setValue(parseText(newText));
    }
    // else: silently reject — text stays, cursor stays where it is
  };

  const handleBlur = () => {
    setIsFocused(false);
    const secs = parseText(text);
    setText(formatNormalized(secs));
    setValue(secs);
  };

  return (
    <View style={styles.container}>
      <Image source={clock_icon} style={styles.icon} />
      <TextInput
        style={styles.valueText}
        value={text}
        onChangeText={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        keyboardType="number-pad"
        placeholder="00:00"
        placeholderTextColor="#F2F4F8"
        selectionColor="#F2F4F8"
        textAlign="center"
        caretHidden={!isFocused}
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
