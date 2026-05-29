import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { normalize, normalizeWidth, normalizeHeight } from '../utils/normalize';
import { databaseController } from '../data';
import RequiredParameterField from './RequiredParameterField';
import cross_icon from '../images/cross-icon-white.png';
import { CurrentRenderContext } from '@react-navigation/native';

const ExerciseFormMultiset = ({
    exerciseId,
    totalSets,
    closeModal,
    logExercisesForParent
}) => {

    const [currentSetNumber, setCurrentSetNumber] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    console.log('ckck total sets starting ',totalSets)
    const data = useRef(Array.from({ length: totalSets }, () => ({})));
    const exercise = databaseController.getExerciseById(exerciseId);
    const requiredParameters = exercise?.requiredParameters;
    const exerciseName = exercise?.name || 'Exercise';

    const updateParameterWithValue = (parameterName, value) => {
        data.current[currentSetNumber][parameterName] = value;
    }

    const onSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            if (currentSetNumber < totalSets - 1) {
                setCurrentSetNumber(currentSetNumber + 1);
            } else {
                logExercisesForParent(exercise, data.current);
                closeModal();
            }
        }, 1000);
    }

    return (
        <View style={{
            borderRadius: normalize(10),
        }}>
            {/* Header: exercise name + close button */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: normalizeHeight(14),
            }}>
                <Text style={{
                    fontSize: normalize(20),
                    fontWeight: '700',
                    color: '#F2F4F8',
                    flex: 1,
                    marginRight: normalize(12),
                }}>
                    {exerciseName}
                </Text>
                <TouchableOpacity
                    onPress={closeModal}
                    hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
                >
                    <Image
                        source={cross_icon}
                        style={{
                            width: normalize(12),
                            height: normalize(12),
                            tintColor: '#cecfd5'
                        }}
                    />
                </TouchableOpacity>
            </View>

            {/* Progress section: segmented bar + set counter */}
            <View style={{ marginBottom: normalizeHeight(12) }}>
                <View style={{ flexDirection: 'row' }}>
                    {Array.from({ length: totalSets }, (_, i) => (
                        <View
                            key={i}
                            style={{
                                flex: 1,
                                height: normalize(6),
                                borderRadius: normalize(3),
                                backgroundColor: isSaving && i === currentSetNumber ? '#4caf50' : i <= currentSetNumber ? '#357ffc' : '#38437e',
                                marginRight: i < totalSets - 1 ? normalizeWidth(4) : 0,
                            }}
                        />
                    ))}
                </View>
                {isSaving ? (
                    <Text style={{
                        color: '#4caf50',
                        fontSize: normalize(14),
                        fontWeight: '700',
                        marginTop: normalizeHeight(6),
                        textAlign: 'center',
                    }}>
                        ✓  Saved
                    </Text>
                ) : (
                    <Text style={{
                        color: '#357ffc',
                        fontSize: normalize(14),
                        fontWeight: '700',
                        letterSpacing: normalize(2),
                        marginTop: normalizeHeight(6),
                        textAlign: 'center',
                    }}>
                        SET {currentSetNumber + 1} OF {totalSets}
                    </Text>
                )}
            </View>

            <View style={{ height: 1, backgroundColor: '#4a5878', marginBottom: normalizeHeight(10) }} />

            <View>
                {
                    requiredParameters?.map((parameter, index) => {
                        const isLast = index === requiredParameters.length - 1;
                        return (
                            <RequiredParameterField
                                parameter={parameter}
                                key={`${parameter.name}-${currentSetNumber}`}
                                showBottomSeparator={!isLast}
                                updateParameterWithValue={updateParameterWithValue}
                            />
                        )
                    })
                }
            </View>

            {/* Save and Discard buttons */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: normalizeHeight(16),
            }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: '#a83232',
                        borderRadius: normalize(8),
                        paddingVertical: normalize(12),
                        marginRight: normalize(4),
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: '#D97A7A',
                        shadowColor: '#a83232',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                        elevation: 2,
                    }}
                    onPress={closeModal}
                    activeOpacity={0.85}
                >
                    <Text style={{
                        color: '#fff',
                        fontWeight: '700',
                        fontSize: 18,
                        letterSpacing: 0.5
                    }}>
                        Discard
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: '#4666b0',
                        borderRadius: normalize(8),
                        paddingVertical: normalize(12),
                        marginLeft: normalize(4),
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: '#7A8CB3',
                        shadowColor: '#4666b0',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                        elevation: 2,
                    }}
                    onPress={onSave}
                    disabled={isSaving}
                    activeOpacity={0.85}
                >
                    <Text style={{
                        color: '#fff',
                        fontWeight: '700',
                        fontSize: 18,
                        letterSpacing: 0.5
                    }}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ExerciseFormMultiset;
