import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, FlatList, Image } from 'react-native';
import { routines } from '../data/dummy/routines';
import { normalizeHeight, normalizeWidth, normalize } from '../utils/normalize';
import magnifying_glass from '../images/magnifying-glass-white.png';
import checkbox_blue_bg from '../images/checkbox-blue-bg.png';

interface SelectRoutineLiveProps {
  onSelectRoutine: (routineId: string) => void;
}

export const SelectRoutineLive = ({ onSelectRoutine }: SelectRoutineLiveProps) => {
  const [selectedRoutineId, setSelectedRoutineId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  const filteredRoutines = routines.filter(routine =>
    routine.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectRoutine = (routineId: string) => {
    setSelectedRoutineId(routineId);
  };

  const handleStartWorkout = () => {
    if (selectedRoutineId) {
      onSelectRoutine(selectedRoutineId);
    }
  };

  const renderRoutineItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.routineItem,
        selectedRoutineId === item.id && styles.routineItemSelected
      ]}
      onPress={() => handleSelectRoutine(item.id)}
    >
      <Text style={styles.routineName}>{item.name}</Text>
      {selectedRoutineId === item.id ? (
        <Image
          source={checkbox_blue_bg}
          style={styles.checkboxImage}
        />
      ) : (
        <View style={styles.checkboxEmpty} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Track Workout</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Select Workout Routine</Text>
          <Text style={styles.subtitle}>Choose a workout routine to start your session.</Text>

          <View style={styles.searchContainer}>
            <Image
              style={styles.searchIcon}
              source={magnifying_glass}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search routines..."
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          <FlatList
            data={filteredRoutines}
            keyExtractor={(item) => item.id}
            renderItem={renderRoutineItem}
            scrollEnabled={false}
            style={styles.flatList}
            nestedScrollEnabled={false}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.startButton,
            !selectedRoutineId && styles.startButtonDisabled
          ]}
          onPress={handleStartWorkout}
          disabled={!selectedRoutineId}
        >
          <Text style={styles.startButtonText}>Start Workout</Text>
        </TouchableOpacity>
      </View>
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
    flexGrow: 1,
  },
  contentContainer: {
    paddingHorizontal: normalizeWidth(16),
    paddingTop: normalizeHeight(24),
    paddingBottom: normalizeHeight(24),
  },
  title: {
    fontSize: normalize(24),
    fontWeight: '700',
    color: '#fefefe',
    marginBottom: normalizeHeight(8),
  },
  subtitle: {
    fontSize: normalize(14),
    color: 'rgba(255,255,255,0.6)',
    marginBottom: normalizeHeight(20),
    fontWeight: '400',
  },
  searchContainer: {
    backgroundColor: '#292f46',
    borderColor: '#383e55',
    borderWidth: 1,
    borderRadius: normalize(8),
    paddingHorizontal: normalizeWidth(12),
    marginBottom: normalizeHeight(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    width: normalizeWidth(17),
    height: normalizeHeight(17),
    marginRight: normalizeWidth(8),
    tintColor: '#757689',
  },
  searchInput: {
    flex: 1,
    fontSize: normalize(14),
    color: '#fff',
    paddingTop: normalizeHeight(10),
    paddingBottom: normalizeHeight(10),
  },
  flatList: {
    marginBottom: normalizeHeight(16),
  },
  routineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(36, 42, 65)',
    borderColor: 'rgba(68, 75, 95)',
    borderWidth: 1,
    borderRadius: normalize(8),
    paddingHorizontal: normalizeWidth(12),
    paddingVertical: normalizeHeight(12),
    marginBottom: normalizeHeight(12),
  },
  routineItemSelected: {
    borderColor: '#4f5b93',
    backgroundColor: 'rgba(79, 91, 147, 0.2)',
  },
  checkboxImage: {
    width: normalize(20),
    height: normalize(20),
    marginLeft: normalizeWidth(12),
  },
  checkboxEmpty: {
    width: normalize(20),
    height: normalize(20),
    borderRadius: normalize(20),
    borderColor: '#5f637a',
    borderWidth: normalize(1),
    marginLeft: normalizeWidth(12),
  },
  routineName: {
    flex: 1,
    fontSize: normalize(16),
    fontWeight: '600',
    color: '#fefefe',
  },
  footer: {
    paddingHorizontal: normalizeWidth(16),
    paddingVertical: normalizeHeight(16),
    paddingBottom: normalizeHeight(100),
    borderTopWidth: 1,
    borderTopColor: 'rgba(68, 75, 95)',
    backgroundColor: '#1c2238',
  },
  startButton: {
    backgroundColor: '#4f5b93',
    paddingVertical: normalizeHeight(14),
    borderRadius: normalize(8),
    alignItems: 'center',
  },
  startButtonDisabled: {
    backgroundColor: 'rgba(79, 91, 147, 0.5)',
  },
  startButtonText: {
    color: '#fff',
    fontSize: normalize(16),
    fontWeight: '700',
  },
});
