import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';

const ACCENT = '#4f7ee8';

const RoutineCard = ({ routine }) => {
    const navigation = useNavigation();

    const name = routine.name || 'Unnamed Routine';
    const exerciseCount = Array.isArray(routine.exercises) ? routine.exercises.length : 0;

    const handlePress = () => {
        navigation.navigate('RoutineDetails', { routine });
    };

    const formatSetsReps = (exercise) => {
        if (typeof exercise.sets === 'number' && typeof exercise.reps === 'number') {
            return `${exercise.sets}×${exercise.reps}`;
        }
        if (typeof exercise.sets === 'number') {
            return `${exercise.sets} ${exercise.sets === 1 ? 'set' : 'sets'}`;
        }
        return '';
    };

    const formatRest = (exercise) => {
        if (typeof exercise.rest === 'number') {
            return `${exercise.rest}s`;
        }
        return '';
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.85}
            style={{
                flexDirection: 'row',
                marginHorizontal: normalizeWidth(16),
                borderRadius: normalize(12),
                backgroundColor: '#252d47',
                borderWidth: normalize(1),
                borderColor: '#3d4563',
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6,
            }}
        >
            {/* Accent bar */}
            <View style={{
                width: normalizeWidth(6),
                backgroundColor: ACCENT,
            }} />

            {/* Card content */}
            <View style={{ flex: 1, paddingHorizontal: normalizeWidth(14), paddingVertical: normalizeHeight(14) }}>

                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text
                        style={{
                            fontSize: normalize(19),
                            fontWeight: '700',
                            color: '#FFFFFF',
                            letterSpacing: 0.3,
                            flex: 1,
                            marginRight: normalizeWidth(8),
                        }}
                        numberOfLines={1}
                    >{name}</Text>
                    <View style={{
                        backgroundColor: '#3a5299',
                        borderRadius: normalize(6),
                        paddingHorizontal: normalizeWidth(8),
                        paddingVertical: normalizeHeight(3),
                    }}>
                        <Text style={{
                            fontSize: normalize(11),
                            fontWeight: '600',
                            color: '#ffffff',
                        }}>{exerciseCount} {exerciseCount === 1 ? 'exercise' : 'exercises'}</Text>
                    </View>
                </View>

                {/* Separator */}
                <View style={{
                    height: normalizeHeight(1),
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    marginTop: normalizeHeight(12),
                    marginBottom: normalizeHeight(8),
                }} />

                {/* Exercise rows */}
                {Array.isArray(routine.exercises) && routine.exercises.map((exercise, idx) => {
                    const setsReps = formatSetsReps(exercise);
                    const rest = formatRest(exercise);
                    return (
                        <View
                            key={idx}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: normalizeHeight(8),
                            }}
                        >
                            <Text
                                style={{
                                    flex: 1,
                                    fontSize: normalize(14),
                                    fontWeight: '400',
                                    color: '#ffffff',
                                }}
                                numberOfLines={1}
                            >{exercise.name || 'Unnamed Exercise'}</Text>
                            <Text style={{
                                fontSize: normalize(13),
                                color: 'rgba(255,255,255,0.50)',
                                width: normalizeWidth(48),
                                textAlign: 'center',
                            }}>{setsReps}</Text>
                            <Text style={{
                                fontSize: normalize(13),
                                color: 'rgba(255,255,255,0.50)',
                                width: normalizeWidth(40),
                                textAlign: 'right',
                            }}>{rest}</Text>
                        </View>
                    );
                })}
            </View>
        </TouchableOpacity>
    );
};

export default RoutineCard;
