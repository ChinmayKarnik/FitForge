import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import clock from '../images/clock.png';
import pencil from '../images/pencil-slant.png';
import white_left_arrow from '../images/white-left-arrow.png';
import stopwatch from '../images/stopwatch-white.png';
import plates_stack_2 from '../images/plates-stack-2.png';
import dumbbell from '../images/dumbbell.png';
import { getEstimatedExerciseTimeSeconds } from '../utils/workoutUtils';

const ACCENT = '#4f7ee8';

const Dot = () => (
    <View style={{
        width: normalizeWidth(3),
        height: normalizeHeight(3),
        borderRadius: normalize(2),
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginHorizontal: normalizeWidth(6),
        marginTop: normalizeHeight(1),
    }} />
);

const ShortDivider = () => (
    <View style={{
        height: normalizeHeight(1),
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginVertical: normalizeHeight(10),
    }} />
);

const RoutineDetailsScreen = (props) => {
    const { params } = props.route;
    const { routine } = params || {};
    const { navigation } = props;

    let totalEstimatedTimeText = '';
    if (Array.isArray(routine?.exercises)) {
        const totalSeconds = routine.exercises.reduce((sum, ex) => sum + getEstimatedExerciseTimeSeconds(ex), 0);
        const totalMinutes = Math.ceil(totalSeconds / 60);
        totalEstimatedTimeText = `${totalMinutes} min`;
    }

    let exerciseCount = 0;
    if (Array.isArray(routine?.exercises)) {
        const uniqueIds = new Set(routine.exercises.map(ex => ex.exerciseId || ex.id));
        exerciseCount = uniqueIds.size;
    }
    const exercisesText = `${exerciseCount} ${exerciseCount === 1 ? 'exercise' : 'exercises'}`;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'rgba(68, 75, 95)',
                alignItems: 'center',
                backgroundColor: 'rgba(36, 42, 65)',
                paddingTop: normalizeHeight(40),
                paddingBottom: normalizeHeight(12),
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
                <Text style={{
                    fontSize: 22,
                    letterSpacing: 1,
                    fontWeight: '700',
                    color: '#fefefe',
                }}>Routine Details</Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: normalizeHeight(24) }}
            >
                {/* Hero Card */}
                <View style={{
                    flexDirection: 'row',
                    marginHorizontal: normalizeWidth(16),
                    marginTop: normalizeHeight(16),
                    borderRadius: normalize(12),
                    backgroundColor: '#283050',
                    borderWidth: normalize(1),
                    borderColor: '#3d4563',
                    overflow: 'hidden',
                    elevation: 6,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                }}>
                    <View style={{ width: normalizeWidth(6), backgroundColor: ACCENT }} />
                    <View style={{ flex: 1, paddingHorizontal: normalizeWidth(14), paddingVertical: normalizeHeight(14) }}>
                        {/* Routine name + Edit pill */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text
                                style={{
                                    fontSize: normalize(20),
                                    fontWeight: '700',
                                    color: '#ffffff',
                                    flex: 1,
                                    marginRight: normalizeWidth(10),
                                }}
                                numberOfLines={1}
                            >{routine?.name}</Text>
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderWidth: normalize(1),
                                    borderColor: ACCENT,
                                    borderRadius: normalize(20),
                                    paddingHorizontal: normalizeWidth(10),
                                    paddingVertical: normalizeHeight(5),
                                }}
                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                onPress={() => navigation.navigate('EditRoutine', { routine })}
                            >
                                <Image
                                    source={pencil}
                                    style={{
                                        width: normalizeWidth(11),
                                        height: normalizeWidth(11) * (239.0 / 246.0),
                                        tintColor: ACCENT,
                                        marginRight: normalizeWidth(4),
                                    }}
                                />
                                <Text style={{
                                    color: ACCENT,
                                    fontSize: normalize(13),
                                    fontWeight: '600',
                                }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Chip tags */}
                        <View style={{ flexDirection: 'row', marginTop: normalizeHeight(12), gap: normalizeWidth(8) }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderWidth: normalize(1),
                                borderColor: 'rgba(79,126,232,0.45)',
                                borderRadius: normalize(20),
                                paddingHorizontal: normalizeWidth(10),
                                paddingVertical: normalizeHeight(5),
                            }}>
                                <Image
                                    source={dumbbell}
                                    style={{
                                        width: normalizeWidth(15),
                                        height: normalizeWidth(15) * (346.0 / 539.0),
                                        tintColor: ACCENT,
                                        marginRight: normalizeWidth(4),
                                        resizeMode: 'contain',
                                    }}
                                />
                                <Text style={{
                                    color: 'rgba(255,255,255,0.75)',
                                    fontSize: normalize(12),
                                    fontWeight: '500',
                                }}>{exercisesText}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderWidth: normalize(1),
                                borderColor: 'rgba(79,126,232,0.45)',
                                borderRadius: normalize(20),
                                paddingHorizontal: normalizeWidth(10),
                                paddingVertical: normalizeHeight(5),
                            }}>
                                <Image
                                    source={clock}
                                    style={{
                                        width: normalizeWidth(12),
                                        height: normalizeWidth(12) * (346.0 / 357.0),
                                        tintColor: ACCENT,
                                        marginRight: normalizeWidth(5),
                                    }}
                                />
                                <Text style={{
                                    color: 'rgba(255,255,255,0.75)',
                                    fontSize: normalize(12),
                                    fontWeight: '500',
                                }}>{totalEstimatedTimeText}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Exercise Cards */}
                {Array.isArray(routine?.exercises) && routine.exercises.map((exercise, idx) => {
                    const name = exercise.name;
                    let setRepsText = '';
                    if (typeof exercise.sets === 'number') {
                        if (typeof exercise.reps === 'number') {
                            setRepsText = `${exercise.sets}×${exercise.reps}`;
                        } else {
                            setRepsText = `${exercise.sets} sets`;
                        }
                    }
                    let restText = '';
                    if (typeof exercise.rest === 'number') {
                        restText = `${exercise.rest}s rest`;
                    }
                    const estimatedTimeSec = getEstimatedExerciseTimeSeconds(exercise);
                    const estimatedTimeMin = Math.ceil(estimatedTimeSec / 60);
                    const estimatedTimeText = `~${estimatedTimeMin} min`;
                    const areNotes = !!exercise.notes;

                    return (
                        <View key={idx} style={{
                            flexDirection: 'row',
                            marginHorizontal: normalizeWidth(16),
                            marginTop: normalizeHeight(12),
                            borderRadius: normalize(12),
                            backgroundColor: '#252d47',
                            borderWidth: normalize(1),
                            borderColor: '#3d4563',
                            overflow: 'hidden',
                            elevation: 6,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 8,
                        }}>
                            <View style={{ width: normalizeWidth(6), backgroundColor: ACCENT }} />
                            <View style={{ flex: 1, paddingHorizontal: normalizeWidth(14), paddingTop: normalizeHeight(12), paddingBottom: normalizeHeight(12) }}>
                                <Text style={{
                                    fontSize: normalize(17),
                                    fontWeight: '700',
                                    color: '#ffffff',
                                }}>{name}</Text>
                                {/* Stats line */}
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: normalizeHeight(8),
                                }}>
                                    <Image
                                        source={plates_stack_2}
                                        style={{
                                            width: normalizeWidth(14),
                                            height: normalizeWidth(14) * (425.0 / 469.0),
                                            tintColor: ACCENT,
                                            marginRight: normalizeWidth(4),
                                            resizeMode: 'contain',
                                        }}
                                    />
                                    <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: normalize(12) }}>{setRepsText}</Text>
                                    <Dot />
                                    <Image
                                        source={clock}
                                        style={{
                                            width: normalizeWidth(12),
                                            height: normalizeWidth(12) * (346.0 / 357.0),
                                            tintColor: ACCENT,
                                            marginRight: normalizeWidth(4),
                                        }}
                                    />
                                    <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: normalize(12) }}>{restText}</Text>
                                    <Dot />
                                    <Image
                                        source={stopwatch}
                                        style={{
                                            width: normalizeWidth(12),
                                            height: normalizeWidth(12) * (395.0 / 346.0),
                                            tintColor: ACCENT,
                                            marginRight: normalizeWidth(4),
                                            resizeMode: 'contain',
                                        }}
                                    />
                                    <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: normalize(12) }}>{estimatedTimeText}</Text>
                                </View>
                                {areNotes && <ShortDivider />}
                                {areNotes && (
                                    <Text style={{
                                        fontSize: normalize(13),
                                        color: 'rgba(255,255,255,0.4)',
                                        lineHeight: normalize(19),
                                    }}>{exercise.notes}</Text>
                                )}
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
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

export default RoutineDetailsScreen;
