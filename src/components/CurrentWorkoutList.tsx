import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import no_workout_image from '../images/notepad-with-dumbell.png'
import ExerciseSummaryCard from './ExerciseSummaryCard';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

const CurrentWorkoutList = (
    {
        workout,
        emptyStateText = 'Tap "Start Exercise" to log your first set',
        horizontalPadding = true,
        showHeaderDivider = true,
        showSectionHeader = true,
        listMaxHeight = undefined,
        onScroll: onScrollProp = undefined,
    }: {
        workout?: any;
        emptyStateText?: string;
        horizontalPadding?: boolean;
        showHeaderDivider?: boolean;
        showSectionHeader?: boolean;
        listMaxHeight?: number;
        onScroll?: (event: any) => void;
    }
) => {
    const exercises = workout?.exercises || [];
    // Group exercises by exerciseId
    const separatedExercisesReverse = Object.values(
        exercises.reduce((acc, exercise) => {
            const id = exercise.exerciseId;
            if (!id) return acc;
            if (!acc[id]) {
                acc[id] = [];
            }
            acc[id].push(exercise);
            return acc;
        }, {})
    )?.reverse();
     console.log("ckck exercieses sep exercieses",
        exercises,
        separatedExercisesReverse)
    const isNoExercises = !exercises.length;
    const [isAtBottom, setIsAtBottom] = useState(false);

    const handleScroll = (event: any) => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
        setIsAtBottom(contentOffset.y + layoutMeasurement.height >= contentSize.height - 16);
    };

    const renderItem = ({item}) => {
        return (<ExerciseSummaryCard exercises={item} />)
    }

    if (isNoExercises) {
        return (
            <View
            style={{
                alignItems:'center',
                marginTop:normalizeHeight(70)
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
             >{emptyStateText}</Text>
            </View>

        )
    }
    return (
        <View style={{
            ...(listMaxHeight ? {} : { flex: 1 }),
            marginTop:normalizeHeight(10),
            paddingHorizontal: horizontalPadding ? normalize(14) : 0,
        }} >
            {showSectionHeader && (
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
            {showHeaderDivider && <View style={{
               flex:1,
                height:normalizeHeight(1),
                backgroundColor:'#464668'
            }}/>}
            </View>
            )}
            
                        <View style={{ position: 'relative' }}>
                            <FlatList
                                data={separatedExercisesReverse}
                                style={listMaxHeight ? { maxHeight: listMaxHeight } : undefined}
                                contentContainerStyle ={{
                                    paddingBottom: normalizeHeight(listMaxHeight ? 16 : 48)
                                }}
                                keyExtractor={(item, index) => item[0].id ? item[0].id.toString() : index.toString()}
                                renderItem={renderItem}
                                scrollEnabled={true}
                                ItemSeparatorComponent={() => (
                                    <View style={{ marginVertical: normalizeHeight(7) }} />
                                )}
                                showsVerticalScrollIndicator={false}
                                onScroll={(e) => { handleScroll(e); onScrollProp?.(e); }}
                                scrollEventThrottle={16}
                            />
                            {listMaxHeight && !isAtBottom && (
                                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: normalizeHeight(60) }} pointerEvents="none">
                                    <Svg height="100%" width="100%">
                                        <Defs>
                                            <LinearGradient id="listFade" x1="0" y1="0" x2="0" y2="1">
                                                <Stop offset="0" stopColor="#262745" stopOpacity="0" />
                                                <Stop offset="1" stopColor="#262745" stopOpacity="1" />
                                            </LinearGradient>
                                        </Defs>
                                        <Rect width="100%" height="100%" fill="url(#listFade)" />
                                    </Svg>
                                </View>
                            )}
                        </View>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default CurrentWorkoutList;
