import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import no_workouts_image from '../images/no-workouts.png';
import { normalize, normalizeHeight } from '../utils/normalize';

const ActivityListEmpty = () => {
    const navigation = useNavigation();
    const aspectRatio = 1077.0/694.0;
    const height = normalizeHeight(115)
    const width = height * aspectRatio;

    const onTrackWorkout = () => {
        navigation.navigate('TrackWorkout');
    }
    
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            marginTop: normalizeHeight(150)
        }}>
            <Image
            style={{
                width:width,
                height:height,
               aspectRatio: aspectRatio,
            }}
            source={no_workouts_image}
             />

            <Text
                style={
                    {
                        fontSize: normalize(22),
                        fontWeight: "600",
                        lineHeight: normalizeHeight(26),
                        color: "rgba(255, 255, 255, 1)",
                        textAlign: "center",
                        letterSpacing: -0.2,
                        marginBottom: normalizeHeight(8),
                        marginTop: normalizeHeight(20),
                    }
                }
            >No workouts yet</Text>
            <Text
                style={
                    {
                        fontSize: normalize(15),
                        fontWeight: "400",
                        lineHeight: normalizeHeight(20),
                        color: "rgba(255, 255, 255, 0.7)",
                        textAlign: "center",
                        marginBottom: normalizeHeight(14),
                    }
                }
            >You haven't logged any workouts</Text>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#2f4880',
                                borderRadius: normalize(12),
                                paddingVertical: normalize(12),
                                paddingHorizontal: normalize(40),
                                borderWidth: normalize(1),
                                borderColor: 'rgba(255,255,255,0.2)',
                                marginTop: normalizeHeight(8),
                                alignSelf: 'center',
                            }}
                            onPress={onTrackWorkout}
                        >
                            <Text style={{ color: '#ffffff', fontSize: normalize(15), fontWeight: '600' }}>
                                Track Workout
                            </Text>
                        </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
  
});

export default ActivityListEmpty;
