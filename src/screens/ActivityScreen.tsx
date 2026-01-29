import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { WorkoutSummaryCard } from '../components/WorkoutSummaryCard';
import { databaseController } from '../data';

export const ActivityScreen = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const loadWorkouts = async () => {
      const data = databaseController.getAllWorkouts();
      setWorkouts(data);
    };
    loadWorkouts();
  }, []);

  const renderWorkout = ({ item }) => <WorkoutSummaryCard workout={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity</Text>
      <FlatList
        data={workouts}
        renderItem={renderWorkout}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No workouts yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  workoutItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  workoutText: {
    fontSize: 16,
  },
});