import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, Image, Keyboard } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import { databaseController } from '../data';
import white_left_arrow from '../images/white-left-arrow.png';
import repeat_icon from '../images/repeat-2.png';
import dumbbell_icon from '../images/dumbbell-2.png';
import flame_icon from '../images/flame-2.png';
import stopwatch_icon from '../images/stopwatch-white-2.png';


const PARAMETER_ROWS = [
    {
        key: 'reps' as const,
        title: 'Reps',
        description: 'Track the number of repetitions for each set',
        icon: repeat_icon,
        iconWidth: 24,
        iconHeight: 23,
    },
    {
        key: 'weight' as const,
        title: 'Weight',
        description: 'Track the amount of weight used for each set',
        icon: dumbbell_icon,
        iconWidth: 30,
        iconHeight: 18,
    },
    {
        key: 'toFailure' as const,
        title: 'To Failure',
        description: 'Check if a set was performed to failure',
        icon: flame_icon,
        iconWidth: 22,
        iconHeight: 28,
    },
    {
        key: 'time' as const,
        title: 'Time',
        description: 'Track the duration of each set',
        icon: stopwatch_icon,
        iconWidth: 23,
        iconHeight: 26,
    },
];

const AddExerciseScreen = ({ navigation }: any) => {
    const [exercise, setExercise] = useState({
        name: '',
        description: ''
    })

    const [parameters, setParameters] = useState({
        reps: true,
        weight: true,
        toFailure: false,
        time: true
    });

    const nameInputRef = useRef<TextInput>(null);
    const descriptionInputRef = useRef<TextInput>(null);

    useEffect(() => {
        const hideListener = Keyboard.addListener('keyboardDidHide', () => {
            nameInputRef.current?.blur();
            descriptionInputRef.current?.blur();
        });
        return () => hideListener.remove();
    }, []);

    const isExerciseValid = 
        exercise.name && 
        exercise.name.trim() !== '' &&
        exercise.description && 
        exercise.description.trim() !== '';

    const onCancelExercise = () => {
        navigation.goBack();
    };

    const onCreateExercise = async () => {
        console.log('Exercise Object:', exercise);
        console.log('Parameters:', parameters);

        let exerciseToAdd = { ...exercise };
        // Build requiredParameters array based on toggles
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
            exerciseToAdd.requiredParameters = requiredParameters;
        }

        try {
            await databaseController.addExercise(exerciseToAdd);
            navigation.goBack();
        } catch (error) {
            console.error('Error adding exercise:', error);
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
                >Add Exercise</Text>
            </View>

            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: normalizeWidth(16),
                    paddingTop: normalizeHeight(18),
                    paddingBottom: normalizeHeight(10)
                }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ marginBottom: normalizeHeight(16) }}>
                    <Text style={{
                        color: 'rgba(255,255,255,1)',
                        fontSize: normalize(15),
                        marginBottom:  normalizeHeight(8),
                        fontWeight: '500'
                    }}>Exercise Name</Text>
                    <TextInput
                        ref={nameInputRef}
                        style={{
                            backgroundColor: '#252d47',
                            borderColor: 'rgba(255,255,255,0.3)',
                            borderWidth: 1,
                            borderRadius: 8,
                            paddingHorizontal: normalizeWidth(12),
                            paddingVertical: normalizeHeight(12),
                            color: 'rgba(255,255,255,0.9)',
                            fontSize: normalize(14),
                            fontWeight: '500'
                        }}
                        value={exercise.name}
                        onChangeText={(text) => setExercise({ ...exercise, name: text })}
                    />
                </View>

                <View style={{ marginBottom: normalizeHeight(16) }}>
                    <Text style={{
                        color: 'rgba(255,255,255,1)',
                        fontSize: normalize(15),
                        marginBottom: normalizeHeight(8),
                        fontWeight: '500'
                    }}>Description</Text>
                    <TextInput
                        ref={descriptionInputRef}
                        style={{
                            backgroundColor: '#252d47',
                            borderColor: 'rgba(255,255,255,0.3)',
                            borderWidth: 1,
                            borderRadius: 8,
                            paddingHorizontal: normalizeWidth(12),
                            paddingVertical: normalizeHeight(12),
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: normalize(14),
                            textAlignVertical: 'top',
                            minHeight: normalizeHeight(100)
                        }}
                        value={exercise.description}
                        multiline
                        returnKeyType="done"
                        submitBehavior="blurAndSubmit"
                        onSubmitEditing={() => Keyboard.dismiss()}
                        onChangeText={(text) => setExercise({ ...exercise, description: text })}
                    />
                </View>

                <View>
                    <Text style={{
                        color: '#fefefe',
                        fontSize: normalize(15),
                        marginBottom: normalizeHeight(4),
                        fontWeight: '600'
                    }}>Choose Parameters</Text>
                    <Text style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: normalize(12),
                        marginBottom: normalizeHeight(16),
                        fontWeight: '400'
                    }}>Select which parameters you'd like to track for this exercise</Text>

                    <View style={{
                        backgroundColor: '#252d47',
                        borderColor: '#3d4563',
                        borderWidth: 1,
                        borderRadius: normalize(12),
                        overflow: 'hidden',
                    }}>
                        {PARAMETER_ROWS.map((row, index) => (
                            <View key={row.key}>
                                <View style={{
                                    paddingHorizontal: normalizeWidth(12),
                                    paddingVertical: normalizeHeight(14),
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <View style={{
                                        width: normalizeWidth(30),
                                        height: normalizeWidth(30),
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: normalizeWidth(14)
                                    }}>
                                        <Image
                                            source={row.icon}
                                            resizeMode="contain"
                                            style={{
                                                width: normalizeWidth(row.iconWidth),
                                                height: normalizeWidth(row.iconHeight),
                                                tintColor: '#8fa8e8'
                                            }}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{
                                            color: '#fefefe',
                                            fontSize: normalize(15),
                                            fontWeight: '500',
                                            marginBottom: normalizeHeight(4)
                                        }}>{row.title}</Text>
                                        <Text style={{
                                            color: 'rgba(255,255,255,0.55)',
                                            fontSize: normalize(11),
                                            fontWeight: '400'
                                        }}>{row.description}</Text>
                                    </View>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => toggleParameter(row.key)}
                                        style={{
                                            width: normalizeWidth(38),
                                            height: normalizeWidth(22),
                                            borderRadius: normalizeWidth(11),
                                            borderWidth: 1.5,
                                            borderColor: parameters[row.key] ? '#4f6bed' : 'rgba(255,255,255,0.35)',
                                            backgroundColor: parameters[row.key] ? '#4f6bed' : 'transparent',
                                            justifyContent: 'center',
                                            alignItems: parameters[row.key] ? 'flex-end' : 'flex-start',
                                            paddingHorizontal: normalizeWidth(2),
                                            marginLeft: normalizeWidth(8)
                                        }}
                                    >
                                        <View style={{
                                            width: normalizeWidth(16),
                                            height: normalizeWidth(16),
                                            borderRadius: normalizeWidth(8),
                                            backgroundColor: '#fefefe'
                                        }} />
                                    </TouchableOpacity>
                                </View>
                                {index < PARAMETER_ROWS.length - 1 && (
                                    <View style={{ height: 1, backgroundColor: '#3d4563', marginHorizontal: normalizeWidth(14) }} />
                                )}
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            <View style={{
                flexDirection: 'row',
                paddingHorizontal: normalizeWidth(16),
                paddingTop: normalizeHeight(16),
                paddingBottom: normalizeHeight(16),
                gap: normalizeWidth(12),
                backgroundColor: '#1c2238',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.25,
                shadowRadius: 8,
                elevation: 12,
            }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        borderWidth: normalize(1),
                        borderColor: 'rgba(255,255,255,0.25)',
                        borderRadius: normalize(8),
                        paddingVertical: normalizeHeight(12),
                        alignItems: 'center'
                    }}
                    onPress={onCancelExercise}
                >
                    <Text style={{
                        color: 'rgba(255,255,255,0.75)',
                        fontSize: normalize(16),
                        fontWeight: '500'
                    }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: isExerciseValid ? '#3d5a9e' : 'rgba(79,126,232,0.35)',
                        borderRadius: normalize(8),
                        paddingVertical: normalizeHeight(12),
                        alignItems: 'center'
                    }}
                    disabled={!isExerciseValid}
                    onPress={onCreateExercise}
                >
                    <Text style={{
                        color: isExerciseValid ? '#fff' : 'rgba(255,255,255,0.5)',
                        fontSize: normalize(16),
                        fontWeight: '500'
                    }}>Add</Text>
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

export default AddExerciseScreen;
