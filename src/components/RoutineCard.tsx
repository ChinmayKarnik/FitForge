import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';

const RoutineCard = ({ routine }) => {
    const navigation = useNavigation();
    
    const name = routine.name || 'Unnamed Routine';
    
    // Get number of exercises
    const exerciseCount = Array.isArray(routine.exercises) ? routine.exercises.length : 0;
    // Format createdAt date
    let createdAtText = '';
    if (routine.createdAt) {
        const date = new Date(routine.createdAt);
        createdAtText = `Created ${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    }

    const handlePress = () => {
        navigation.navigate('RoutineDetails', { routine });
    };

    return (
        <TouchableOpacity onPress={handlePress} style={{
            borderWidth:normalize(1),
            backgroundColor:'#292f46',
            marginHorizontal: normalize(16),
            borderColor: '#383e55',
            paddingTop:normalizeHeight(12),
            paddingLeft:normalizeWidth(12),
            borderRadius: normalize(12),
            paddingBottom: normalizeHeight(10),
            paddingRight: normalizeWidth(10)
        }}>
            <Text style={
                {
                    fontSize: normalize(18),
                    fontWeight: '600',
                    color: 'white',
                    letterSpacing: 0.2,
                }
            }>{name}</Text>
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                marginTop: normalizeHeight(10),
            }}>
                <Text
                    style={{
                        fontSize:normalize(13),
                        fontWeight: '400',
                        color: 'rgba(255,255,255,0.55)',
                    }}
                >{exerciseCount} {exerciseCount === 1 ? 'exercise' : 'exercises'}</Text>
                <View style={{
                    width:normalizeWidth(3),
                    height:normalizeHeight(3),
                    borderRadius:normalizeWidth(2),
                    backgroundColor:'#9497af',
                    marginHorizontal:normalizeWidth(6),
                    marginTop: normalizeHeight(2)
                }} />
                <Text
                    style={{
                        fontSize:normalize(13),
                        fontWeight: '400',
                        color: 'rgba(255,255,255,0.55)',
                    }}
                >{createdAtText}</Text>
            </View>

            {Array.isArray(routine.exercises) && routine.exercises.length > 0 && (
                <View style={{ marginTop: normalizeHeight(15) }}>
                    {routine.exercises.map((exercise, idx) => {
                        const isLast = idx === routine.exercises.length - 1;
                        // Build sets x reps string
                        let setsReps = '';
                        if (typeof exercise.sets === 'number') {
                            if (typeof exercise.reps === 'number') {
                                setsReps = `${exercise.sets} x ${exercise.reps}`;
                            } else {
                                setsReps = `${exercise.sets} sets`;
                            }
                        }
                        // Build rest string
                        let restText = '';
                        if (typeof exercise.rest === 'number') {
                            restText = `${exercise.rest} sec`;
                        }
                        return (
                            <View key={idx}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: normalize(15),
                                            fontWeight: '400',
                                            color: 'rgba(255,255,255,0.85)',
                                        }}
                                    >{exercise.name || 'Unnamed Exercise'}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text
                                            style={{
                                                fontSize: normalize(12),
                                                fontWeight: '400',
                                                color: 'rgba(255,255,255,0.45)',
                                            }}
                                        >{setsReps}</Text>
                                        <View style={{
                                            width: normalizeWidth(2),
                                            height: normalizeHeight(2),
                                            borderRadius: normalize(1),
                                            backgroundColor: '#808093',
                                            marginHorizontal: normalizeWidth(6),
                                            marginTop: normalizeHeight(2)
                                        }} />
                                        <Text
                                            style={
                                                {
                                                    fontSize: normalize(12),
                                                    fontWeight: '400',
                                                    color: 'rgba(255,255,255,0.45)',
                                                }
                                            }
                                        >{restText}</Text>
                                    </View>
                                </View>
                                {!isLast  && <View style={{
                                    height: normalizeHeight(1),
                                    backgroundColor: '#3c4066',
                                    marginVertical: normalizeHeight(6)
                                }} />}
                            </View>
                        )
                    })}
                </View>
            )}
        </TouchableOpacity>
    );
};

export default RoutineCard;
