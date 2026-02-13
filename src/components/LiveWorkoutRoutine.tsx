

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Switch } from 'react-native';
import { SelectRoutineLive } from './SelectRoutineLive';
import { databaseController } from '../data';

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
      <Text style={styles.title}>Live Workout (Routine)</Text>
      <Text style={styles.timer}>{formatTime(seconds)}</Text>
      { !isExerciseInProgress && (
        nextExerciseRef.current ? (
          nextExerciseMessage && (
            <View style={{ alignItems: 'center', marginVertical: 16 }}>
              <Text style={{ fontSize: 18, color: '#333', marginBottom: 8 }}>{nextExerciseMessage}</Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#007AFF', marginBottom: 4 }}>{nextExerciseRef.current.name}</Text>
              <Text style={{ fontSize: 16, color: '#333', marginBottom: 4 }}>Set {workout.current.exercises.length + 1}</Text>
              {showCountdown && (
                <Text style={{ fontSize: 32, color: '#007AFF', fontWeight: 'bold' }}>{countdownSeconds}</Text>
              )}
            </View>
          )
        ) : (
          <View style={{ alignItems: 'center', marginVertical: 16 }}>
            <Text style={{ fontSize: 20, color: '#333', fontWeight: 'bold', marginBottom: 8 }}>Your workout has finished.</Text>
          </View>
        )
      )}
      {isExerciseInProgress && activeExercise && (
        <View style={{ alignItems: 'center', marginVertical: 16 }}>
          <Text style={{ fontSize: 18, color: '#333', marginBottom: 8 }}>Doing exercise right now</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#007AFF', marginBottom: 4 }}>{activeExercise.name}</Text>
          <Text style={{ fontSize: 16, color: '#333' }}>Set {workout.current.exercises.length + 1}</Text>
        </View>
      )}
      <View style={{ flex: 1 }} />
      {!isExerciseInProgress && nextExerciseRef.current && (
        <TouchableOpacity style={styles.endButton} onPress={handleStartExercise}>
          <Text style={styles.endButtonText}>Start Exercise</Text>
        </TouchableOpacity>
      )}
      {isExerciseInProgress && (
        <TouchableOpacity style={styles.endButton} onPress={() => setShowFinishModal(true)}>
          <Text style={styles.endButtonText}>Finish Exercise</Text>
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
      <TouchableOpacity style={styles.endButton} onPress={handleEndWorkout}>
        <Text style={styles.endButtonText}>End Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  timer: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
    marginVertical: 24,
    letterSpacing: 2,
  },
  endButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 32,
    width: '90%',
    alignSelf: 'center',
  },
  endButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
});
