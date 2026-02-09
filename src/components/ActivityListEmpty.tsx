import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import no_workouts_image from '../images/no-workouts.png';
import { normalize, normalizeHeight } from '../utils/normalize';

const ActivityListEmpty = () => {
    const navigation = useNavigation();
    const aspectRatio = 1077.0/694.0;
    const height = normalizeHeight(130)
    const width = height * aspectRatio;

    const onTrackWorkout = () => {
        navigation.navigate('TrackWorkout');
    }
    
    return (
        <View style={{
            alignItems:'center',
            marginTop: normalizeHeight(70)
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
                        fontSize: normalize(20),
                        fontWeight: "600",
                        lineHeight: 28,
                        color: "rgba(255, 255, 255, 0.95)",
                        textAlign: "center",
                        letterSpacing: -0.2,
                        marginBottom: normalizeHeight(8),
                        marginTop: normalizeHeight(24),
                    }
                }
            >No workouts yet</Text>
            <Text
                style={
                    {
                        fontSize: normalize(17),
                        fontWeight: "400",
                        lineHeight: normalize,
                        color: "rgba(255, 255, 255, 0.65)",
                        textAlign: "center",
                        marginBottom: normalizeHeight(24),
                    }
                }
            >You haven't logged any workouts</Text>
                        <View>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#23253A',
                                        borderRadius: normalize(30),
                                        paddingVertical: normalize(12),
                                        paddingHorizontal: normalize(32),
                                        borderWidth: normalize(1),
                                        borderColor: '#414461',
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.2,
                                        shadowRadius: normalize(4),
                                        elevation: normalize(3),
                                        marginTop: normalizeHeight(8),
                                    }}
                                    onPress={onTrackWorkout}
                                >
                                    <Text style={{ color: '#e5e4ec', fontSize: normalize(18), fontWeight: '500' }}>
                                        Track a Workout
                                    </Text>
                                </TouchableOpacity>
                        </View>
        </View>
    )
}
const styles = StyleSheet.create({
  
});

export default ActivityListEmpty;
