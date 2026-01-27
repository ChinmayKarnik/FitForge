import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { databaseController } from '../data';
import { ActiveWorkoutTracker } from '../components';

type TrackWorkoutScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TrackWorkout'>;

type Props = {
  navigation: TrackWorkoutScreenNavigationProp;
};

export const TrackWorkoutScreen = ({ navigation }: Props) => {
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);

  const endWorkout = () => {
    setIsWorkoutStarted(false);
  };

  if (isWorkoutStarted) {
    return <ActiveWorkoutTracker onEndWorkout={endWorkout} />; 
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>TrackWorkout</Text>
      
      <TouchableOpacity 
        style={styles.startButton} 
        onPress={() => setIsWorkoutStarted(true)}
      >
        <Text style={styles.startButtonText}>Start Live Workout</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  data: {
    fontSize: 12,
    fontFamily: 'monospace',
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 12,
    alignSelf: 'center',
    marginVertical: 20,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
