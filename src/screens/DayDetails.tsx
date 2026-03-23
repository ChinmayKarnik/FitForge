import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import white_left_arrow from '../images/white-left-arrow.png';
import clock2 from '../images/clock-2.png';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';

export const DayDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const date = route.params?.date;

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
        {/* Date Display */}
        <Text style={styles.dateText}>Friday, March 13, 2026</Text>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <View style={styles.iconPlaceholder} />
            <View style={styles.statContent}>
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>
          </View>


          <View style={styles.statItem}>
            <Image source={clock2} style={styles.clockIcon} />
            <View style={styles.statContent}>
              <Text style={styles.statValue}>120 Min</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>
        </View>
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
        fontSize: normalize(18),
        letterSpacing: 1,
        fontWeight: '700',
        color: "#fefefe"
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
  dateText: {
    fontSize: normalize(24),
    fontWeight: '700',
    color: '#fefefe',
    textAlign: 'center',
    marginBottom: normalizeHeight(24),
  },
  statsCard: {
    backgroundColor: '#2b2c41',
    borderRadius: normalize(12),
    borderWidth: normalize(2),
    borderColor: '#556179',
    paddingVertical: normalizeHeight(20),
    paddingHorizontal: normalizeWidth(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalizeWidth(12),
  },
  iconPlaceholder: {
    width: normalizeWidth(40),
    height: normalizeWidth(40),
    backgroundColor: '#353c58',
    borderRadius: normalize(8),
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: normalize(18),
    fontWeight: '700',
    color: '#d1514c',
    marginBottom: normalizeHeight(4),
  },
  statLabel: {
    fontSize: normalize(14),
    color: 'rgba(254, 254, 254, 0.7)',
    fontWeight: '500',
  },
  statDivider: {
    width: normalize(1),
    height: normalizeHeight(50),
    backgroundColor: '#353c58',
    marginHorizontal: normalizeWidth(16),
  },
  clockIcon: {
    height: normalizeHeight(45),
    aspectRatio: (304.0 / 351.0),
    width : normalizeHeight(45) * (304.0 / 351.0),
    resizeMode: 'contain',
  },
});
