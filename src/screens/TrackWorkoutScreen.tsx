import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ActiveWorkoutTracker } from '../components';
import { BackdatedWorkoutRoutine } from '../components/BackdatedWorkoutRoutine';
import { LiveWorkoutRoutine } from '../components/LiveWorkoutRoutine';
import { BackdatedWorkoutFree } from '../components/BackdatedWorkoutFree';

type TrackWorkoutScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TrackWorkout'>;

type Props = {
  navigation: TrackWorkoutScreenNavigationProp;
};

type WorkoutMode = 'selection' | 'live-free' | 'live-routine' | 'backdated' | 'backdated-free' | 'backdated-routine';

export const TrackWorkoutScreen = ({ navigation }: Props) => {
  const [workoutMode, setWorkoutMode] = useState<WorkoutMode>('selection');

  const endWorkout = () => {
    setWorkoutMode('selection');
  };

  // Live workout without template (already implemented)
  if (workoutMode === 'live-free') {
    return <ActiveWorkoutTracker onEndWorkout={endWorkout} />; 
  }

  // Live workout with routine
  if (workoutMode === 'live-routine') {
    return <LiveWorkoutRoutine onEndWorkout={endWorkout} />;
  }

  // Placeholder for backdated workout - Selection screen
  if (workoutMode === 'backdated') {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Backdated Workout</Text>
        <Text style={styles.subtitle}>Choose your logging method</Text>
        
        <View style={styles.optionsContainer}>
          {/* Option 1: Backdated - Free */}
          <TouchableOpacity 
            style={styles.optionCard} 
            onPress={() => setWorkoutMode('backdated-free')}
          >
            <View style={styles.optionIcon}>
              <Text style={styles.optionIconText}>✍️</Text>
            </View>
            <Text style={styles.optionTitle}>Free Entry</Text>
            <Text style={styles.optionSubtitle}>Without Template</Text>
            <Text style={styles.optionDescription}>
              Log exercises freely without following a preset structure
            </Text>
          </TouchableOpacity>

          {/* Option 2: Backdated - Routine */}
          <TouchableOpacity 
            style={styles.optionCard} 
            onPress={() => setWorkoutMode('backdated-routine')}
          >
            <View style={styles.optionIcon}>
              <Text style={styles.optionIconText}>📄</Text>
            </View>
            <Text style={styles.optionTitle}>Routine Entry</Text>
            <Text style={styles.optionSubtitle}>With Routine</Text>
            <Text style={styles.optionDescription}>
              Fill in data for a pre-defined workout routine
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => setWorkoutMode('selection')}
        >
          <Text style={styles.cancelButtonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // Backdated workout - Free
  if (workoutMode === 'backdated-free') {
    return (
      <BackdatedWorkoutFree onEnd={() => setWorkoutMode('selection')} />
    );
  }

  // Placeholder for backdated workout - Routine
  if (workoutMode === 'backdated-routine') {
    return (
      <BackdatedWorkoutRoutine onEnd={() => setWorkoutMode('selection')} />
    );
  }

  // Workout mode selection screen
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Track Workout</Text>
      <Text style={styles.subtitle}>How would you like to log your workout?</Text>
      
      <View style={styles.optionsContainer}>
        {/* Option 1: Live Workout - Free */}
        <TouchableOpacity 
          style={styles.optionCard} 
          onPress={() => setWorkoutMode('live-free')}
        >
          <View style={styles.optionIcon}>
            <Text style={styles.optionIconText}>🏋️</Text>
          </View>
          <Text style={styles.optionTitle}>Live Workout</Text>
          <Text style={styles.optionSubtitle}>Without Template</Text>
          <Text style={styles.optionDescription}>
            Start a workout session and log exercises as you go
          </Text>
        </TouchableOpacity>

        {/* Option 2: Live Workout - Routine */}
        <TouchableOpacity 
          style={styles.optionCard} 
          onPress={() => setWorkoutMode('live-routine')}
        >
          <View style={styles.optionIcon}>
            <Text style={styles.optionIconText}>📋</Text>
          </View>
          <Text style={styles.optionTitle}>Live Workout</Text>
          <Text style={styles.optionSubtitle}>With Routine</Text>
          <Text style={styles.optionDescription}>
            Follow a pre-planned workout with rest timers and structure
          </Text>
        </TouchableOpacity>

        {/* Option 3: Backdated Workout */}
        <TouchableOpacity 
          style={styles.optionCard} 
          onPress={() => setWorkoutMode('backdated')}
        >
          <View style={styles.optionIcon}>
            <Text style={styles.optionIconText}>📝</Text>
          </View>
          <Text style={styles.optionTitle}>Backdated Workout</Text>
          <Text style={styles.optionSubtitle}>Log Past Activity</Text>
          <Text style={styles.optionDescription}>
            Record a workout you've already completed
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.cancelButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  optionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionIconText: {
    fontSize: 32,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  comingSoonBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF9500',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  comingSoonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
  },
  cancelButton: {
    marginTop: 24,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  placeholderContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 32,
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
