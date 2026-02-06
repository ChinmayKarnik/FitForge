//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import { getExercisesListFromWorkout } from '../data/utils/workoutUtils';
import notepad_with_exclam from '../images/notepad-with-exclaim.png'
import { databaseController } from '../data';

const EndActiveWorkoutModal = ({ visible, onClose, workout, navigation }) => {

    const dayOfTheWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    const workoutDefaultName = `${dayOfTheWeek} Workout`
    const [workoutName, setWorkoutName] = useState(workoutDefaultName);

    

    const exercisesList = getExercisesListFromWorkout(workout)
    const isNoExercisesLogged = !exercisesList.length
    // Calculate duration in ms
    const durationMs = workout?.duration;
    // Format duration as HH : MM : SS
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);
    let workoutDurationFormatted = '';
    if (hours > 0) {
        workoutDurationFormatted = `${hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : ''}${minutes > 0 ? `${hours > 0 ? ' ' : ''}${minutes} min${minutes !== 1 ? 's' : ''}` : ''}`.trim();
    } else if (minutes > 0) {
        workoutDurationFormatted = `${minutes} min${minutes !== 1 ? 's' : ''}${seconds > 0 ? ` ${seconds} sec${seconds !== 1 ? 's' : ''}` : ''}`;
    } else {
        workoutDurationFormatted = `${seconds} sec${seconds !== 1 ? 's' : ''}`;
    }

    const onSaveWorkout = () => {
        databaseController.addWorkout(workout);
        if (navigation) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Activity' }],
            });
        }
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
                justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)'
            }}>
                <View style={{ width: '100%', paddingHorizontal: normalizeWidth(16) }}>
                    <View
                        style={{
                            backgroundColor: '#262745',
                            borderRadius: normalize(12),
                            borderWidth: normalize(1),
                            borderColor: '#37384b',
                            paddingTop: normalizeHeight(12),
                            paddingHorizontal: normalize(12)
                        }}>
                        <Text style={{ color: '#F2F4F8', fontSize: normalize(18), fontWeight: '500' }}>End Workout?</Text>
                        <Text
                            style={{
                                color: '#acadba',
                                fontSize: normalize(14),
                                marginTop: normalizeHeight(10),
                                fontWeight: '400'
                            }}>Are you sure you want to end your workout?</Text>

                        <View style={{
                            borderWidth: normalize(1), borderColor: '#33344f',
                            backgroundColor: "#1d2039",
                            paddingVertical: normalizeHeight(10),
                            marginTop: normalizeHeight(12),
                            borderRadius: normalize(6),
                            alignItems: 'center'
                        }}>
                            <Text
                                style={{
                                    fontWeight: '500',
                                    color: '#d2d0db',
                                    fontSize: normalize(16)
                                }}
                            >Duration - {workoutDurationFormatted}</Text>
                        </View>
                        <Text
                            style={{
                                marginTop: normalizeHeight(10),
                                color: '#acadba',
                                fontSize: normalize(14),
                                fontWeight: '400'
                            }}
                        >Workout Name</Text>

                        <View style={{
                            borderWidth: normalize(1), borderColor: '#33344f',
                            backgroundColor: "#1d2039",
                            paddingVertical: normalizeHeight(0),
                            marginTop: normalizeHeight(5),
                            borderRadius: normalize(6),
                            paddingLeft: normalizeWidth(12)
                        }}>
                            <TextInput
                                style={{
                                    fontWeight: '400',
                                    color: '#d2d0db',
                                    fontSize: normalize(16),
                                    paddingVertical: normalizeHeight(5),
                                    width: '100%',
                                }}
                                value={workoutName}
                                onChangeText={(text) => { setWorkoutName(text) }}
                                placeholder={workoutName}
                                placeholderTextColor="#aab3c8"
                            />
                        </View>

                        <Text
                            style={{
                                marginTop: normalizeHeight(10),
                                color: '#acadba',
                                fontSize: normalize(14),
                                fontWeight: '400'
                            }}
                        >Exercises Performed</Text>

                        {!isNoExercisesLogged &&
                            (<View style={{
                                borderWidth: normalize(1), borderColor: '#33344f',
                                backgroundColor: "#1d2039",
                                paddingVertical: normalizeHeight(0),
                                marginTop: normalizeHeight(5),
                                borderRadius: normalize(6),
                                paddingHorizontal: normalizeWidth(12)
                            }}>
                                {
                                    exercisesList.map((exercise, index) => {
                                        const isLast = index === exercisesList.length - 1;
                                        return (
                                            <View style={[{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between', alignItems: 'center',
                                                paddingVertical: normalizeHeight(6)

                                            },
                                            !isLast && {
                                                borderBottomWidth: normalize(1),
                                                borderColor: '#31324f'
                                            }
                                            ]}
                                                key={exercise.name}
                                            >
                                                <Text
                                                    style={{
                                                        color: '#cac9d5',
                                                        fontWeight: '400',
                                                        fontSize: normalize(14)
                                                    }}
                                                >{exercise.name}</Text>
                                                <Text
                                                    style={{
                                                        color: '#9496a7',
                                                        fontWeight: '400',
                                                        fontSize: normalize(14)
                                                    }}
                                                >{exercise.sets} {exercise.sets > 1 ? 'Sets' : 'Set'}</Text>
                                            </View>
                                        )
                                    })
                                }

                            </View>)}

                        {
                            !exercisesList.length && (<View style={{
                                borderWidth: normalize(1), borderColor: '#33344f',
                                backgroundColor: "#1d2039",
                                paddingVertical: normalizeHeight(12),
                                marginTop: normalizeHeight(5),
                                borderRadius: normalize(6),
                                paddingHorizontal: normalizeWidth(12),
                                
                                flexDirection : 'row'
                            }}>
                            <Image
                            style={{width:normalize(50),
                                aspectRatio: (380.0/419.0),
                              
                            }}
                            source={notepad_with_exclam}
                             />

                            <View style={{marginLeft:normalizeWidth(10),
                                marginTop:normalizeHeight(5)
                            }}>
                                <Text
                                style={{color: '#c9c9d4',
                                    fontSize: normalize(14),
                                    fontWeight: '400'
                                }}
                                >
                                    No exercises logged yet
                                </Text>
                                <Text
                                style={{color: '#8689a2',
                                    marginTop: normalizeHeight(5),
                                    fontSize:normalize(12)
                                }}
                                >
                                    {"Please log atleast one exercise\nbefore ending this workout"}
                                </Text>
                            </View>
                            </View>)
                        }


                        <View style={{
                            marginTop: normalizeHeight(16),
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: normalizeHeight(16)
                        }}>
                            <TouchableOpacity
                                style={[{
                                    flex: 1,
                                    backgroundColor: '#313967',
                                    borderRadius: normalize(8),
                                    paddingVertical: normalize(10),
                                    marginRight: normalize(4),
                                    alignItems: 'center',
                                    borderWidth: normalize(1),
                                    borderColor: '#536196',
                                },
                                !!isNoExercisesLogged && {
                                    opacity:0.3
                                }
                            ]}
                                onPress={onSaveWorkout}
                                disabled= {isNoExercisesLogged}
                                activeOpacity={0.8}
                            >
                                <Text style={{ color: '#e4e5ee', fontWeight: '500', fontSize: normalize(15), letterSpacing: 0.5 }}>Save Workout</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    backgroundColor: '#6c1e29',
                                    borderRadius: normalize(8),
                                    paddingVertical: normalize(10),
                                    marginLeft: normalize(4),
                                    alignItems: 'center',
                                    borderWidth: normalize(1),
                                    borderColor: '#a6353f',
                                }}
                                onPress={onClose}
                                activeOpacity={0.8}
                            >
                                <Text style={{ color: '#F2F4F8', fontWeight: '500', fontSize: normalize(15), letterSpacing: 0.5 }}>Discard</Text>
                            </TouchableOpacity>
                        </View>



                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default EndActiveWorkoutModal;
