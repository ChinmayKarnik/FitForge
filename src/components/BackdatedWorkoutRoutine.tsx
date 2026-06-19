import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Alert, Image, BackHandler, ScrollView } from 'react-native';
import { databaseController } from '../data/controllers';
import { BackdatedWorkoutRoutineInput } from './BackdatedWorkoutRoutineInput';
import { SelectRoutineLive } from './SelectRoutineLive';
import DateSelectionModal from './DateSelectionModal.tsx';
import TimeSelectionModal from './TimeSelectionModal';
import { normalizeHeight, normalizeWidth, normalize, normalizeF } from '../utils/normalize';
import white_left_arrow from '../images/white-left-arrow.png';
import white_donut from '../images/white-donut.png';
import calendar from '../images/calendar.png';
import clock_thick_white from '../images/clock-thick-white.png';
import Svg, { Defs, LinearGradient, Stop, Rect, Path, Circle } from 'react-native-svg';
import { LogSetsModal } from './LogSetsModal.tsx';
import EndActiveWorkoutModal from './EndActiveWorkoutModal';
import AreYouSureModal from './AreYouSureModal';

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
    const [showDateModal, setShowDateModal] = useState(false);
    const [showTimeModal, setShowTimeModal] = useState(false);
    const [showEndModal, setShowEndModal] = useState(false);
    const [showBackConfirm, setShowBackConfirm] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(getCurrentTime());
    const [workoutDateTime, setWorkoutDateTime] = useState<number | null>(null);
    const [selectedRoutineId, setSelectedRoutineId] = useState<string | null>(null);
    const [logSetModalState,setLogSetModalState] = useState<{visible:boolean;exerciseId?:string;setIdx?:number;initialData?:Record<string,any>|null}>({visible:false})
    const [isListAtBottom, setIsListAtBottom] = useState(false);
    const workoutRef = useRef({})

    // State variable to force re-render
    const [_, setForceRerender] = useState(0);

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

    const onLogData = (setIdx, exerciseId, loggedData)=>{
        const exercisesWithId = workoutRef.current.exercises.filter(ex => ex.exerciseId === exerciseId);
        if (exercisesWithId && exercisesWithId[setIdx]) {
            exercisesWithId[setIdx].loggedData = loggedData;
        }
        console.log('ckck onLogData workout ref', workoutRef.current);
        setForceRerender(x => x + 1);
    }

    const doLeave = () => {
        onEnd();
        if (onBackPress) onBackPress();
    };

    const handleBackPress = () => {
        setShowBackConfirm(true);
    };

    const handleEndWorkout = () => {
        setShowEndModal(true);
    };

    useEffect(()=>{
        // Convert selectedTime (12-hour) to 24-hour
        let hours24 = selectedTime.hours;
        if (selectedTime.isAm && selectedTime.hours === 12) {
          hours24 = 0;
        } else if (!selectedTime.isAm && selectedTime.hours !== 12) {
          hours24 = selectedTime.hours + 12;
        }
        // Build a timestamp in millis from selectedDate + selectedTime
        const dt = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          hours24,
          selectedTime.minutes,
          0,
          0
        );
        setWorkoutDateTime(dt.getTime());
      },[selectedDate, selectedTime])

    useEffect(() => {
        workoutRef.current = {
            startTime: workoutDateTime,
            endTime: workoutDateTime,
            exercises: []
        }
    }, [workoutDateTime])

    useEffect(()=>{
        if(selectedRoutineId){
            workoutRef.current = {
                ...workoutRef.current,
                routineId: selectedRoutineId,
            };
        }
    }, [selectedRoutineId]);

    
    

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            setShowBackConfirm(true);
            return true;
        });
        return () => backHandler.remove();
    }, []);

    const handleListScroll = (event: any) => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
        setIsListAtBottom(contentOffset.y + layoutMeasurement.height >= contentSize.height - 16);
    };

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
        workoutRef.current.duration = workoutRef.current.endTime - workoutRef.current.startTime;
        console.log("ckck ref after adding sets ", workoutRef.current)
    }

    useEffect(()=>{
        if(selectedRoutineId){
            const routine = databaseController.getRoutineById(selectedRoutineId);
            if (routine) {
                routine.exercises.forEach(ex => {
                    const params = {
                        numberOfSets: ex.sets,
                        restTimeBetweenSets: Number(ex.rest) * 1000
                    };
                    const loggedData = Array(params.numberOfSets).fill({});
                    addSetsForExercise(ex, params, loggedData);
                });
            }
        }
    },[selectedRoutineId])
    

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
                            <Image
                                source={calendar}
                                style={{ height: normalizeHeight(17), width: normalizeHeight(17) * (410.0 / 420.0), tintColor: '#C5CADE', marginRight: normalizeWidth(7) }}
                                resizeMode="contain"
                            />
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
                            }}
                        >
                            <Image
                                source={clock_thick_white}
                                style={{ height: normalizeHeight(17), width: normalizeHeight(17) * (453.0 / 448.0), tintColor: '#C5CADE', marginRight: normalizeWidth(7) }}
                                resizeMode="contain"
                            />
                            <Text style={{ fontSize: normalizeHeight(15), color: '#F2F4F8', fontWeight: '500' }}>
                                {selectedTimeString}
                            </Text>
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
                    <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    onScroll={handleListScroll}
                    scrollEventThrottle={16}
                    >
                        {databaseController.getRoutineById(selectedRoutineId)?.exercises.map((exerciseInRoutine) => {
                            const exercise = databaseController.getExerciseById(exerciseInRoutine.id);
                            const allParams = [
                                ...(exercise?.requiredParameters || []),
                                ...(exercise?.optionalParameters || []),
                            ];

                            const getLoggedDataString = (loggedData: any): string => {
                                const parts: string[] = [];
                                const repsParam = allParams.find(p => p.name === 'Reps');
                                const weightParam = allParams.find(p => p.name === 'Weight');
                                const timeParam = allParams.find(p => p.name === 'Time');
                                if (repsParam && loggedData['Reps'] !== undefined) {
                                    const v = loggedData['Reps'];
                                    parts.push(`${v} ${v === 1 ? 'REP' : 'REPS'}`);
                                }
                                if (timeParam && loggedData['Time'] !== undefined) {
                                    const v = loggedData['Time'];
                                    const mins = Math.floor(v / 60);
                                    const secs = v % 60;
                                    if (mins === 0) parts.push(`${secs} ${secs === 1 ? 'sec' : 'secs'}`);
                                    else if (secs === 0) parts.push(`${mins} ${mins === 1 ? 'min' : 'mins'}`);
                                    else parts.push(`${mins} ${mins === 1 ? 'min' : 'mins'} ${secs} ${secs === 1 ? 'sec' : 'secs'}`);
                                }
                                if (weightParam && loggedData['Weight']) {
                                    parts.push(`${loggedData['Weight']} KG`);
                                }
                                return parts.join(' · ');
                            };

                            return (
                                <View key={exerciseInRoutine.id} style={{ marginBottom: normalizeHeight(12) }}>
                                    <View style={{
                                        backgroundColor: 'rgba(30, 36, 56, 1)',
                                        borderWidth: normalize(1),
                                        borderColor: '#404359',
                                        borderRadius: normalize(12),
                                        overflow: 'hidden',
                                    }}>
                                        {/* Card header */}
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingVertical: normalizeHeight(10),
                                            paddingHorizontal: normalizeWidth(12),
                                            borderBottomWidth: normalize(1),
                                            borderBottomColor: '#353b52',
                                        }}>
                                            <View style={{
                                                width: normalize(32),
                                                height: normalize(32),
                                                backgroundColor: 'rgba(50, 60, 95, 0.8)',
                                                borderRadius: normalize(8),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginRight: normalizeWidth(10),
                                            }}>
                                                <Svg width={normalize(20)} height={normalize(14)} viewBox="0 0 25 14">
                                                    <Path
                                                        d="M0 7 L6 7 L9 1 L12 13 L15 7 L25 7"
                                                        stroke="#5b9cf6"
                                                        strokeWidth="1.8"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </Svg>
                                            </View>
                                            <Text style={{
                                                color: '#f0f2f8',
                                                fontSize: normalize(15),
                                                fontWeight: '700',
                                                flex: 1,
                                            }}>
                                                {exercise?.name || 'Unknown Exercise'}
                                            </Text>
                                            <View style={{
                                                borderWidth: normalize(1),
                                                borderColor: '#5a6480',
                                                borderRadius: normalize(6),
                                                paddingHorizontal: normalizeWidth(8),
                                                paddingVertical: normalizeHeight(3),
                                            }}>
                                                <Text style={{
                                                    color: '#a0aac0',
                                                    fontSize: normalize(11),
                                                    fontWeight: '600',
                                                }}>
                                                    {exerciseInRoutine.sets} SETS
                                                </Text>
                                            </View>
                                        </View>

                                        {/* Set rows */}
                                        {Array.from({ length: exerciseInRoutine.sets }).map((_, setIdx) => {
                                            const loggedDataForSet = (() => {
                                                const exercisesWithId = ((workoutRef.current as any).exercises || []).filter((ex: any) => ex.exerciseId === exerciseInRoutine.id);
                                                const loggedData = exercisesWithId[setIdx]?.loggedData;
                                                if (loggedData && Object.keys(loggedData).length === 0) return null;
                                                return loggedData || null;
                                            })();
                                            const isLogged = loggedDataForSet !== null;

                                            return (
                                                <TouchableOpacity
                                                    key={`${exerciseInRoutine.id}-${setIdx}`}
                                                    onPress={() => {
                                                        setLogSetModalState({
                                                            visible: true,
                                                            exerciseId: exerciseInRoutine.id,
                                                            setIdx,
                                                            initialData: loggedDataForSet,
                                                        });
                                                    }}
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        paddingVertical: normalizeHeight(10),
                                                        paddingHorizontal: normalizeWidth(12),
                                                        borderTopWidth: setIdx > 0 ? normalize(1) : 0,
                                                        borderTopColor: '#353b52',
                                                    }}
                                                >
                                                    {/* State circle */}
                                                    {isLogged ? (
                                                        <View style={{
                                                            width: normalize(20),
                                                            height: normalize(20),
                                                            borderRadius: normalize(10),
                                                            backgroundColor: '#03a254',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            marginRight: normalizeWidth(12),
                                                        }}>
                                                            <Image
                                                                source={require('../images/white-tick.png')}
                                                                style={{
                                                                    width: normalizeF(19, 2),
                                                                    height: normalizeF(19, 2),
                                                                    resizeMode: 'contain',
                                                                }}
                                                            />
                                                        </View>
                                                    ) : (
                                                        <View style={{ marginRight: normalizeWidth(12) }}>
                                                            <Svg width={normalize(22)} height={normalize(22)} viewBox="0 0 22 22">
                                                                <Circle cx="11" cy="11" r="9.5" stroke="#8a94aa" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                                                            </Svg>
                                                        </View>
                                                    )}

                                                    {/* SET badge */}
                                                    <View style={{
                                                        borderWidth: normalize(1),
                                                        borderColor: '#5a6480',
                                                        borderRadius: normalize(4),
                                                        paddingHorizontal: normalizeWidth(7),
                                                        paddingVertical: normalizeHeight(3),
                                                    }}>
                                                        <Text style={{
                                                            color: '#c0c8dc',
                                                            fontSize: normalize(11),
                                                            fontWeight: '600',
                                                        }}>SET {setIdx + 1}</Text>
                                                    </View>

                                                    {/* Vertical separator */}
                                                    <View style={{
                                                        width: normalize(1),
                                                        height: normalizeHeight(16),
                                                        backgroundColor: '#404359',
                                                        marginHorizontal: normalizeWidth(11),
                                                    }} />

                                                    {/* Content */}
                                                    {isLogged ? (
                                                        <>
                                                            <Text style={{
                                                                flex: 1,
                                                                color: '#5b9cf6',
                                                                fontSize: normalize(14),
                                                                fontWeight: '700',
                                                                letterSpacing: 0.3,
                                                                marginLeft: normalizeWidth(8),
                                                            }}>
                                                                {getLoggedDataString(loggedDataForSet)}
                                                            </Text>
                                                            <Image
                                                                source={require('../images/pencil-white.png')}
                                                                style={{
                                                                    width: normalize(14),
                                                                    height: normalize(14) * (375/381),
                                                                    resizeMode: 'contain',
                                                                    tintColor: '#8a94aa',
                                                                }}
                                                            />
                                                        </>
                                                    ) : (
                                                        <View style={{
                                                            flex: 1,
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderWidth: normalize(1),
                                                            borderColor: '#4e68a6',
                                                            borderStyle: 'dashed',
                                                            borderRadius: normalize(6),
                                                            paddingVertical: normalizeHeight(6),
                                                            paddingHorizontal: normalizeWidth(8),
                                                        }}>
                                                            <Image
                                                                source={require('../images/pencil-with-underscore.png')}
                                                                style={{
                                                                    width: normalize(12),
                                                                    height: normalize(12) * (396/375),
                                                                    resizeMode: 'contain',
                                                                    tintColor: '#7a9fd4',
                                                                    marginRight: normalizeWidth(6),
                                                                }}
                                                            />
                                                            <Text style={{
                                                                color: '#7a9fd4',
                                                                fontSize: normalize(12),
                                                                fontWeight: '600',
                                                                letterSpacing: 0.5,
                                                            }}>LOG SET</Text>
                                                        </View>
                                                    )}
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                </View>
                            );
                        })}
                        <View style={{height:normalizeHeight(16)}}></View>
                    </ScrollView>
                    {!isListAtBottom && (
                        <View style={styles.listBottomFade} pointerEvents="none">
                            <Svg height="100%" width="100%">
                                <Defs>
                                    <LinearGradient id="routineListFade" x1="0" y1="0" x2="0" y2="1">
                                        <Stop offset="0" stopColor="#1c2238" stopOpacity="0" />
                                        <Stop offset="1" stopColor="#1c2238" stopOpacity="1" />
                                    </LinearGradient>
                                </Defs>
                                <Rect width="100%" height="100%" fill="url(#routineListFade)" />
                            </Svg>
                        </View>
                    )}
                    </View>
                </View>

                {/* End Workout Button */}
                <View style={{ marginBottom: normalizeHeight(80), marginTop: normalizeHeight(4) }}>
                    <TouchableOpacity style={styles.endButton} onPress={handleEndWorkout}>
                        <Image
                            source={white_donut}
                            style={styles.buttonImage}
                        />
                        <Text style={styles.buttonText}>End Workout</Text>
                    </TouchableOpacity>
                </View>
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
            {
                logSetModalState.visible && (
                    <LogSetsModal exerciseId={
                        logSetModalState.exerciseId!
                    }
                    setIdx={logSetModalState.setIdx!}
                    initialData={logSetModalState.initialData}
                    onClose={() => setLogSetModalState(prev => ({ ...prev, visible: false }))}
                    onSave={onLogData}
                    />
                )
            }
            <EndActiveWorkoutModal
                workout={workoutRef.current}
                visible={showEndModal}
                onClose={() => setShowEndModal(false)}
                navigation={navigation}
            />
            <AreYouSureModal
                visible={showBackConfirm}
                onClose={() => setShowBackConfirm(false)}
                title="Leave Workout?"
                description="Your progress will be lost if you leave now."
                primaryLabel="Leave"
                onPrimary={() => { setShowBackConfirm(false); doLeave(); }}
                primaryVariant="destructive"
                secondaryLabel="Stay"
                onSecondary={() => setShowBackConfirm(false)}
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
    endButton: {
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
    buttonImage: {
        height: normalizeHeight(12),
        width: (138.0 / 140.0) * normalize(12),
        aspectRatio: (140.0 / 138.0),
        marginRight: normalizeWidth(6),
    },
    buttonText: {
        fontSize: normalize(16),
        fontWeight: '500',
        lineHeight: normalize(20),
        color: '#FFFFFF',
    },
    listBottomFade: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: normalizeHeight(72),
    },
});
