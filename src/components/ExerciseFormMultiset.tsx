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
    console.log('ckck total sets starting ',totalSets)
    const data = useRef(Array.from({ length: totalSets }, () => ({})));
    const exercise = databaseController.getExerciseById(exerciseId);
    const requiredParameters = exercise?.requiredParameters;
    const exerciseName = exercise?.name || 'Exercise';

    const updateParameterWithValue = (parameterName, value) => {
        data.current[currentSetNumber][parameterName] = value;
    }

    const onSave = () => {
        if (currentSetNumber < totalSets-1 ) {
            setCurrentSetNumber(currentSetNumber + 1);
        } else {
            logExercisesForParent(exercise, data.current);
            closeModal();
        }
    }

    return (
        <View style={{
            borderRadius: normalize(10),
        }}>
            {/* Header with exercise name and set info */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: normalizeHeight(16),
            }}>
                <Text style={{
                    fontSize: normalize(18),
                    fontWeight: '600',
                    lineHeight: normalize(24),
                    letterSpacing: normalize(0.3),
                    color: '#F2F4F8',
                }}>
                    {exerciseName} [Set {currentSetNumber+1} of {totalSets}]
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
                marginTop: normalizeHeight(8),
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
