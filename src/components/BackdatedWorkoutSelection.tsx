import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { normalizeHeight, normalizeWidth, normalize } from '../utils/normalize';
import white_left_arrow from '../images/white-left-arrow.png';
import white_right_arrow from '../images/white-right-arrow.png';
import live_workout_clock from '../images/live_workout_clock.png';
import live_workout_routine_calendar from '../images/live_workout_routine_calendar.png';

type WorkoutMode = 'selection' | 'live-free' | 'live-routine' | 'backdated' | 'backdated-free' | 'backdated-routine';

type Props = {
  onSelectMode: (mode: WorkoutMode) => void;
  onBackPress?: () => void;
};

export const BackdatedWorkoutSelection = ({ onSelectMode, onBackPress }: Props) => {
  const handleBackPress = useCallback(() => {
    if (onBackPress) {
      onBackPress();
    } else {
      onSelectMode('selection');
    }
    return true;
  }, [onBackPress, onSelectMode]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        unsubscribe.remove();
      };
    }, [handleBackPress])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Image
            style={styles.backButtonImage}
            source={white_left_arrow}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Backdated Workout</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {/* Option 1: Log Workout */}
          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => onSelectMode('backdated-free')}
            activeOpacity={0.8}
          >
            <Image
              style={[styles.optionIcon, { aspectRatio: (178.0/192.0) }]}
              source={live_workout_clock}
            />
            <View style={styles.textContent}>
              <Text style={styles.optionTitle}>Log Workout</Text>
              <Text style={styles.optionDescription}>
                Add exercises without following a template
              </Text>
            </View>
            <Image
              style={styles.rightArrow}
              source={white_right_arrow}
            />
          </TouchableOpacity>

          {/* Option 2: Use Routine */}
          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => onSelectMode('backdated-routine')}
            activeOpacity={0.8}
          >
            <Image
              style={[styles.optionIcon, { aspectRatio: (173.0/185.0) }]}
              source={live_workout_routine_calendar}
            />
            <View style={styles.textContent}>
              <Text style={styles.optionTitle}>Use Routine</Text>
              <Text style={styles.optionDescription}>
                Log a workout using a saved routine
              </Text>
            </View>
            <Image
              style={styles.rightArrow}
              source={white_right_arrow}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2238',
  },
  header: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'rgba(68, 75, 95)',
    alignItems: 'center',
    backgroundColor: 'rgba(36, 42, 65)',
    paddingTop: normalizeHeight(40),
    paddingBottom: normalizeHeight(12),
  },
  backButton: {
    position: 'absolute',
    top: normalizeHeight(46),
    left: normalizeWidth(16),
  },
  backButtonImage: {
    width: normalizeWidth(9),
    height: normalizeWidth(9) * (86.0 / 51.0),
    aspectRatio: 51.0 / 86.0,
    resizeMode: 'stretch',
  },
  headerText: {
    fontSize: 22,
    letterSpacing: 1,
    fontWeight: '700',
    color: '#fefefe',
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: normalizeHeight(20),
    paddingBottom: normalizeHeight(20),
  },
  contentContainer: {
    gap: normalizeHeight(16),
  },
  optionCard: {
    backgroundColor: '#292f46',
    borderRadius: normalize(10),
    borderWidth: 1,
    borderColor: '#484d63',
    marginHorizontal: normalizeWidth(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: normalizeWidth(50),
    marginLeft: normalizeWidth(20),
    marginRight: normalizeWidth(10),
  },
  textContent: {
    flex: 1,
    marginRight: normalizeWidth(12),
  },
  optionTitle: {
    marginTop: normalizeHeight(14),
    fontSize: normalize(16),
    fontWeight: '600',
    lineHeight: normalize(22),
    color: '#F2F4F7',
  },
  optionDescription: {
    marginTop: normalizeHeight(8),
    marginBottom: normalizeHeight(14),
    fontSize: normalize(13),
    fontWeight: '400',
    lineHeight: normalize(18),
    color: '#b8c2d4',
  },
  rightArrow: {
    aspectRatio: (52.0/87.0),
    width: normalizeWidth(8),
    marginRight: normalizeWidth(15),
  },
});
