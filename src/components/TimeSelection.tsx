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
  };

  const handleBlur = () => {
    setIsFocused(false);
    const secs = parseText(text);
    setText(formatNormalized(secs));
    setValue(secs);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={clock_icon} style={styles.icon} />
      </View>
      <TextInput
        style={styles.valueText}
        value={text}
        onChangeText={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        keyboardType="number-pad"
        placeholder="0:00"
        placeholderTextColor="rgba(255,255,255,0.3)"
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
    borderWidth: normalize(1),
    borderColor: '#3d4563',
    borderRadius: normalize(10),
    overflow: 'hidden',
    backgroundColor: '#1a2138',
    minHeight: normalizeHeight(44),
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a2138',
    paddingHorizontal: normalizeWidth(10),
    borderRightWidth: normalize(1),
    borderRightColor: '#3d4563',
  },
  icon: {
    width: normalize(15),
    height: normalize(15) * (448.0 / 453.0),
    opacity: 0.45,
  },
  valueText: {
    color: '#F2F4F8',
    fontSize: normalize(20),
    fontWeight: '600',
    letterSpacing: 0.5,
    paddingVertical: normalize(7),
    paddingHorizontal: normalize(13),
    margin: 0,
    includeFontPadding: false,
    backgroundColor: '#161d30',
  },
});

export default TimeSelection;
