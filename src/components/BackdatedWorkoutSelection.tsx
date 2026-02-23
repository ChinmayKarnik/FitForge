import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
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
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      onSelectMode('selection');
    }
  };

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
              style={styles.optionIcon}
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
              style={styles.optionIcon}
              source={live_workout_routine_calendar}
            />
            <View style={styles.textContent}>
              <Text style={styles.optionTitle}>Use Routine</Text>
              <Text style={styles.optionDescription}>
                Fill in data for an existing routine with structure
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
    paddingHorizontal: normalizeWidth(16),
    gap: normalizeHeight(12),
  },
  optionCard: {
    backgroundColor: 'rgba(42, 50, 75)',
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: 'rgba(68, 75, 95)',
    paddingHorizontal: normalizeWidth(16),
    paddingVertical: normalizeHeight(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: normalize(48),
    height: normalize(48),
    marginRight: normalizeWidth(12),
    flexShrink: 0,
    resizeMode: 'contain',
  },
  optionIconText: {
    fontSize: normalize(24),
  },
  textContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: normalize(16),
    fontWeight: '600',
    color: '#F2F4F8',
    marginBottom: normalizeHeight(4),
  },
  optionDescription: {
    fontSize: normalize(13),
    color: '#A9B1C2',
    lineHeight: normalize(16),
  },
  rightArrow: {
    width: normalizeWidth(6),
    height: normalizeWidth(10),
    marginLeft: normalizeWidth(12),
    tintColor: '#A9B1C2',
    resizeMode: 'contain',
    flexShrink: 0,
  },
});
