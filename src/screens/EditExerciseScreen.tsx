import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import { databaseController } from '../data';
import white_left_arrow from '../images/white-left-arrow.png';

const EditExerciseScreen = ({ navigation, route }: any) => {
    const { exercise: initialExercise } = route.params;
    const [exercise, setExercise] = useState({
        name: initialExercise.name || '',
        description: initialExercise.description || '',
    });
    const [parameters, setParameters] = useState(() => {
        const paramMap = { reps: false, weight: false, toFailure: false, time: false };
        if (Array.isArray(initialExercise.requiredParameters)) {
            initialExercise.requiredParameters.forEach((param: any) => {
                if (param.name === 'Reps') paramMap.reps = true;
                if (param.name === 'Weight') paramMap.weight = true;
                if (param.name === 'To Failure') paramMap.toFailure = true;
                if (param.name === 'Time') paramMap.time = true;
            });
        }
        return paramMap;
    });

    const isExerciseValid =
        exercise.name &&
        exercise.name.trim() !== '' &&
        exercise.description &&
        exercise.description.trim() !== '';

    const onCancelExercise = () => {
        navigation.goBack();
    };

    const onUpdateExercise = async () => {
        let exerciseToUpdate = { ...exercise };
        const requiredParameters = [];
        if (parameters.reps) {
            requiredParameters.push({ name: 'Reps', type: 'number', moreIsBetter: true });
        }
        if (parameters.weight) {
            requiredParameters.push({ name: 'Weight', type: 'number', moreIsBetter: true });
        }
        if (parameters.toFailure) {
            requiredParameters.push({ name: 'To Failure', type: 'boolean' });
        }
        if (parameters.time) {
            requiredParameters.push({ name: 'Time', type: 'number', moreIsBetter: true });
        }
        if (requiredParameters.length > 0) {
            exerciseToUpdate.requiredParameters = requiredParameters;
        }
        try {
            await databaseController.updateExercise(initialExercise.id, exerciseToUpdate);
            navigation.goBack();
        } catch (error) {
            console.error('Error updating exercise:', error);
        }
    };

    const toggleParameter = (param: keyof typeof parameters) => {
        setParameters({ ...parameters, [param]: !parameters[param] });
    };

    return (
        <View style={styles.container}>
            <View style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'rgba(68, 75, 95)',
                alignItems: 'center',
                backgroundColor: 'rgba(36, 42, 65)',
                paddingTop: normalizeHeight(40),
                paddingBottom: normalizeHeight(12)
            }}>
                <TouchableOpacity
                    style={{ position: 'absolute', top: normalizeHeight(46), left: normalizeWidth(16) }}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        style={{
                            width: normalizeWidth(9),
                            height: normalizeWidth(9) * (86.0 / 51.0),
                            aspectRatio: (51.0 / 86.0),
                            resizeMode: 'stretch',
                        }}
                        source={white_left_arrow}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 22,
                        letterSpacing: 1,
                        fontWeight: '700',
                        color: "#fefefe"
                    }}
                >Edit Exercise</Text>
            </View>

            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: normalizeWidth(16),
                    paddingTop: normalizeHeight(24),
                    paddingBottom: normalizeHeight(100)
                }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ marginBottom: normalizeHeight(20) }}>
                    <Text style={{
                        color: '#b3b2c5',
                        fontSize: normalize(15),
                        marginBottom: normalizeHeight(8),
                        fontWeight: '500'
                    }}>Exercise Name</Text>
                    <TextInput
                        style={{
                            backgroundColor: '#292f46',
                            borderColor: '#383e55',
                            borderWidth: 1,
                            borderRadius: 8,
                            paddingHorizontal: normalizeWidth(12),
                            paddingVertical: normalizeHeight(12),
                            color: '#fff',
                            fontSize: normalize(14)
                        }}
                        placeholder="e.g. Push-ups, Barbell Squat, Plank"
                        placeholderTextColor="rgba(255,255,255,0.3)"
                        value={exercise.name}
                        onChangeText={(text) => setExercise({ ...exercise, name: text })}
                    />
                </View>

                <View style={{ marginBottom: normalizeHeight(24) }}>
                    <Text style={{
                        color: '#b3b2c5',
                        fontSize: normalize(15),
                        marginBottom: normalizeHeight(8),
                        fontWeight: '500'
                    }}>Description</Text>
                    <TextInput
                        style={{
                            backgroundColor: '#292f46',
                            borderColor: '#383e55',
                            borderWidth: 1,
                            borderRadius: 8,
                            paddingHorizontal: normalizeWidth(12),
                            paddingVertical: normalizeHeight(12),
                            color: '#fff',
                            fontSize: normalize(14),
                            textAlignVertical: 'top',
                            minHeight: normalizeHeight(100)
                        }}
                        placeholder="e.g. A bodyweight move for chest, triceps, shoulders."
                        placeholderTextColor="rgba(255,255,255,0.3)"
                        value={exercise.description}
                        multiline
                        onChangeText={(text) => setExercise({ ...exercise, description: text })}
                    />
                </View>

                <View>
                    <Text style={{
                        color: '#fefefe',
                        fontSize: normalize(16),
                        marginBottom: normalizeHeight(4),
                        fontWeight: '600'
                    }}>Choose Parameters</Text>
                    <Text style={{
                        color: '#8a8a9e',
                        fontSize: normalize(14),
                        marginBottom: normalizeHeight(16),
                        fontWeight: '400'
                    }}>Select which parameters you'd like to track for this exercise.</Text>

                    {/* Reps Parameter */}
                    <View style={{
                        backgroundColor: '#292f46',
                        borderColor: '#383e55',
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingHorizontal: normalizeWidth(12),
                        paddingVertical: normalizeHeight(12),
                        marginBottom: normalizeHeight(12),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{
                                color: '#fefefe',
                                fontSize: normalize(15),
                                fontWeight: '500',
                                marginBottom: normalizeHeight(4)
                            }}>Reps</Text>
                            <Text style={{
                                color: '#8a8a9e',
                                fontSize: normalize(13),
                                fontWeight: '400'
                            }}>Track the number of repetitions for each set</Text>
                        </View>
                        <Switch
                            value={parameters.reps}
                            onValueChange={() => toggleParameter('reps')}
                            trackColor={{ false: '#484f66', true: '#4f5b93' }}
                            thumbColor={parameters.reps ? '#4ECDC4' : '#9ca3af'}
                            style={{ marginLeft: normalizeWidth(12) }}
                        />
                    </View>

                    {/* Weight Parameter */}
                    <View style={{
                        backgroundColor: '#292f46',
                        borderColor: '#383e55',
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingHorizontal: normalizeWidth(12),
                        paddingVertical: normalizeHeight(12),
                        marginBottom: normalizeHeight(12),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{
                                color: '#fefefe',
                                fontSize: normalize(15),
                                fontWeight: '500',
                                marginBottom: normalizeHeight(4)
                            }}>Weight</Text>
                            <Text style={{
                                color: '#8a8a9e',
                                fontSize: normalize(13),
                                fontWeight: '400'
                            }}>Track the amount of weight used for each set</Text>
                        </View>
                        <Switch
                            value={parameters.weight}
                            onValueChange={() => toggleParameter('weight')}
                            trackColor={{ false: '#484f66', true: '#4f5b93' }}
                            thumbColor={parameters.weight ? '#4ECDC4' : '#9ca3af'}
                            style={{ marginLeft: normalizeWidth(12) }}
                        />
                    </View>

                    {/* To Failure Parameter */}
                    <View style={{
                        backgroundColor: '#292f46',
                        borderColor: '#383e55',
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingHorizontal: normalizeWidth(12),
                        paddingVertical: normalizeHeight(12),
                        marginBottom: normalizeHeight(12),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{
                                color: '#fefefe',
                                fontSize: normalize(15),
                                fontWeight: '500',
                                marginBottom: normalizeHeight(4)
                            }}>To Failure</Text>
                            <Text style={{
                                color: '#8a8a9e',
                                fontSize: normalize(13),
                                fontWeight: '400'
                            }}>Check if a set was performed to failure</Text>
                        </View>
                        <Switch
                            value={parameters.toFailure}
                            onValueChange={() => toggleParameter('toFailure')}
                            trackColor={{ false: '#484f66', true: '#4f5b93' }}
                            thumbColor={parameters.toFailure ? '#4ECDC4' : '#9ca3af'}
                            style={{ marginLeft: normalizeWidth(12) }}
                        />
                    </View>

                    {/* Time Parameter */}
                    <View style={{
                        backgroundColor: '#292f46',
                        borderColor: '#383e55',
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingHorizontal: normalizeWidth(12),
                        paddingVertical: normalizeHeight(12),
                        marginBottom: normalizeHeight(12),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{
                                color: '#fefefe',
                                fontSize: normalize(15),
                                fontWeight: '500',
                                marginBottom: normalizeHeight(4)
                            }}>Time</Text>
                            <Text style={{
                                color: '#8a8a9e',
                                fontSize: normalize(13),
                                fontWeight: '400'
                            }}>Track the duration of each set</Text>
                        </View>
                        <Switch
                            value={parameters.time}
                            onValueChange={() => toggleParameter('time')}
                            trackColor={{ false: '#484f66', true: '#4f5b93' }}
                            thumbColor={parameters.time ? '#4ECDC4' : '#9ca3af'}
                            style={{ marginLeft: normalizeWidth(12) }}
                        />
                    </View>
                </View>
            </ScrollView>

            <View style={{
                flexDirection: 'row',
                paddingHorizontal: normalizeWidth(16),
                paddingVertical: normalizeHeight(16),
                gap: normalizeWidth(12),
                borderTopWidth: normalizeHeight(1),
                borderColor: 'rgba(255,255,255,0.1)',
            }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        borderWidth: normalize(1),
                        borderColor: '#383e55',
                        borderRadius: normalize(8),
                        paddingVertical: normalizeHeight(12),
                        alignItems: 'center'
                    }}
                    onPress={onCancelExercise}
                >
                    <Text style={{
                        color: '#8a8a9e',
                        fontSize: normalize(16),
                        fontWeight: '500'
                    }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: isExerciseValid ? '#4f5b93' : 'rgba(79,91,147,0.5)',
                        borderRadius: normalize(8),
                        paddingVertical: normalizeHeight(12),
                        alignItems: 'center'
                    }}
                    disabled={!isExerciseValid}
                    onPress={onUpdateExercise}
                >
                    <Text style={{
                        color: isExerciseValid ? '#fff' : 'rgba(255,255,255,0.5)',
                        fontSize: normalize(16),
                        fontWeight: '500'
                    }}>Update</Text>
                </TouchableOpacity>
            </View>
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
});

export default EditExerciseScreen;
