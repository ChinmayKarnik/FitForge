import React from 'react';
import { View, StyleSheet, Text, Image, FlatList } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import purple_dumbbell from '../images/purple-dumbbell.png';
import clock from '../images/clock.png'
import { get } from 'react-native/Libraries/NativeComponent/NativeComponentRegistry';
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


    const renderItem = ({ item }) => {
        const exercise = item;
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
                <ShortDivider />
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
                <ShortDivider />
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
                >Don't go to failure. Try to pick a weight so that you can complete all reps with good form.</Text>
            </View>
        )
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
                    }}>Push Day</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: normalize(13), color: '#9594af' }}>3 Exercises</Text>
                        <View style={{
                            width: normalizeWidth(3),
                            height: normalizeHeight(3),
                            borderRadius: normalize(1),
                            backgroundColor: '#9594af',
                            marginHorizontal: normalizeWidth(6),
                            marginTop: normalizeHeight(2)
                        }} />
                        <Text style={{ fontSize: normalize(13), color: '#9594af' }}>Created 8 Feb 2026</Text>
                    </View>
                </View>
            </View>

            <FlatList
                data={Array.isArray(routine?.exercises) ? routine.exercises : []}
                keyExtractor={(item, idx) => (item.id ? String(item.id) : String(idx))}
                renderItem={renderItem}
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
