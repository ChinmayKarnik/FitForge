import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import no_workout_image from '../images/notepad-with-dumbell.png'
import ExerciseSummaryCard from './ExerciseSummaryCard';

const CurrentWorkoutList = (
    {
        workout
    }
) => {
    const exercises = workout?.exercises || [];
    // Group exercises by exerciseId
    const separatedExercises = Object.values(
        exercises.reduce((acc, exercise) => {
            const id = exercise.exerciseId;
            if (!id) return acc;
            if (!acc[id]) {
                acc[id] = [];
            }
            acc[id].push(exercise);
            return acc;
        }, {})
    );
     console.log("ckck exercieses sep exercieses",
        exercises,
        separatedExercises)
    const isNoExercises = !exercises.length;

    const renderItem = ({item}) => {
        return (<ExerciseSummaryCard exercises={item} />)
    }

    if (isNoExercises) {
        return (
            <View 
            style={{
                alignItems:'center',
                marginTop:normalizeHeight(40)
            }}
            >
            <Image 
            style={{
              
                height:normalizeHeight(70),
                aspectRatio: (394.0/364.0),
                marginBottom:normalizeHeight(10)
            }}
            source={no_workout_image}
            />
             <Text
             style={{
                color: '#d6d5df',
                fontWeight:'500',
                fontSize : normalize(18)
             }}
             >No Exercises Logged Yet</Text>
             <Text
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontWeight:'400',
                fontSize : normalize(15),
                marginTop:normalizeHeight(10)
             }}
             >Tap "Start Exercise" to log your first set</Text>
            </View>

        )
    }
    return (
        <View style={{
            flex: 1,
            marginTop:normalizeHeight(10),
            paddingHorizontal: normalize(14),
        }} >
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                marginBottom: normalizeHeight(12)
            }}>
            <Text
            style={{
                color:'#807e97',
                fontWeight:'500',
                fontSize: normalize(14),
                marginRight:normalizeWidth(7)
            }}
            >Completed Exercises</Text>
            <View style={{
               flex:1,
                height:normalizeHeight(1),
                backgroundColor:'#464668'
            }}/>
            </View>
            
                        <FlatList
                                data={separatedExercises}
                                contentContainerStyle ={{
                                    paddingBottom: normalizeHeight(100)
                                }}
                                keyExtractor={(item, index) => item[0].id ? item[0].id.toString() : index.toString()}
                                renderItem={renderItem}
                                scrollEnabled={true}
                                ItemSeparatorComponent={() => (
                                    <View style={{ marginVertical: normalizeHeight(7) }} />
                                )}
                                showsVerticalScrollIndicator = {false}

                        />
        </View>
    );
};

const styles = StyleSheet.create({

});

export default CurrentWorkoutList;
