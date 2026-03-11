import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, TextInput, Image } from 'react-native';
import AddExerciseModal from './AddExerciseModal';
import { useWorkoutState } from '../hooks';
import { normalizeHeight, normalizeWidth, normalize } from '../utils/normalize';
import white_left_arrow from '../images/white-left-arrow.png';
import CurrentWorkoutList from './CurrentWorkoutList';
import white_plus from '../images/white-plus.png'
import white_donut from '../images/white-donut.png'
import ExercisePickerLoggerModal from './ExercisePickerLoggerModal';
import DateSelectionModal from './DateSelectionModal.tsx';
import TimeSelectionModal from './TimeSelectionModal';

export const BackdatedWorkoutFree = ({ onEnd, onBackPress }: { onEnd: () => void; onBackPress?: () => void }) => {
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [workoutDateTime, setWorkoutDateTime] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const workoutRef = useRef({})

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const selected = new Date(selectedDate);
  selected.setHours(0, 0, 0, 0);
  let selectedDateString = '';
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (selected.getTime() === now.getTime()) {
    selectedDateString = 'Today';
  } else if (selected.getTime() === yesterday.getTime()) {
    selectedDateString = 'Yesterday';
  } else if (selected.getFullYear() === now.getFullYear()) {
    selectedDateString = selected.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  } else {
    selectedDateString = selected.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  const onConfirmDate = (date)=>{
   setSelectedDate(date);
  }

  useEffect(()=>{
     workoutRef.current = {
        startTime:workoutDateTime,
        endTime: workoutDateTime,
        exercises: []
     }
  },[workoutDateTime])
  
    const addSetsForExercise = (exercise, params, loggedData) => {
        const workout = workoutRef.current;
        const firstSetStartTime = workout.endTime;
        const defaultSetTime = 60*1000;
        const numberOfSets = params.numberOfSets;
        const restTimeBetweenSets = params.restTimeBetweenSets;
        for (let i = 0; i < numberOfSets; i++) {
          const setExercise = {exerciseId:exercise.id,};
          setExercise.startTime = firstSetStartTime + defaultSetTime*(i) + restTimeBetweenSets*(i);
          setExercise.endTime = setExercise.startTime + defaultSetTime;
          setExercise.loggedData = loggedData[i];
          workoutRef.current.exercises.push(setExercise);
        }
        workoutRef.current.endTime =  firstSetStartTime + numberOfSets*(defaultSetTime) + 
        numberOfSets*(restTimeBetweenSets);
    }


  const handleAddExercise = () => setShowAddExercise(true);
  const handleEndWorkout = () => {
    console.log('workout ending ',workoutRef.current);
    onEnd();
  };
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    }
  };

  return (
    <>
      {/* Header */}
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
        <Text style={styles.headerText}>Log Workout</Text>
      </View>
      <View style={styles.container}>
        <View style={{ marginTop: normalizeHeight(10) }}>
          <Text style={{
            fontSize: normalize(15),
            fontWeight: '600',
            color: '#B0B7C3',
            marginBottom: normalizeHeight(8),
          }}>Date and time</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => setShowDateModal(true)}
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(42, 50, 75, 1)',
                borderRadius: normalizeHeight(12),
                borderWidth: 1,
                borderColor: 'rgba(68, 75, 95, 1)',
                paddingVertical: normalizeHeight(10),
                paddingHorizontal: normalizeWidth(16),
                marginRight: normalizeWidth(8),
              }}
            >
              <Text style={{ fontSize: normalizeHeight(15), color: '#F2F4F8', fontWeight: '500' }}>
                {selectedDateString}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowTimeModal(true)}
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(42, 50, 75, 1)',
                borderRadius: normalizeHeight(12),
                borderWidth: 1,
                borderColor: 'rgba(68, 75, 95, 1)',
                paddingVertical: normalizeHeight(10),
                paddingHorizontal: normalizeWidth(16),
                marginLeft: normalizeWidth(8),
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: normalizeHeight(15), color: '#F2F4F8', fontWeight: '500' }}>
                  11:05 AM
                </Text>
              </View>
            </TouchableOpacity>
          </View>
             
        </View>


        {/* Render the current workout list */}
        <View style={{
          flex:1
        }}>
        <CurrentWorkoutList workout={workoutRef.current} emptyStateText='Tap "Add Exercise" to log your first set' horizontalPadding={false} />
        </View>
        <View 
        style={{marginBottom:
          normalizeHeight(80)
        }}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddExercise}>
          <Image
            source={white_plus}
            style={styles.startExerciseImage}
          />
          <Text
            style={styles.buttonText}
          >Add Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.endButton} onPress={handleEndWorkout}>
          <Image
            source={white_donut}
            style={styles.buttonImage}
          />
          <Text
            style={styles.buttonText}
          >End Workout   </Text>
        </TouchableOpacity>
        </View>
        {!!showAddExercise && (<ExercisePickerLoggerModal
          visible={showAddExercise}
          addSetsForExercise={addSetsForExercise}
          onClose={() => {setShowAddExercise(false) }}
        />)
        }
      </View>
      <DateSelectionModal
        visible={showDateModal}
        onClose={() => setShowDateModal(false)}
        selectedDate ={selectedDate}
        onConfirmDate={onConfirmDate}
      />
      <TimeSelectionModal
        visible={showTimeModal}
        onClose={() => setShowTimeModal(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2238',
    paddingHorizontal:normalizeWidth(16),
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
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    color: '#F2F4F8',
  },
  subtitle: {
    fontSize: 16,
    color: '#A9B1C2',
    textAlign: 'center',
    marginBottom: 24,
  },
  exerciseLogCard: {
    backgroundColor: 'rgba(42, 50, 75)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(68, 75, 95)',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#F2F4F8',
  },
  exerciseDetail: {
    fontSize: 14,
    color: '#A9B1C2',
    marginBottom: 2,
  },
  addButton:  {
    alignItems: 'center',
    paddingVertical: normalizeHeight(12),
    borderWidth: normalize(1),
    borderColor: '#4e68a6',
    backgroundColor: '#2f4880',
    borderRadius: normalize(12),
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:normalizeHeight(10)
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  endButton:  {
    alignItems: 'center',
    paddingVertical: normalizeHeight(12),
    borderWidth: normalize(1),
    borderColor: '#dc6c72',
    backgroundColor: '#ad2126',
    borderRadius: normalize(12),
    marginTop: normalize(12),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  endButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1c2238',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(68, 75, 95)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: '#F2F4F8',
  },
  exerciseItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(68, 75, 95)',
    width: '100%',
  },
  selectedExerciseItem: {
    backgroundColor: 'rgba(78, 205, 196, 0.2)',
  },
  exerciseItemText: {
    fontSize: 16,
    color: '#F2F4F8',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(68, 75, 95)',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'rgba(42, 50, 75)',
    marginBottom: 12,
    width: '100%',
    color: '#F2F4F8',
  },
  saveButton: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 8,
    width: '100%',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  dateTimeModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTimeModal: {
    backgroundColor: '#1c2238',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: 'rgba(68, 75, 95)',
  },
  dateTimeModalTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: '#F2F4F8',
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 16,
    color: '#F2F4F8',
  },
  dateInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  timeInputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  inputGroup: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  inputLabelSmall: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#A9B1C2',
  },
  smallInput: {
    borderWidth: 1,
    borderColor: 'rgba(68, 75, 95)',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'rgba(42, 50, 75)',
    textAlign: 'center',
    width: '100%',
    minWidth: 60,
    color: '#F2F4F8',
  },
  confirmButton: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  startExerciseImage: {
    height: normalizeHeight(12),
    width: (112.0 / 115.0) * normalize(12),
    aspectRatio: (115.0 / 112.0),
    marginRight: normalizeWidth(6),
  },
  buttonText: {
    fontSize: normalize(16),
    fontWeight: '500',
    lineHeight: normalize(20),
    color: '#FFFFFF',
  },
  buttonImage: {
    height: normalizeHeight(12),
    width: (138.0 / 140.0) * normalize(12),
    aspectRatio: (140.0 / 138.0),
    marginRight: normalizeWidth(6),
  },
});
