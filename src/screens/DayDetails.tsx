import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import white_left_arrow from '../images/white-left-arrow.png';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';

export const DayDetails = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.bg}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          hitSlop={{ top: normalizeHeight(20), bottom: normalizeHeight(20), left: normalizeWidth(20), right: normalizeWidth(20) }}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.backIcon}
            source={white_left_arrow}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Day Details</Text>
      </View>

      <View style={styles.container}>
        {/* Empty screen */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: 'rgba(36, 42, 65)',
  },
  header: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(68, 75, 95)',
    alignItems: 'center',
    backgroundColor: 'rgba(36, 42, 65)',
    paddingTop: normalizeHeight(40),
    paddingBottom: normalizeHeight(12),
    position: 'relative',
  },
  headerTitle: {
    fontSize: normalizeWidth(22),
    letterSpacing: 1,
    fontWeight: '700',
    color: '#fefefe',
  },
  backButton: {
    position: 'absolute',
    top: normalizeHeight(46),
    left: normalizeWidth(16),
  },
  backIcon: {
    width: normalizeWidth(9),
    height: normalizeWidth(9) * (86.0 / 51.0),
    aspectRatio: 51.0 / 86.0,
    resizeMode: 'stretch',
  },
  container: {
    flex: 1,
    paddingHorizontal: normalizeWidth(16),
    paddingTop: normalizeHeight(20),
  },
});
