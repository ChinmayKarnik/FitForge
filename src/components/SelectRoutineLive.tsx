import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, FlatList, Image, BackHandler } from 'react-native';
import { databaseController } from '../data';
import { normalizeHeight, normalizeWidth, normalize } from '../utils/normalize';
import magnifying_glass from '../images/magnifying-glass-white.png';
import white_left_arrow from '../images/white-left-arrow.png';
import info_icon from '../images/info-icon.png';

interface SelectRoutineLiveProps {
  onSelectRoutine: (routineId: string) => void;
  onEndWorkout?: () => void;
}

export const SelectRoutineLive = ({ onSelectRoutine, onEndWorkout }: SelectRoutineLiveProps) => {
  const [selectedRoutineId, setSelectedRoutineId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (onEndWorkout) {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        onEndWorkout();
        return true;
      });
      return () => backHandler.remove();
    }
  }, [onEndWorkout]);

  const filteredRoutines = databaseController.getAllRoutines().filter((routine: any) =>
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

  const renderRoutineItem = ({ item }: { item: any }) => {
    const isSelected = selectedRoutineId === item.id;
    return (
      <TouchableOpacity
        style={[styles.routineItem, isSelected && styles.routineItemSelected]}
        onPress={() => handleSelectRoutine(item.id)}
        activeOpacity={0.7}
      >
        {/* Radio button — left */}
        <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
          {isSelected && <View style={styles.radioInner} />}
        </View>

        {/* Text content — middle */}
        <View style={styles.routineTextContainer}>
          <Text style={styles.routineName}>{item.name}</Text>
          <Text style={styles.routineExerciseCount}>5 exercises</Text>
          <Text style={styles.routineExerciseNames} numberOfLines={1}>
            Bench Press, Overhead Press, Row...
          </Text>
        </View>

        {/* Info icon — right */}
        <Image
          source={info_icon}
          style={styles.infoIcon}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onEndWorkout}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Image style={styles.backButtonImage} source={white_left_arrow} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Select Routine</Text>
        {/* Question mark placeholder — top right */}
        <View style={styles.questionMarkButton}>
          <Text style={styles.questionMarkText}>?</Text>
        </View>
      </View>

      {/* Search bar — fixed, does not scroll */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Image style={styles.searchIcon} source={magnifying_glass} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search routines..."
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
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

      {/* Footer — no top divider */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.startButton, !selectedRoutineId && styles.startButtonDisabled]}
          onPress={handleStartWorkout}
          disabled={!selectedRoutineId}
        >
          <Text style={styles.startButtonText}>Start Workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RADIO_SIZE = normalize(22);
const INFO_SIZE = normalize(20);
const QM_SIZE = normalize(28);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2238',
  },
  header: {
    width: '100%',
    borderBottomWidth: normalize(1),
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
    fontSize: normalize(18),
    letterSpacing: 1,
    fontWeight: '700',
    color: '#fefefe',
  },
  questionMarkButton: {
    position: 'absolute',
    top: normalizeHeight(46),
    right: normalizeWidth(16),
    width: QM_SIZE,
    height: QM_SIZE,
    borderRadius: QM_SIZE / 2,
    borderWidth: normalize(1.5),
    borderColor: 'rgba(255,255,255,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionMarkText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: normalize(14),
    fontWeight: '600',
  },
  scrollContent: {},
  contentContainer: {
    paddingHorizontal: normalizeWidth(16),
    paddingTop: normalizeHeight(8),
    paddingBottom: normalizeHeight(4),
  },
  searchWrapper: {
    paddingHorizontal: normalizeWidth(16),
    paddingTop: normalizeHeight(16),
    paddingBottom: normalizeHeight(8),
    backgroundColor: '#1c2238',
  },
  searchContainer: {
    backgroundColor: '#242a41',
    borderColor: '#383e55',
    borderWidth: normalize(1),
    borderRadius: normalize(10),
    paddingHorizontal: normalizeWidth(12),
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
    paddingTop: normalizeHeight(11),
    paddingBottom: normalizeHeight(11),
  },
  flatList: {

  },
  routineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222840',
    borderColor: '#383e55',
    borderWidth: normalize(1),
    borderRadius: normalize(10),
    paddingHorizontal: normalizeWidth(14),
    paddingVertical: normalizeHeight(14),
    marginBottom: normalizeHeight(10),
  },
  routineItemSelected: {
    borderColor: '#3B5BDB',
    backgroundColor: 'rgba(59, 91, 219, 0.08)',
  },
  radioOuter: {
    width: RADIO_SIZE,
    height: RADIO_SIZE,
    borderRadius: RADIO_SIZE / 2,
    borderWidth: normalize(2),
    borderColor: '#5a5f7a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalizeWidth(12),
    flexShrink: 0,
  },
  radioOuterSelected: {
    borderColor: '#3B5BDB',
  },
  radioInner: {
    width: RADIO_SIZE * 0.5,
    height: RADIO_SIZE * 0.5,
    borderRadius: (RADIO_SIZE * 0.5) / 2,
    backgroundColor: '#3B5BDB',
  },
  routineTextContainer: {
    flex: 1,
  },
  routineName: {
    fontSize: normalize(15),
    fontWeight: '700',
    color: '#fefefe',
    marginBottom: normalizeHeight(3),
  },
  routineExerciseCount: {
    fontSize: normalize(13),
    fontWeight: '400',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: normalizeHeight(2),
  },
  routineExerciseNames: {
    fontSize: normalize(12),
    fontWeight: '400',
    color: 'rgba(255,255,255,0.35)',
  },
  infoIcon: {
    width: INFO_SIZE,
    aspectRatio: 411.0 / 401.0,
    marginLeft: normalizeWidth(10),
    tintColor: 'rgba(255,255,255,0.35)',
  },
  footer: {
    paddingHorizontal: normalizeWidth(16),
    paddingTop: normalizeHeight(12),
    paddingBottom: normalizeHeight(83),
    backgroundColor: '#1c2238',
  },
  startButton: {
    backgroundColor: '#3B5BDB',
    paddingVertical: normalizeHeight(16),
    borderRadius: normalize(10),
    alignItems: 'center',
  },
  startButtonDisabled: {
    backgroundColor: 'rgba(59, 91, 219, 0.4)',
  },
  startButtonText: {
    color: '#fff',
    fontSize: normalize(16),
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
