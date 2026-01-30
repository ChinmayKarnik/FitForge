import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WorkoutSummaryCard } from '../components/WorkoutSummaryCard';
import { databaseController } from '../data';

export const ActivityScreen = () => {
  const [workouts, setWorkouts] = useState<any[]>([]);

  useEffect(() => {
    const loadWorkouts = async () => {
      const data = databaseController.getAllWorkouts();
      setWorkouts(data);
    };
    loadWorkouts();
  }, []);
  console.log("ckck workotus are ",workouts)
  const renderWorkout = ({ item }: { item: any }) => <WorkoutSummaryCard workout={item} />;

  return (
    <View style={styles.bg}>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <FlatList
          data={workouts}
          renderItem={renderWorkout}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={styles.emptyText}>No workouts yet.</Text>}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF9ED', // soft light background
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 4,
    fontFamily: 'System',
  },
  subheader: {
    fontSize: 18,
    color: '#7C6F57',
    marginBottom: 350,
    fontFamily: 'System',
  },
  emptyText: {
    color: '#7C6F57',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});