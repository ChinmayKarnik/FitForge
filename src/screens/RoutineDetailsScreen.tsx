import React from 'react';
import { View, StyleSheet, Text, Image, FlatList, Touchable, TouchableOpacity } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import purple_dumbbell from '../images/purple-dumbbell.png';
import clock from '../images/clock.png'
import pencil from '../images/pencil-slant.png'
import { getEstimatedExerciseTimeSeconds } from '../utils/workoutUtils';

const ShortDivider = ()=>{
    return (
        <View style={{
            height: normalizeHeight(1),
            backgroundColor: 'rgba(255,255,255,0.1)',
            marginVertical: normalizeHeight(5),

        }}>

        </View>
    )
}

const RoutineDetailsScreen = (props) => {
    const { params } = props.route;
    const { routine } = params || {};
    
    let totalEstimatedTimeText = '';
    if (Array.isArray(routine?.exercises)) {
        const totalSeconds = routine.exercises.reduce((sum, ex) => sum + getEstimatedExerciseTimeSeconds(ex), 0);
        const totalMinutes = Math.ceil(totalSeconds / 60);
        totalEstimatedTimeText = `${totalMinutes} min`;
    }
    

    const renderItem = ({ item }) => {
        const exercise = item;
        console.log("ckexercise is ", exercise)
        const name = exercise.name;
        let setRepsText = '';
        if (typeof exercise.sets === 'number') {
            if (typeof exercise.reps === 'number') {
                setRepsText = `${exercise.sets} sets of ${exercise.reps} reps`;
            } else {
                setRepsText = `${exercise.sets} sets`;
            }
        }
        let restText = '';
        if (typeof exercise.rest === 'number') {
            restText = `Rest ${exercise.rest} sec between sets`;
        }
        const estimatedTimeSec = getEstimatedExerciseTimeSeconds(exercise);
        const estimatedTimeMin = Math.ceil(estimatedTimeSec / 60);
        const estimatedTimeText = `Estimated time: ${estimatedTimeMin} min`;
        const areNotes = !!exercise.notes;

        return (
            <View style={{
                marginHorizontal: normalizeWidth(16),
                marginTop: normalizeHeight(12),
                borderWidth: normalize(1),
                borderColor: '#383e55',
                borderRadius: normalize(8),
                backgroundColor: '#292f46',
                paddingHorizontal: normalizeWidth(12),
                paddingTop: normalizeHeight(12),
                paddingBottom: normalizeHeight(10),
            }}>
                <Text style={{ color: '#fff', fontSize: normalize(15) }}>{name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' ,
                    marginTop:normalizeHeight(8)
                }}>
                    <Text
                        style={{
                            fontSize: normalize(12),
                            fontWeight: '400',
                            color: 'rgba(255,255,255,0.45)',
                        }}
                    >{setRepsText}</Text>
                    <View style={{
                        width: normalizeWidth(3),
                        height: normalizeHeight(3),
                        borderRadius: normalize(1),
                        backgroundColor: '#808093',
                        marginHorizontal: normalizeWidth(6),
                        marginTop: normalizeHeight(2)
                    }} />
                    <Text
                        style={{
                            fontSize: normalize(12),
                            fontWeight: '400',
                            color: 'rgba(255,255,255,0.45)',
                        }}
                    >{restText}</Text>
                </View>
                {areNotes ? <ShortDivider /> : <View 
                style={{height:normalizeHeight(4)}}
                />}
                <View style={{flexDirection:'row',alignItems:'center'}}>
                   <Image source={clock}  
                   style={{
                    width: normalizeWidth(12),
                    aspectRatio: (357.0/346.0),
                    marginRight: normalizeWidth(6)
                   }
                   }/>
                    <Text 
                        style={{
                            fontSize: normalize(12),
                            fontWeight: '400',
                            color: 'rgba(255,255,255,0.45)',
                        }}
                    >{estimatedTimeText}</Text>
                </View>
                {areNotes && <ShortDivider />}
                { areNotes &&(<>
                    <Text
                        style={{
                            fontSize: normalize(14),
                            fontWeight: '500',
                            color: '#cfcfe3',
                        }}
                    >Notes</Text>
                    <Text
                        style={{
                            fontSize: normalize(12),
                            fontWeight: '400',
                            color: 'rgba(255,255,255,0.45)',
                            marginTop: normalizeHeight(4)
                        }}
                    >{exercise.notes || ''}</Text>
                </>)}
            </View>
        )
    }
    
    // Calculate number of distinct exercise IDs
    let exercisesText = '';
    if (Array.isArray(routine?.exercises)) {
        const uniqueIds = new Set(routine.exercises.map(ex => ex.exerciseId || ex.id));
        const count = uniqueIds.size;
        exercisesText = `${count} Exercise${count === 1 ? '' : 's'}`;
    }

    // Format createdAt
    let createdAtText = '';
    if (routine?.createdAt) {
        const date = new Date(routine.createdAt);
        createdAtText = `Created ${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    }

    return (
        <View style={styles.container}>
            <View style={{
                width: '100%', borderWidth: 1,
                borderColor: 'rgba(68, 75, 95)',
                alignItems: 'center',
                backgroundColor: 'rgba(36, 42, 65)',
                paddingTop: normalizeHeight(40),
                paddingBottom: normalizeHeight(12)
            }}>
                <Text
                    style={{
                        fontSize: 22,
                        letterSpacing: 1,
                        fontWeight: '700',
                        color: "#fefefe"
                    }}
                >Routine Details</Text>
            </View>

            <View style={{
                marginHorizontal: normalizeWidth(16),
                marginTop: normalizeHeight(20),
                borderWidth: normalize(1),
                borderColor: '#383e55',
                borderRadius: normalize(12),
                backgroundColor: '#292f46',
                paddingHorizontal: normalize(16),
                paddingTop: normalizeHeight(16),
                paddingBottom: normalizeHeight(8),
                flexDirection: 'row',
            }}>
                <Image style={{
                    width: normalizeWidth(30),
                    aspectRatio: (423.0 / 292.0),
                    marginRight: normalizeWidth(10)
                }}
                    source={purple_dumbbell}
                />
                <View style={{ flex: 1 }}>
                    <Text style={{
                        fontSize: normalize(18), fontWeight: '500', color: 'white', marginBottom: normalizeHeight(4),
                        marginTop: -normalizeHeight(5)
                    }}>{routine.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: normalize(13), color: '#9594af' }}>{exercisesText}</Text>
                        <View style={{
                            width: normalizeWidth(3),
                            height: normalizeHeight(3),
                            borderRadius: normalize(1),
                            backgroundColor: '#9594af',
                            marginHorizontal: normalizeWidth(6),
                            marginTop: normalizeHeight(2)
                        }} />
                        <Text style={{ fontSize: normalize(13), color: '#9594af' }}>{createdAtText}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={{
                backgroundColor: '#2c3158',
                borderWidth: normalize(1),
                borderColor: '#3d4063',
                marginHorizontal: normalizeWidth(16),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: normalizeHeight(10),
                marginTop: normalizeHeight(12),
                borderRadius: normalize(10),
            }}> 
               <Image source={pencil} 
               style={{
                height:normalizeHeight(16),
                width: (246.0/239.0) * normalizeHeight(16),
                marginRight: normalizeWidth(8)
               }}
               />
                <Text
                    style={{
                        fontSize: normalize(16),
                        lineHeight: normalize(22),
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: '400',
                        letterSpacing: normalize(0.3),
                    }}
                >Edit Routine</Text>
            </TouchableOpacity>
            <FlatList
                data={Array.isArray(routine?.exercises) ? routine.exercises : []}
                keyExtractor={(item, idx) => (item.id ? String(item.id) : String(idx))}
                renderItem={renderItem}
                ListFooterComponent={() => {
                    return (
                        <View style={{ flexDirection: 'row', alignItems: 'center',
                            marginHorizontal: normalizeWidth(16),
                            marginTop: normalizeHeight(8),
                         }}>
                            <Image source={clock}
                                style={{
                                    width: normalizeWidth(12),
                                    aspectRatio: (357.0 / 346.0),
                                    marginRight: normalizeWidth(6)
                                }
                                } />
                            <Text
                                style={{
                                    fontSize: normalize(13),
                                    lineHeight: normalize(20),
                                    color: 'rgba(255,255,255,0.45)',
                                    fontWeight: '400',
                                    letterSpacing: normalize(0.2),
                                }}
                            >Total Estimated Time: <Text
                            style={{color: 'rgba(255,255,255,0.7)',
                                fontWeight: '500'
                            }}
                            >{totalEstimatedTimeText}</Text></Text>
                        </View>)
                }}
            />

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
