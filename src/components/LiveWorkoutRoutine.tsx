

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Switch, Image } from 'react-native';
import { SelectRoutineLive } from './SelectRoutineLive';
import { databaseController } from '../data';
import { TimerComponent } from './TimerComponent';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import white_plus from '../images/white-plus.png';
import white_donut from '../images/white-donut.png';

export const LiveWorkoutRoutine = ({ onEndWorkout }: { onEndWorkout: () => void }) => {
   const [showFinishModal, setShowFinishModal] = useState(false);
  const [exerciseParams, setExerciseParams] = useState<Record<string, any>>({});
  const [selectedRoutineId, setSelectedRoutineId] = useState<string | null>(null);
  const routine = databaseController.getRoutineById(selectedRoutineId);
  const [seconds, setSeconds] = useState(0);
  const startTimeRef = useRef(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [activeExercise,setActiveExercise] =useState(null);
  const [activeExerciseStartTime, setActiveExerciseStartTime] = useState<number | null>(null);
  const [isExerciseInProgress,setIsExerciseInProgress] = useState(false);
  const nextExerciseRef = useRef(null);
  const nextExerciseTime = useRef(null);
  const workout = useRef({
    startTime: startTimeRef.current,
    endTime: startTimeRef.current,
    exercises: []
  });

  const getNthExerciseInRoutine = ( n: number) => {
    const arr = [...routine.exercises];
    let doneExercises = 0;
    for(let i=0;i<arr.length;i++){
      if(doneExercises + arr[i].sets >=n){
        return arr[i];
      }
      doneExercises += arr[i].sets;
    }
    return null;
  }

  useEffect(()=>{
      if(selectedRoutineId){
        const routine = databaseController.getRoutineById(selectedRoutineId);
        console.log("ckck routine is ",routine)
        nextExerciseRef.current = routine.exercises[0];
        nextExerciseTime.current = startTimeRef.current;
      }
  },[selectedRoutineId]);

  useEffect(() => {
    if (selectedRoutineId) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [selectedRoutineId]);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleEndWorkout = () => {
    workout.current.endTime = Date.now();
    console.log('Final workout:', workout.current);
    onEndWorkout();
  };

  if (!selectedRoutineId) {
    return <SelectRoutineLive onSelectRoutine={setSelectedRoutineId} />;
  }

  // UI for when no active workout is running
  // (isExerciseInProgress is false)
  let nextExerciseMessage = null;
  let showCountdown = false;
  let countdownSeconds = 0;
  if (!isExerciseInProgress && nextExerciseTime.current && typeof nextExerciseTime.current === 'number') {
    const now = Date.now();
    const nextTime = nextExerciseTime.current;
    if (nextTime > now) {
      // Case 1: next workout time is in the future
      countdownSeconds = Math.floor((nextTime - now) / 1000);
      showCountdown = true;
      nextExerciseMessage = `Start the next exercise in ${countdownSeconds} seconds`;
    } else {
      // Case 2: next workout time is before now
      nextExerciseMessage = 'Start the next exercise right now';
    }
  }

  const handleStartExercise = () => {
    setIsExerciseInProgress(true);
    setActiveExercise(nextExerciseRef.current);
    nextExerciseRef.current = null;
    setActiveExerciseStartTime(Date.now());
    nextExerciseTime.current = null;
  };

  const handleFinishExercise = (params) => {
   
    const startTime = activeExerciseStartTime;
    const endTime = Date.now();
   
    workout.current = {
      ...workout.current,
      exercises:[
        ...workout.current.exercises,
        {
          id: activeExercise.id,
          startTime: startTime,
          endTime: endTime,
          loggedData: params
        }
      ],
      endTime: endTime
    };
    nextExerciseRef.current = getNthExerciseInRoutine(workout.current.exercises.length+1) 
    nextExerciseTime.current = endTime + getNthExerciseInRoutine(workout.current.exercises.length).rest * 1000 
     setIsExerciseInProgress(false);
    setActiveExercise(null);
    setShowFinishModal(false)
     setExerciseParams({});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Live Workout</Text>
      </View>

      <TimerComponent formatTime={formatTime} elapsedTime={seconds} />

      { !isExerciseInProgress && (
        nextExerciseRef.current ? (
          nextExerciseMessage && (
            <View style={{ alignItems: 'center', marginVertical: normalizeHeight(16) }}>
              <Text style={styles.nextExerciseText}>{nextExerciseMessage}</Text>
              <Text style={styles.exerciseNameText}>{nextExerciseRef.current.name}</Text>
              <Text style={styles.setNumberText}>Set {workout.current.exercises.length + 1}</Text>
              {showCountdown && (
                <Text style={styles.countdownText}>{countdownSeconds}</Text>
              )}
            </View>
          )
        ) : (
          <View style={{ alignItems: 'center', marginVertical: normalizeHeight(16) }}>
            <Text style={styles.finishedText}>Your workout has finished.</Text>
          </View>
        )
      )}
      {isExerciseInProgress && activeExercise && (
        <View style={styles.exerciseInfoContainer}>
          <Text style={styles.currentlyPerformingText}>Currently Performing:</Text>
          <Text style={styles.exerciseNameText}>{activeExercise.name}</Text>
          <Text style={styles.setNumberText}>Set {workout.current.exercises.length + 1}</Text>
        </View>
      )}
      
      {!isExerciseInProgress && nextExerciseRef.current && (
        <TouchableOpacity style={styles.startExerciseButton} onPress={handleStartExercise}>
          <Image
            source={white_plus}
            style={styles.startExerciseImage}
          />
          <Text style={styles.buttonText}>Start Exercise</Text>
        </TouchableOpacity>
      )}
      {isExerciseInProgress && (
        <TouchableOpacity style={styles.finishExerciseButton} onPress={() => setShowFinishModal(true)}>
          <Image
            source={white_donut}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Finish Exercise</Text>
        </TouchableOpacity>
      )}
      <Modal
        visible={showFinishModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFinishModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{ backgroundColor: '#fff', padding: 24, borderRadius: 12, width: '85%' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Enter Exercise Details</Text>
            {activeExercise && (
              <>
                <Text style={{ fontSize: 18, color: '#007AFF', fontWeight: 'bold', marginBottom: 2 }}>{activeExercise.name}</Text>
                <Text style={{ fontSize: 16, color: '#333', marginBottom: 12 }}>Set {workout.current.exercises.length + 1}</Text>
                {(() => {
                  const exercise = databaseController.getExerciseById(activeExercise.id);
                  const allParams = [...(exercise?.requiredParameters || []), ...(exercise?.optionalParameters || [])];
                  return allParams.map((param, index) => (
                    <View key={param.name} style={{ marginBottom: 12 }}>
                      <Text style={{ fontSize: 16, marginBottom: 4 }}>{param.name.charAt(0).toUpperCase() + param.name.slice(1)}{exercise?.requiredParameters?.find(p => p.name === param.name) ? ' *' : ''}</Text>
                      {param.type === 'boolean' ? (
                        <Switch
                          value={exerciseParams[param.name] || false}
                          onValueChange={(value) => setExerciseParams(p => ({ ...p, [param.name]: value }))}
                        />
                      ) : (
                        <TextInput
                          placeholder={`Enter ${param.name}`}
                          placeholderTextColor="#000"
                          keyboardType={param.type === 'number' ? 'numeric' : 'default'}
                          value={exerciseParams[param.name] || ''}
                          onChangeText={(text) => setExerciseParams(p => ({ ...p, [param.name]: param.type === 'number' ? (text ? parseFloat(text) : '') : text }))}
                          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8 }}
                        />
                      )}
                    </View>
                  ));
                })()}
              </>
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={[styles.endButton, { backgroundColor: '#007AFF', width: '48%', marginBottom: 0 }]}
                onPress={() => handleFinishExercise(exerciseParams)}
              >
                <Text style={styles.endButtonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.endButton, { backgroundColor: '#aaa', width: '48%', marginBottom: 0 }]}
                onPress={() => setShowFinishModal(false)}
              >
                <Text style={styles.endButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.endWorkoutButton} onPress={handleEndWorkout}>
        <Image
          source={white_donut}
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}>End Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#1c2238',
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
  headerText: {
    fontSize: 22,
    letterSpacing: 1,
    fontWeight: '700',
    color: '#fefefe',
  },
  exerciseInfoContainer: {
    marginTop: normalizeHeight(30),
    alignItems: 'center',
    marginBottom: normalize(40),
  },
  currentlyPerformingText: {
    fontSize: normalize(18),
    fontWeight: '500',
    lineHeight: normalize(20),
    letterSpacing: normalize(0.2),
    color: '#A9B1C2',
  },
  exerciseNameText: {
    fontSize: normalize(28),
    fontWeight: '600',
    lineHeight: normalize(34),
    letterSpacing: normalize(0.3),
    color: '#F2F4F8',
    marginTop: normalizeHeight(10),
  },
  setNumberText: {
    fontSize: normalize(16),
    color: '#A9B1C2',
    marginTop: normalizeHeight(4),
  },
  nextExerciseText: {
    fontSize: normalize(18),
    color: '#A9B1C2',
    marginBottom: normalizeHeight(8),
  },
  countdownText: {
    fontSize: normalize(32),
    color: '#4ECDC4',
    fontWeight: 'bold',
    marginTop: normalizeHeight(8),
  },
  finishedText: {
    fontSize: normalize(20),
    color: '#F2F4F8',
    fontWeight: 'bold',
    marginBottom: normalizeHeight(8),
  },
  startExerciseButton: {
    alignItems: 'center',
    paddingVertical: normalizeHeight(12),
    marginHorizontal: normalizeWidth(24),
    borderWidth: normalize(1),
    borderColor: '#4e68a6',
    backgroundColor: '#2f4880',
    borderRadius: normalize(12),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  finishExerciseButton: {
    alignItems: 'center',
    paddingVertical: normalizeHeight(12),
    marginHorizontal: normalizeWidth(24),
    borderWidth: normalize(1),
    borderColor: '#4e68a6',
    backgroundColor: '#2f4880',
    borderRadius: normalize(12),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  endWorkoutButton: {
    alignItems: 'center',
    paddingVertical: normalizeHeight(12),
    marginHorizontal: normalizeWidth(24),
    borderWidth: normalize(1),
    borderColor: '#dc6c72',
    backgroundColor: '#ad2126',
    borderRadius: normalize(12),
    marginTop: normalize(12),
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: normalizeHeight(32),
  },
  buttonImage: {
    height: normalizeHeight(12),
    width: (138.0 / 140.0) * normalize(12),
    aspectRatio: (140.0 / 138.0),
    marginRight: normalizeWidth(6),
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
});
