//@ts-nocheck
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import { getExercisesListFromWorkout } from '../utils/workoutUtils';
import { databaseController } from '../data';
import AreYouSureModal from './AreYouSureModal';

const EndActiveWorkoutModal = ({ visible, onClose, workout, navigation, onEndWorkout }) => {

    const dayOfTheWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    const workoutDefaultName = `${dayOfTheWeek} Workout`
    const [workoutName, setWorkoutName] = useState(workoutDefaultName);

    
    console.log('ckck workout ',workout)
    const exercisesList = getExercisesListFromWorkout(workout)
    console.log('ckck ex list  ',exercisesList)
    const isNoExercisesLogged = !exercisesList.length
    // Calculate duration in ms
    const durationMs = workout?.duration;
    // Format duration as HH : MM : SS
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);
    const pad = (n: number) => String(n).padStart(2, '0');
    const heroDuration = hours > 0
        ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
        : `${pad(minutes)}:${pad(seconds)}`;

    const totalSets = exercisesList.reduce((sum, ex) => sum + ex.sets, 0);

    const onSaveWorkout = () => {
        databaseController.addWorkout({...workout, name: workoutName});
        onClose();
        onEndWorkout?.();
        if (navigation) {
            navigation.navigate('Activity');
        }
    }
   
    if (isNoExercisesLogged) {
        return (
            <AreYouSureModal
                visible={visible}
                onClose={onClose}
                title="End Workout?"
                description="You haven't logged any exercises yet."
                primaryLabel="End Anyway"
                onPrimary={onClose}
                primaryVariant="destructive"
                secondaryLabel="Keep Going"
            />
        );
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={{
                flex: 1,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.72)',
            }}>
                <View style={{ width: '100%', paddingHorizontal: normalizeWidth(16) }}>
                    <View style={{
                        backgroundColor: '#262745',
                        borderRadius: normalize(12),
                        borderWidth: normalize(1),
                        borderColor: '#37384b',
                        paddingTop: normalizeHeight(20),
                        paddingHorizontal: normalize(16),
                        paddingBottom: normalizeHeight(16),
                    }}>

                        {/* Header label */}
                        <View style={{ alignItems: 'center', marginBottom: normalizeHeight(28) }}>
                            <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: normalize(11), fontWeight: '600', letterSpacing: 1.5 }}>WORKOUT COMPLETE</Text>
                            <View style={{ width: normalizeWidth(28), height: normalize(2), backgroundColor: '#7fb3ff', marginTop: normalizeHeight(6) }} />
                        </View>

                        {/* Hero duration */}
                        <View style={{ alignItems: 'center', marginBottom: normalizeHeight(24) }}>
                            <Text style={{ color: '#ffffff', fontSize: normalize(46), fontWeight: '700', letterSpacing: -1 }}>{heroDuration}</Text>
                            <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: normalize(11), fontWeight: '500', letterSpacing: 1.2, marginTop: normalizeHeight(2) }}>TOTAL DURATION</Text>
                        </View>

                        {/* Stats row */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: normalizeHeight(24) }}>
                            <Text>
                                <Text style={{ color: '#7fb3ff', fontSize: normalize(26), fontWeight: '700' }}>{exercisesList.length}</Text>
                                <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: normalize(13) }}> Exercises</Text>
                            </Text>
                            <View style={{ width: 1, height: normalizeHeight(28), backgroundColor: 'rgba(255,255,255,0.2)', marginHorizontal: normalizeWidth(18) }} />
                            <Text>
                                <Text style={{ color: '#7fb3ff', fontSize: normalize(26), fontWeight: '700' }}>{totalSets}</Text>
                                <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: normalize(13) }}> Sets</Text>
                            </Text>
                        </View>

                        {/* Workout Name */}
                        <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: normalize(11), fontWeight: '600', letterSpacing: 1.2, marginBottom: normalizeHeight(6) }}>WORKOUT NAME</Text>
                        <View style={{
                            borderWidth: normalize(1), borderColor: '#33344f',
                            backgroundColor: '#1d2039',
                            borderRadius: normalize(6),
                            paddingLeft: normalizeWidth(12),
                            marginBottom: normalizeHeight(14),
                        }}>
                            <TextInput
                                style={{ color: '#d2d0db', fontSize: normalize(15), fontWeight: '400', paddingVertical: normalizeHeight(8), width: '100%' }}
                                value={workoutName}
                                onChangeText={(text) => setWorkoutName(text)}
                                placeholder={workoutName}
                                placeholderTextColor="#aab3c8"
                            />
                        </View>

                        {/* Exercise Breakdown */}
                        <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: normalize(11), fontWeight: '600', letterSpacing: 1.2, marginBottom: normalizeHeight(6) }}>EXERCISE BREAKDOWN</Text>
                        <View style={{
                            borderWidth: normalize(1), borderColor: '#33344f',
                            backgroundColor: '#1d2039',
                            borderRadius: normalize(6),
                            paddingHorizontal: normalizeWidth(12),
                            marginBottom: normalizeHeight(18),
                        }}>
                            {exercisesList.map((exercise, index) => {
                                const isLast = index === exercisesList.length - 1;
                                return (
                                    <View
                                        key={exercise.name}
                                        style={[{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            paddingVertical: normalizeHeight(8),
                                        }, !isLast && { borderBottomWidth: normalize(1), borderColor: '#31324f' }]}
                                    >
                                        <Text style={{ color: '#cac9d5', fontWeight: '400', fontSize: normalize(14) }}>{exercise.name}</Text>
                                        <Text style={{ color: '#7fb3ff', fontWeight: '500', fontSize: normalize(14) }}>{exercise.sets} {exercise.sets > 1 ? 'sets' : 'set'}</Text>
                                    </View>
                                );
                            })}
                        </View>

                        {/* Buttons: Discard left, Save right */}
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    backgroundColor: '#6c1e29',
                                    borderRadius: normalize(8),
                                    paddingVertical: normalize(10),
                                    marginRight: normalize(4),
                                    alignItems: 'center',
                                    borderWidth: normalize(1),
                                    borderColor: '#a6353f',
                                }}
                                onPress={onClose}
                                activeOpacity={0.8}
                            >
                                <Text style={{ color: '#F2F4F8', fontWeight: '500', fontSize: normalize(15), letterSpacing: 0.5 }}>Discard</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    backgroundColor: '#313967',
                                    borderRadius: normalize(8),
                                    paddingVertical: normalize(10),
                                    marginLeft: normalize(4),
                                    alignItems: 'center',
                                    borderWidth: normalize(1),
                                    borderColor: '#536196',
                                }}
                                onPress={onSaveWorkout}
                                activeOpacity={0.8}
                            >
                                <Text style={{ color: '#e4e5ee', fontWeight: '500', fontSize: normalize(15), letterSpacing: 0.5 }}>Save Workout</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default EndActiveWorkoutModal;
