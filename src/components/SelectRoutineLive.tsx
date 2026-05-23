import React, { useState, useEffect } from 'react';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, FlatList, Image, BackHandler } from 'react-native';
import { databaseController } from '../data';
import { normalizeHeight, normalizeWidth, normalize } from '../utils/normalize';
import magnifying_glass from '../images/magnifying-glass-white.png';
import white_left_arrow from '../images/white-left-arrow.png';
import info_icon from '../images/info-icon.png';
import question_mark_with_circle from '../images/question-mark-with-circle.png';
import notepad_with_glass from '../images/notepad-with-glass.png';
import dumbbell_slant_2 from '../images/dumbbell-slant-2.png';

interface SelectRoutineLiveProps {
  onSelectRoutine: (routineId: string) => void;
  onEndWorkout?: () => void;
}

export const SelectRoutineLive = ({ onSelectRoutine, onEndWorkout }: SelectRoutineLiveProps) => {
  const navigation = useNavigation<any>();
  const [selectedRoutineId, setSelectedRoutineId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = (event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    setIsAtBottom(contentOffset.y + layoutMeasurement.height >= contentSize.height - 16);
  };

  useEffect(() => {
    if (onEndWorkout) {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        onEndWorkout();
        return true;
      });
      return () => backHandler.remove();
    }
  }, [onEndWorkout]);

  const allRoutines = databaseController.getAllRoutines();
  const filteredRoutines = allRoutines.filter((routine: any) =>
    routine.name.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    if (selectedRoutineId && !filteredRoutines.some((r: any) => r.id === selectedRoutineId)) {
      setSelectedRoutineId(null);
    }
  }, [searchText]);

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
          <Text style={styles.routineExerciseCount}>
            {item.exercises.length === 1 ? '1 Exercise' : `${item.exercises.length} Exercises`}
          </Text>
          <Text style={styles.routineExerciseNames} numberOfLines={1}>
            {item.exercises.map((e: any) => e.name).join(', ')}
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
        {/* Question mark icon — top right */}
        <Image source={question_mark_with_circle} style={styles.questionMarkIcon} />
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

      <View style={{ position: 'relative', flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <View style={styles.contentContainer}>
            <FlatList
              data={filteredRoutines}
              keyExtractor={(item) => item.id}
              renderItem={renderRoutineItem}
              scrollEnabled={false}
              style={styles.flatList}
              nestedScrollEnabled={false}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <View style={styles.emptyIconWrapper}>
                    <Image
                      source={notepad_with_glass}
                      style={styles.emptyIcon}
                    />
                  </View>

                  <Text style={styles.emptyTitle}>No routines found</Text>

                  <Text style={styles.emptySubtitle}>
                    No results for{' '}
                    <Text style={styles.emptySubtitleHighlight}>"{searchText}"</Text>
                  </Text>

                  <TouchableOpacity style={styles.emptyButton} onPress={() => navigation.navigate('Routines')}>
                    <Image source={dumbbell_slant_2} style={styles.emptyButtonIcon} />
                    <Text style={styles.emptyButtonText}>Manage Routines</Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        </ScrollView>
        {!isAtBottom && (
          <View style={styles.bottomFade} pointerEvents="none">
            <Svg height="100%" width="100%">
              <Defs>
                <LinearGradient id="listFade" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#1c2238" stopOpacity="0" />
                  <Stop offset="1" stopColor="#1c2238" stopOpacity="1" />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="100%" fill="url(#listFade)" />
            </Svg>
          </View>
        )}
      </View>

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
const QM_SIZE = normalize(20);

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
  questionMarkIcon: {
    position: 'absolute',
    top: normalizeHeight(43),
    right: normalizeWidth(16),
    width: QM_SIZE,
    height: QM_SIZE * (402.0 / 407.0),
    tintColor: 'rgba(255,255,255,0.55)',
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: normalizeHeight(28),
  },
  emptyIconWrapper: {
    marginBottom: normalizeHeight(16),
  },
  emptyIcon: {
    width: normalizeWidth(80),
    height: normalizeWidth(80) * (588.0 / 551.0),
    tintColor: 'rgba(255,255,255,0.6)',
  },
  emptyTitle: {
    fontSize: normalize(18),
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: normalizeHeight(6),
    letterSpacing: 0.2,
  },
  emptySubtitle: {
    fontSize: normalize(13),
    fontWeight: '400',
    color: 'rgba(255,255,255,0.55)',
    marginBottom: normalizeHeight(20),
  },
  emptySubtitleHighlight: {
    color: '#67a4f9',
    fontWeight: '500',
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: normalize(1),
    borderColor: '#4c79bb',
    borderRadius: normalize(10),
    paddingVertical: normalizeHeight(10),
    paddingHorizontal: normalizeWidth(20),
    gap: normalizeWidth(8),
  },
  emptyButtonIcon: {
    width: normalize(20),
    height: normalize(20) * (357.0 / 632.0),
    tintColor: '#caccd8',
  },
  emptyButtonText: {
    fontSize: normalize(14),
    fontWeight: '600',
    color: '#5391f5',
    letterSpacing: 0.2,
  },
  bottomFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: normalizeHeight(72),
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
    borderColor: '#4e68a6',
    backgroundColor: 'rgba(78, 104, 166, 0.12)',
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
    borderColor: '#4e68a6',
  },
  radioInner: {
    width: RADIO_SIZE * 0.5,
    height: RADIO_SIZE * 0.5,
    borderRadius: (RADIO_SIZE * 0.5) / 2,
    backgroundColor: '#4e68a6',
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
    color: '#4f8ff4',
    marginBottom: normalizeHeight(2),
  },
  routineExerciseNames: {
    fontSize: normalize(12),
    fontWeight: '400',
    color: 'rgba(255,255,255,0.5)',
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
    backgroundColor: '#2f4880',
    borderWidth: normalize(1),
    borderColor: '#4e68a6',
    paddingVertical: normalizeHeight(16),
    borderRadius: normalize(10),
    alignItems: 'center',
  },
  startButtonDisabled: {
    backgroundColor: '#313960',
    borderWidth: 0,
    opacity: 0.8,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: normalize(16),
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
