import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, TextInput, Image } from 'react-native';
import AddExerciseModal from './AddExerciseModal';
import { useWorkoutState } from '../hooks';
import { normalizeHeight, normalizeWidth, normalize } from '../utils/normalize';
import white_left_arrow from '../images/white-left-arrow.png';
import CurrentWorkoutList from './CurrentWorkoutList';
import white_plus from '../images/white-plus.png'
import white_donut from '../images/white-donut.png'

export const BackdatedWorkoutFree = ({ onEnd, onBackPress }: { onEnd: () => void; onBackPress?: () => void }) => {
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(true);
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [workoutDateTime, setWorkoutDateTime] = useState<number>(0);

  const workoutRef = useRef({})

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

  const handleConfirmDateTime = () => {
    if (!month || !day || !year || !hour || !minute) {
      Alert.alert('Error', 'Please fill in all date and time fields.');
      return;
    }
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);
    const yearNum = parseInt(year);
    const hourNum = parseInt(hour);
    const minuteNum = parseInt(minute);
    // Validate ranges
    if (monthNum < 1 || monthNum > 12) {
      Alert.alert('Error', 'Please enter a valid month (1-12).');
      return;
    }
    if (dayNum < 1 || dayNum > 31) {
      Alert.alert('Error', 'Please enter a valid day (1-31).');
      return;
    }
    if (yearNum < 2020 || yearNum > new Date().getFullYear()) {
      Alert.alert('Error', 'Please enter a valid year.');
      return;
    }
    if (hourNum < 0 || hourNum > 23) {
      Alert.alert('Error', 'Please enter a valid hour (0-23).');
      return;
    }
    if (minuteNum < 0 || minuteNum > 59) {
      Alert.alert('Error', 'Please enter a valid minute (0-59).');
      return;
    }
    try {
      const workoutDateTime = new Date(yearNum, monthNum - 1, dayNum, hourNum, minuteNum);
      const now = new Date();
      if (workoutDateTime > now) {
        Alert.alert('Error', 'Workout date/time cannot be in the future.');
        return;
      }
      setWorkoutDateTime(workoutDateTime.getTime());
      setShowDateTimePicker(false);
    } catch (error) {
      Alert.alert('Error', 'Invalid date or time.');
    }
  };

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
      {/* Date/Time Picker Modal */}
      {/* <Modal visible={showDateTimePicker} animationType="slide" transparent={true}>
        <View style={styles.dateTimeModalOverlay}>
          <View style={styles.dateTimeModal}>
            <Text style={styles.dateTimeModalTitle}>When did this workout happen?</Text>
            <Text style={styles.sectionLabel}>Date</Text>
            <View style={styles.dateInputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabelSmall}>Month</Text>
                <TextInput
                  style={styles.smallInput}
                  placeholder="MM"
                  value={month}
                  onChangeText={setMonth}
                  keyboardType="numeric"
                  maxLength={2}
                  placeholderTextColor="#888"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabelSmall}>Day</Text>
                <TextInput
                  style={styles.smallInput}
                  placeholder="DD"
                  value={day}
                  onChangeText={setDay}
                  keyboardType="numeric"
                  maxLength={2}
                  placeholderTextColor="#888"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabelSmall}>Year</Text>
                <TextInput
                  style={styles.smallInput}
                  placeholder="YYYY"
                  value={year}
                  onChangeText={setYear}
                  keyboardType="numeric"
                  maxLength={4}
                  placeholderTextColor="#888"
                />
              </View>
            </View>
            <Text style={styles.sectionLabel}>Time (24-hour format)</Text>
            <View style={styles.timeInputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabelSmall}>Hour</Text>
                <TextInput
                  style={styles.smallInput}
                  placeholder="HH"
                  value={hour}
                  onChangeText={setHour}
                  keyboardType="numeric"
                  maxLength={2}
                  placeholderTextColor="#888"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabelSmall}>Minute</Text>
                <TextInput
                  style={styles.smallInput}
                  placeholder="MM"
                  value={minute}
                  onChangeText={setMinute}
                  keyboardType="numeric"
                  maxLength={2}
                  placeholderTextColor="#888"
                />
              </View>
            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmDateTime}>
              <Text style={styles.confirmButtonText}>Start Logging Workout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
      {/* Main Workout Logging Interface */}
      <View style={styles.container}>
        <View style={{ marginTop: normalizeHeight(10) }}>
          <Text style={{
            fontSize: normalize(15),
            fontWeight: '600',
            color: '#B0B7C3',
            marginBottom: normalizeHeight(8),
          }}>Date and time</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{
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
            }}>
              <Text style={{ fontSize: normalizeHeight(15), color: '#F2F4F8', fontWeight: '500' }}>
                March 5, 2026
              </Text>
            </View>
            <View style={{
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
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <Text style={{ fontSize: normalizeHeight(15), color: '#F2F4F8', fontWeight: '500' }}>
                  11:05 AM
                </Text>
              </View>
            </View>
          </View>
             
        </View>


        {/* Render the current workout list */}
        <CurrentWorkoutList workout={workoutRef.current} />

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
        <Modal visible={showAddExercise} transparent animationType="slide" onRequestClose={() => setShowAddExercise(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <AddExerciseModal onClose={() => setShowAddExercise(false)} 
                addSetsForExercise = {addSetsForExercise}/>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2238',
    paddingHorizontal:normalizeWidth(16)
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
