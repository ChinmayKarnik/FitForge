import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Alert, Image, BackHandler, ScrollView } from 'react-native';
import { routines } from '../data/dummy/routines';
import { databaseController } from '../data/controllers';
import { BackdatedWorkoutRoutineInput } from './BackdatedWorkoutRoutineInput';
import { SelectRoutineLive } from './SelectRoutineLive';
import DateSelectionModal from './DateSelectionModal.tsx';
import TimeSelectionModal from './TimeSelectionModal';
import { normalizeHeight, normalizeWidth, normalize } from '../utils/normalize';
import white_left_arrow from '../images/white-left-arrow.png';

type SetInput = { [key: string]: string };
type SetInputs = { [exerciseId: string]: SetInput[] };

// Helper function to get current time
const getCurrentTime = () => {
    const currentTime = new Date();
    const hours24 = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const isAm = !!(hours24 < 12);
    const hours12 = hours24 === 0 ? 12 : hours24 > 12 ? hours24 - 12 : hours24;
    return { hours: hours12, minutes, isAm };
};

export const BackdatedWorkoutRoutine = ({ onEnd, onBackPress, navigation }: { onEnd: () => void; onBackPress?: () => void; navigation?: any }) => {
    const [showDateTimePicker, setShowDateTimePicker] = useState(true);
    const [showDateModal, setShowDateModal] = useState(false);
    const [showTimeModal, setShowTimeModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(getCurrentTime());
    const [workoutDateTime, setWorkoutDateTime] = useState<number | null>(null);
    const [selectedRoutineId, setSelectedRoutineId] = useState<string | null>(null);
    const [setInputs, setSetInputs] = useState<SetInputs>({});

    const workoutRef = useRef({})

    // Format selected date string
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

    const selectedTimeString = `${selectedTime.hours}:${parseInt(String(selectedTime.minutes)) < 10 ? '0' : ''}${parseInt(String(selectedTime.minutes))} ${selectedTime.isAm ? 'AM' : 'PM'}`;

    const onConfirmDate = (date) => {
        setSelectedDate(date);
    };

    const onConfirmTime = ({ hours, minutes, isAm }) => {
        const hoursInt = parseInt(String(hours));
        const minutesInt = parseInt(String(minutes));
        
        let hours24 = hoursInt;
        if (isAm && hoursInt === 12) {
            hours24 = 0;
        } else if (!isAm && hoursInt !== 12) {
            hours24 = hoursInt + 12;
        }
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDateOnly = new Date(selectedDate);
        selectedDateOnly.setHours(0, 0, 0, 0);
        
        const isToday = selectedDateOnly.getTime() === today.getTime();
        
        if (!isToday) {
            setSelectedTime({ hours: hoursInt, minutes: minutesInt, isAm });
        } else {
            const currentNow = new Date();
            const currentHour24 = currentNow.getHours();
            const currentMinute = currentNow.getMinutes();
            
            if (hours24 < currentHour24 || (hours24 === currentHour24 && minutesInt <= currentMinute)) {
                setSelectedTime({ hours: hoursInt, minutes: minutesInt, isAm });
            } else {
                setSelectedTime(getCurrentTime());
            }
        }
    };

    const handleBackPress = () => {
        onEnd();
        if (onBackPress) {
            onBackPress();
        }
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            onEnd();
            return true;
        });
        return () => backHandler.remove();
    }, [onEnd]);

    const addSetsForExercise = (exercise: any, params: any, loggedData: any) => {
        const workout = workoutRef.current;
        const firstSetStartTime = workout.endTime;
        const defaultSetTime = 60 * 1000;
        const numberOfSets = params.numberOfSets;
        const restTimeBetweenSets = params.restTimeBetweenSets;
        for (let i = 0; i < numberOfSets; i++) {
            const setExercise: any = { exerciseId: exercise.id };
            setExercise.startTime = firstSetStartTime + defaultSetTime * (i) + restTimeBetweenSets * (i);
            setExercise.endTime = setExercise.startTime + defaultSetTime;
            setExercise.loggedData = loggedData[i];
            workoutRef.current.exercises.push(setExercise);
        }
        workoutRef.current.endTime = firstSetStartTime + numberOfSets * (defaultSetTime) +
            numberOfSets * (restTimeBetweenSets);
        console.log("ckck ref after adding sets ", workoutRef.current)
    }

    const submitWorkout = () => {
        workoutRef.current.routineId = selectedRoutineId;
        databaseController.addWorkout(workoutRef.current);
    }

    const handleRoutineSelect = (id: string) => {
        setSelectedRoutineId(id);
        const routine = routines.find(r => r.id === id);
        if (routine) {
            const inputs: SetInputs = {};
            routine.exercises.forEach(ex => {
                const exercise = databaseController.getExerciseById(ex.id);
                if (exercise) {
                    const allParams = [
                        ...(exercise.requiredParameters || []),
                        ...(exercise.optionalParameters || []),
                    ];
                    inputs[ex.id] = [];
                    for (let i = 0; i < ex.sets; i++) {
                        const setInput: SetInput = {};
                        allParams.forEach(param => {
                            setInput[param.name] = '';
                        });
                        inputs[ex.id].push(setInput);
                    }
                }
            });
            setSetInputs(inputs);
        }
    };

    const handleSetInputChange = (exerciseId: string, setIdx: number, field: keyof SetInput, value: string) => {
        setSetInputs(prev => {
            const updated = { ...prev };
            const exerciseSets = updated[exerciseId] ? [...updated[exerciseId]] : [];
            const setCopy = { ...exerciseSets[setIdx], [field]: value };
            exerciseSets[setIdx] = setCopy;
            updated[exerciseId] = exerciseSets;
            return updated;
        });
    };

    const handleSetTap = (exerciseId: string, setIdx: number) => {
        setSetInputs(prev => {
            const updated = { ...prev };
            const exerciseSets = updated[exerciseId] ? [...updated[exerciseId]] : [];
            const setCopy = { ...exerciseSets[setIdx] };
            
            // Set hardcoded values: 3 reps, 2 kg weight
            setCopy['Reps'] = '3';
            setCopy['Weight'] = '2';
            
            exerciseSets[setIdx] = setCopy;
            updated[exerciseId] = exerciseSets;
            return updated;
        });
    };

    if (!selectedRoutineId) {
        return <SelectRoutineLive onSelectRoutine={setSelectedRoutineId} onEndWorkout={onEnd} />;
    }

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
                                    {selectedTimeString}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Selected Routine Section */}
                <View style={{ marginTop: normalizeHeight(20) }}>
                    <Text style={{
                        fontSize: normalize(15),
                        fontWeight: '600',
                        color: '#B0B7C3',
                        marginBottom: normalizeHeight(8),
                    }}>Routine</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'rgba(42, 50, 75, 1)',
                        borderRadius: normalizeHeight(12),
                        borderWidth: 1,
                        borderColor: 'rgba(68, 75, 95, 1)',
                        paddingVertical: normalizeHeight(12),
                        paddingHorizontal: normalizeWidth(16),
                    }}>
                        <Text style={{ fontSize: normalizeHeight(15), color: '#F2F4F8', fontWeight: '500' }}>
                            {databaseController.getRoutineById(selectedRoutineId)?.name || 'Unknown Routine'}
                        </Text>
                    </View>
                </View>
                <View style={{ marginTop: normalizeHeight(20), flex: 1 }}>
                    <Text style={{
                        fontSize: normalize(15),
                        fontWeight: '600',
                        color: '#B0B7C3',
                        marginBottom: normalizeHeight(8),
                    }}>Exercises</Text>
                    <ScrollView style={{ flex: 1 }}>
                        {databaseController.getRoutineById(selectedRoutineId)?.exercises.map((exerciseInRoutine, exerciseIdx) => {
                            const exercise = databaseController.getExerciseById(exerciseInRoutine.id);
                            const allParams = [
                                ...(exercise?.requiredParameters || []),
                                ...(exercise?.optionalParameters || []),
                            ];
                            return (
                                <View key={exerciseInRoutine.id} style={{ marginBottom: normalizeHeight(12) }}>
                                    <View style={{
                                        backgroundColor: 'rgba(42, 50, 75, 1)',
                                        borderWidth: normalize(1),
                                        borderColor: '#404359',
                                        borderRadius: normalize(12),
                                    }}>
                                        <View style={{
                                            backgroundColor: '#1b1f35',
                                            borderTopLeftRadius: normalize(12),
                                            borderTopRightRadius: normalize(12),
                                            paddingTop: normalizeHeight(8),
                                            paddingLeft: normalizeWidth(12),
                                            paddingBottom:normalizeHeight(8),
                                            borderBottomWidth: normalize(1),
                                            borderBottomColor: '#44475d',
                                        }}>
                                        <Text style={{
                                            color: "#d6d3de",
                                            fontSize: normalizeHeight(14),
                                            fontWeight: '600',
                                        }}>
                                           
                                            {exercise?.name || 'Unknown Exercise'}
                                        </Text>
                                        
                                      </View>
                                        {Array.from({ length: exerciseInRoutine.sets }).map((_, setIdx) => {
                                            const setData = setInputs[exerciseInRoutine.id]?.[setIdx];
                                            const hasData = setData && Object.values(setData).some(val => val);
                                            const dataDisplay = hasData 
                                                ? Object.entries(setData).map(([key, val]) => `${val}${key === 'Reps' ? ' reps' : ' kg'}`).join(', ')
                                                : '';
                                            
                                            return (
                                                <TouchableOpacity
                                                    key={`${exerciseInRoutine.id}-${setIdx}`}
                                                    onPress={() => handleSetTap(exerciseInRoutine.id, setIdx)}
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        paddingVertical: normalizeHeight(10),
                                                        paddingHorizontal: normalizeWidth(8),
                                                        marginBottom: setIdx < exerciseInRoutine.sets - 1 ? 0 : 0,
                                                        borderTopWidth: setIdx > 0 ? normalize(1) : 0,
                                                        borderTopColor: '#404359',
                                                    }}
                                                >
                                                    <Text style={{
                                                        color: "#c6cbda",
                                                        fontSize: normalize(14),
                                                        fontWeight: '500',
                                                    }}>
                                                        Set {setIdx + 1}
                                                    </Text>
                                                    <View style={{flex:1}} />
                                                    <Image
                                                        source={require('../images/white-right-arrow.png')}
                                                        style={{
                                                            width: normalizeWidth(12),
                                                            height: normalizeWidth(12),
                                                            resizeMode: 'contain',
                                                            tintColor: '#c6cbda',
                                                        }}
                                                    />
                                                     
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>

                {/*
                Complete Workout Button
                <TouchableOpacity style={{
                    alignItems: 'center',
                    paddingVertical: normalizeHeight(12),
                    borderWidth: normalize(1),
                    borderColor: '#4ECDC4',
                    backgroundColor: '#1a3a3a',
                    borderRadius: normalize(12),
                    marginTop: normalizeHeight(12),
                    marginBottom: normalizeHeight(20),
                }} onPress={submitWorkout}>
                    <Text style={{
                        fontSize: normalize(16),
                        fontWeight: '600',
                        color: '#4ECDC4',
                    }}>Complete Workout</Text>
                </TouchableOpacity>
                */}
            </View>
            <DateSelectionModal
                visible={showDateModal}
                onClose={() => setShowDateModal(false)}
                selectedDate={selectedDate}
                onConfirmDate={onConfirmDate}
            />
            <TimeSelectionModal
                visible={showTimeModal}
                onClose={() => setShowTimeModal(false)}
                selectedTimeInit={selectedTime}
                onConfirmTime={onConfirmTime}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c2238',
        paddingHorizontal: normalizeWidth(16),
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
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#F2F4F8',
    },
    subtitle: {
        fontSize: 16,
        color: '#A9B1C2',
        textAlign: 'center',
        marginBottom: 24,
    },
    routineButton: {
        backgroundColor: '#2f4880',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#4e68a6',
    },
    routineButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
