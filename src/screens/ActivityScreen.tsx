import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ActivityListEmpty from '../components/ActivityListEmpty';
import { WorkoutSummaryCard } from '../components/WorkoutSummaryCard';
import { databaseController } from '../data';
import { normalizeHeight } from '../utils/normalize';

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
        <View style={{width:'100%',borderWidth:1,
        borderColor: 'rgba(68, 75, 95)',
          alignItems:'center',
          backgroundColor: 'rgba(36, 42, 65)',
          paddingTop:normalizeHeight(40),
          paddingBottom:normalizeHeight(12)
        }}>
          <Text
          style={{fontSize:22,
            letterSpacing: 1,
            fontWeight: '700',
            color:"#fefefe"
          }}
          >Activity</Text>
        </View>
        <FlatList
          data={workouts}
          renderItem={renderWorkout}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<ActivityListEmpty />}
          ItemSeparatorComponent={() => <View style={{ height: normalizeHeight(12) }} />}
          contentContainerStyle={{ marginTop:normalizeHeight(12),
            marginVertical:normalizeHeight(40)
           }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#1c2238',
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