import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { routines } from '../data/dummy/routines';
import { normalizeHeight, normalizeWidth, normalize } from '../utils/normalize';

interface SelectRoutineLiveProps {
  onSelectRoutine: (routineId: string) => void;
}

export const SelectRoutineLive = ({ onSelectRoutine }: SelectRoutineLiveProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Active Workout</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {routines.map(routine => (
          <TouchableOpacity
            key={routine.id}
            style={styles.routineButton}
            onPress={() => onSelectRoutine(routine.id)}
          >
            <Text style={styles.routineButtonText}>{routine.name}</Text>
          </TouchableOpacity>
        ))}
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
    borderWidth: 1,
    borderColor: 'rgba(68, 75, 95)',
    alignItems: 'center',
    backgroundColor: 'rgba(36, 42, 65)',
    paddingTop: normalizeHeight(40),
    paddingBottom: normalizeHeight(12),
  },
  headerText: {
    fontSize: 22,
    letterSpacing: 1,
    fontWeight: '700',
    color: '#fefefe',
  },
  scrollContent: {
    paddingVertical: normalizeHeight(24),
    paddingHorizontal: normalizeWidth(16),
  },
  routineButton: {
    backgroundColor: '#4f5b93',
    paddingVertical: normalizeHeight(14),
    borderRadius: normalize(12),
    alignItems: 'center',
    marginVertical: normalizeHeight(8),
    width: '100%',
  },
  routineButtonText: {
    color: '#fff',
    fontSize: normalize(16),
    fontWeight: '700',
  },
});
