import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { routines } from '../data/dummy/routines';
import { databaseController } from '../data/controllers';
import { BackdatedWorkoutRoutineInput } from './BackdatedWorkoutRoutineInput';

type SetInput = { [key: string]: string };
type SetInputs = { [exerciseId: string]: SetInput[] };

export const BackdatedWorkoutRoutine = ({ onEnd }: { onEnd: () => void }) => {
    const [showDateTimePicker, setShowDateTimePicker] = useState(true);
    // Autofill for testing: 5/6/2022 15:34
    const [month, setMonth] = useState('5');
    const [day, setDay] = useState('6');
    const [year, setYear] = useState('2022');
    const [hour, setHour] = useState('15');
    const [minute, setMinute] = useState('34');
    const [workoutDateTime, setWorkoutDateTime] = useState<number | null>(null);
    const [selectedRoutineId, setSelectedRoutineId] = useState<string | null>(null);
    const [setInputs, setSetInputs] = useState<SetInputs>({});

    const workoutRef = useRef({})

    useEffect(() => {
        workoutRef.current = {
            startTime: workoutDateTime,
            endTime: workoutDateTime,
            exercises: []
        }
    }, [workoutDateTime])

    const addSetsForExercise = (exercise, params, loggedData) => {
        const workout = workoutRef.current;
        const firstSetStartTime = workout.endTime;
        const defaultSetTime = 60 * 1000;
        const numberOfSets = params.numberOfSets;
        const restTimeBetweenSets = params.restTimeBetweenSets;
        for (let i = 0; i < numberOfSets; i++) {
            const setExercise = { id: exercise.id };
            setExercise.startTime = firstSetStartTime + defaultSetTime * (i) + restTimeBetweenSets * (i);
            setExercise.endTime = setExercise.startTime + defaultSetTime;
            setExercise.loggedData = loggedData[i];
            workoutRef.current.exercises.push(setExercise);
        }
        workoutRef.current.endTime = firstSetStartTime + numberOfSets * (defaultSetTime) +
            numberOfSets * (restTimeBetweenSets);
        console.log("ckck ref after adding sets ", workoutRef.current)
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


    return (
        <>
            {/* Date/Time Picker Modal */}
            <Modal visible={showDateTimePicker} animationType="slide" transparent={true}>
                <View style={styles.dateTimeModalOverlay}>
                    <View style={styles.dateTimeModal}>
                        <Text style={styles.dateTimeModalTitle}>When did this workout happen?</Text>
                        {/* Date Section */}
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
                        {/* Time Section */}
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
                            <Text style={styles.confirmButtonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* Routine selection step */}
            {!showDateTimePicker && !selectedRoutineId && (
                <View style={styles.container}>
                    <Text style={styles.subtitle}>Workout start time: {workoutDateTime ? new Date(workoutDateTime).toLocaleString() : 'Not set'}</Text>
                    <Text style={styles.title}>Select a Routine</Text>
                    {routines.map(routine => (
                        <TouchableOpacity
                            key={routine.id}
                            style={styles.routineButton}
                            onPress={() => handleRoutineSelect(routine.id)}
                        >
                            <Text style={styles.routineButtonText}>{routine.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
            {/* Main Routine Workout Logging Interface */}
            {!showDateTimePicker && selectedRoutineId && (
                <BackdatedWorkoutRoutineInput
                    selectedRoutineId={selectedRoutineId}
                    setInputs={setInputs}
                    handleSetInputChange={handleSetInputChange}
                    addSetsForExercise={addSetsForExercise}
                    onDiscard={() => setSelectedRoutineId(null)}
                    workoutDateTime={workoutDateTime}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
        textAlign: 'center',
        color: '#1a1a1a',
    },
    subtitle: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        marginBottom: 24,
    },
    dateTimeModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateTimeModal: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        width: '90%',
        maxWidth: 400,
    },
    dateTimeModalTitle: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 24,
        textAlign: 'center',
        color: '#333',
    },
    sectionLabel: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        marginTop: 16,
        color: '#333',
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
        color: '#666',
    },
    smallInput: {
        borderWidth: 1,
        borderColor: '#d0d0d0',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
        width: '100%',
        minWidth: 60,
        color: '#333',
    },
    confirmButton: {
        backgroundColor: '#007AFF',
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
    routineButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginVertical: 8,
    },
    routineButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});
