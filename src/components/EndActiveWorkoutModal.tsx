//@ts-nocheck
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, Image, ToastAndroid } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import crossIcon from '../images/cross-icon-white.png';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import { getExercisesListFromWorkout } from '../utils/workoutUtils';
import { databaseController } from '../data';
import AreYouSureModal from './AreYouSureModal';

const EndActiveWorkoutModal = ({ visible, onClose, workout, navigation, onEndWorkout }) => {

    const dayOfTheWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    const workoutDefaultName = `${dayOfTheWeek} Workout`
    const [workoutName, setWorkoutName] = useState(workoutDefaultName);

    console.log('ckck workout ', workout)
    const exercisesList = getExercisesListFromWorkout(workout)
    console.log('ckck ex list  ', exercisesList)
    const isNoExercisesLogged = !exercisesList.length

    const durationMs = workout?.duration;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);
    const pad = (n: number) => String(n).padStart(2, '0');
    const heroDuration = hours > 0
        ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
        : `${pad(minutes)}:${pad(seconds)}`;

    const totalSets = exercisesList.reduce((sum, ex) => sum + ex.sets, 0);

    const onSaveWorkout = () => {
        const savedWorkout = { ...workout, name: workoutName };
        databaseController.addWorkout(savedWorkout);
        ToastAndroid.show('Workout saved 💪', ToastAndroid.SHORT);
        onClose();
        onEndWorkout?.();
        if (navigation) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        { name: 'MainTabs', state: { routes: [{ name: 'Activity' }], index: 0 } },
                        { name: 'WorkoutDetails', params: { workout: savedWorkout } },
                    ],
                })
            );
        }
    }
  
    if (isNoExercisesLogged) {
        const onEndAnyway = () => {
            onClose();
            onEndWorkout?.();
            if (navigation) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'MainTabs', state: { routes: [{ name: 'Activity' }], index: 0 } },
                        ],
                    })
                );
            }
        };
        return (
            <AreYouSureModal
                visible={visible}
                onClose={onClose}
                title="End Workout?"
                description="You haven't logged any exercises yet."
                primaryLabel="End Anyway"
                onPrimary={onEndAnyway}
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
                <View style={{
                    width: '100%',
                    paddingHorizontal: normalizeWidth(16),
                }}>
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
                        <View style={{
                            alignItems: 'center',
                            marginBottom: normalizeHeight(12),
                        }}>
                            <Text style={{
                                color:
                                 '#b7c4ef',
                                fontSize: normalize(11),
                                fontWeight: '400',
                                letterSpacing: 1.5,
                            }}>WORKOUT COMPLETE</Text>
                            <View style={{
                                width: normalizeWidth(28),
                                height: normalize(1),
                                backgroundColor: '#7fb3ff',
                                marginTop: normalizeHeight(12),
                            }} />
                        </View>

                        {/* Hero duration */}
                        <View style={{
                            alignItems: 'center',
                            marginBottom: normalizeHeight(24),
                        }}>
                            <Text style={{
                                color: '#ffffff',
                                fontSize: normalize(56),
                                fontWeight: '700',
                                letterSpacing: -1,
                            }}>{heroDuration}</Text>
                            <Text style={{
                                color: '#8090bc',
                                fontSize: normalize(10),
                                fontWeight: '500',
                                letterSpacing: 1,
                                marginTop: normalizeHeight(0),
                            }}>TOTAL DURATION</Text>
                        </View>

                        {/* Stats row */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: normalizeHeight(24),
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    color: '#7fb3ff',
                                    fontSize: normalize(26),
                                    fontWeight: '700',
                                }}>{exercisesList.length}</Text>
                                <Text style={{
                                    color: '#9aadd0',
                                    fontSize: normalize(11),
                                    marginLeft: normalizeWidth(10),
                                    marginTop:normalizeHeight(2)
                                }}>{exercisesList.length === 1 ? 'Exercise' : 'Exercises'}</Text>
                            </View>
                            <View style={{
                                width: 1,
                                height: normalizeHeight(28),
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                marginHorizontal: normalizeWidth(24),
                            }} />
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    color: '#7fb3ff',
                                    fontSize: normalize(26),
                                    fontWeight: '700',
                                }}>{totalSets}</Text>
                                <Text style={{
                                    color: '#9aadd0',
                                    fontSize: normalize(11),
                                    marginLeft: normalizeWidth(10),
                                    marginTop:normalizeHeight(2)
                                }}>{totalSets === 1 ? 'Set' : 'Sets'}</Text>
                            </View>
                        </View>

                        {/* Workout Name */}
                        <Text style={{
                            color: '#9aadd0',
                            fontSize: normalize(10),
                            fontWeight: '600',
                            letterSpacing: 1.5,
                            marginBottom: normalizeHeight(6),
                        }}>WORKOUT NAME</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: normalize(1),
                            borderColor: '#33344f',
                            backgroundColor: '#1d2039',
                            borderRadius: normalize(6),
                            paddingLeft: normalizeWidth(12),
                            paddingRight: normalizeWidth(10),
                            marginBottom: normalizeHeight(14),
                        }}>
                            <TextInput
                                style={{
                                    flex: 1,
                                    color: '#ffffff',
                                    fontSize: normalize(15),
                                    fontWeight: '400',
                                    paddingVertical: normalizeHeight(8),
                                }}
                                value={workoutName}
                                onChangeText={(text) => setWorkoutName(text)}
                            />
                            {workoutName.length > 0 && (
                                <TouchableOpacity
                                    onPress={() => setWorkoutName('')}
                                    activeOpacity={0.7}
                                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                >
                                    <View style={{
                                        width: normalize(18),
                                        height: normalize(18),
                                        borderRadius: normalize(9),
                                        borderWidth: normalize(1),
                                        borderColor: 'rgba(255,255,255,0.38)',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Image
                                            source={crossIcon}
                                            style={{
                                                width: normalize(7),
                                                height: normalize(7),
                                                tintColor: 'rgba(255,255,255,0.62)',
                                            }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Exercise Breakdown */}
                        <Text style={{
                            color: '#9aadd0',
                            fontSize: normalize(10),
                            fontWeight: '600',
                            letterSpacing: 1.5,
                            marginBottom: normalizeHeight(8),
                        }}>EXERCISE BREAKDOWN</Text>
                        <View style={{
                            borderWidth: normalize(1),
                            borderColor: '#33344f',
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
                                        }, !isLast && {
                                            borderBottomWidth: normalize(1),
                                            borderColor: '#31324f',
                                        }]}
                                    >
                                        <View style={{
                                            width: normalize(5),
                                            height: normalize(5),
                                            borderRadius: normalize(4),
                                            backgroundColor: '#7fb3ff',
                                            marginRight: normalizeWidth(10),
                                        }} />
                                        <Text style={{
                                            color: 'rgba(255,255,255,0.9)',
                                            fontSize: normalize(12),
                                            fontFamily: 'RobotoMono-Regular',
                                            flex: 1,
                                        }}>{exercise.name}</Text>
                                        <Text style={{
                                            color: '#7fb3ff',
                                            fontSize: normalize(12),
                                            fontFamily: 'RobotoMono-Regular',
                                        }}>{exercise.sets} {exercise.sets > 1 ? 'sets' : 'set'}</Text>
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
                                <Text style={{
                                    color: '#F2F4F8',
                                    fontWeight: '500',
                                    fontSize: normalize(15),
                                    letterSpacing: 0.5,
                                }}>Discard</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    backgroundColor: '#3a4fa0',
                                    borderRadius: normalize(8),
                                    paddingVertical: normalize(10),
                                    marginLeft: normalize(4),
                                    alignItems: 'center',
                                    borderWidth: normalize(1),
                                    borderColor: '#5a72c4',
                                }}
                                onPress={onSaveWorkout}
                                activeOpacity={0.8}
                            >
                                <Text style={{
                                    color: '#eef0fb',
                                    fontWeight: '600',
                                    fontSize: normalize(15),
                                    letterSpacing: 0.5,
                                }}>Save Workout</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default EndActiveWorkoutModal;
