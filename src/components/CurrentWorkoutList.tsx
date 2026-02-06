import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { normalize, normalizeHeight } from '../utils/normalize';
import no_workout_image from '../images/notepad-with-dumbell.png'

const CurrentWorkoutList = (
    {
        workout
    }
) => {
    const exercises = workout?.exercises || [];
    const isNoExercises = !exercises.length;

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
        <View >
            <Text>CurrentWorkoutList Component</Text>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default CurrentWorkoutList;
