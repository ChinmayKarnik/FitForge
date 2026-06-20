
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { normalizeHeight, normalize, normalizeWidth } from '../utils/normalize';
import { databaseController } from '../data';
import ExerciseCard from '../components/ExerciseCard';
import magnifying_glass from '../images/magnifying-glass-white.png'
import cross_icon from '../images/cross-icon-white.png'
import white_plus from '../images/white-plus.png'
import white_left_arrow from '../images/white-left-arrow.png'
import notepad_with_glass from '../images/notepad-with-glass.png'

const ExercisesScreen = () => {
    const navigation = useNavigation();
    const exercises = databaseController.getAllExercises();
    const [searchText, setSearchText] = useState('');
    const [isAtBottom, setIsAtBottom] = useState(false);

    const handleScroll = (event: any) => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
        setIsAtBottom(contentOffset.y + layoutMeasurement.height >= contentSize.height - 16);
    };

    const filteredExercises = exercises
        .filter(exercise => exercise.name.toLowerCase().includes(searchText.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));

    const renderItem = ({ item }) => {
        return (
            <ExerciseCard exercise = {item} />
        )
    }

    const renderSeparator = () => <View style={{ height: normalizeHeight(12) }} />;

    return (
        <View style={styles.bg}>
            <View style={{
                width: '100%', borderWidth: 1,
                borderColor: 'rgba(68, 75, 95)',
                alignItems: 'center',
                backgroundColor: 'rgba(36, 42, 65)',
                paddingTop: normalizeHeight(40),
                paddingBottom: normalizeHeight(12)
            }}>
                <TouchableOpacity
                    style={{ position: 'absolute', top: normalizeHeight(46), left: normalizeWidth(16) }}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        style={{
                            width: normalizeWidth(9),
                            height: normalizeWidth(9) * (86.0 / 51.0),
                            aspectRatio: (51.0 / 86.0),
                            resizeMode: 'stretch',
                        }}
                        source={white_left_arrow}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 22,
                        letterSpacing: 1,
                        fontWeight: '700',
                        color: "#fefefe"
                    }}
                >Exercises</Text>
            </View>
           
           <View
           style={{
  backgroundColor: '#292f46',
                    borderColor: '#383e55',
                    borderWidth: normalize(1),
                    borderRadius: normalize(8),
                     paddingHorizontal: normalizeWidth(12),
                   // paddingVertical: normalizeHeight(10),
                    marginHorizontal: normalizeWidth(16),
                    marginTop: normalizeHeight(12),
                    marginBottom: normalizeHeight(12),
                    flexDirection: 'row',
                    alignItems: 'center',
                   
            
           }}>
            <Image style={{
                width:normalizeWidth(17),
                 height: normalizeHeight(17),
                 marginRight: normalizeWidth(4),
                 tintColor: '#757689'
                 }} source={magnifying_glass} />
            <TextInput
                style={{
                    flex:1,
                   fontSize: normalize(14),
                    color: '#fff',
                    paddingTop: normalizeHeight(10),
                    paddingBottom:normalizeHeight(10),
                   
                }}
                placeholder="Search exercises..."
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={searchText}
                onChangeText={setSearchText}
            />
            {searchText.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchText('')}
                activeOpacity={0.7}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <View style={{
                  width: normalize(18),
                  height: normalize(18),
                  borderRadius: normalize(9),
                  borderWidth: normalize(1),
                  borderColor: 'rgba(255,255,255,0.38)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: -normalizeWidth(5),
                }}>
                  <Image
                    source={cross_icon}
                    style={{
                      width: normalize(7),
                      height: normalize(7),
                      tintColor: 'rgba(255,255,255,0.62)',
                    }}
                  />
                </View>
              </TouchableOpacity>
            )}
            </View>

            <View style={{ flex: 1, position: 'relative' }}>
                <FlatList
                    data={filteredExercises}
                    keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                    renderItem={renderItem}
                    ItemSeparatorComponent={renderSeparator}
                    contentContainerStyle={{
                        paddingBottom: normalizeHeight(16)
                     }}
                     showsVerticalScrollIndicator = {false}
                     style={{ flex: 1 }}
                     onScroll={handleScroll}
                     scrollEventThrottle={16}
                     ListEmptyComponent={
                        searchText.length > 0 ? (
                            <View style={styles.emptyState}>
                                <Image source={notepad_with_glass} style={styles.emptyIcon} />
                                <Text style={styles.emptyTitle}>No exercises found</Text>
                                <Text style={styles.emptySubtitle}>
                                    No results for{' '}
                                    <Text style={styles.emptySubtitleHighlight}>"{searchText}"</Text>
                                </Text>
                            </View>
                        ) : null
                    }
                />
                {!isAtBottom && (
                    <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: normalizeHeight(40) }} pointerEvents="none">
                        <Svg height="100%" width="100%">
                            <Defs>
                                <LinearGradient id="listFade" x1="0" y1="0" x2="0" y2="1">
                                    <Stop offset="0" stopColor="#1c2238" stopOpacity="0" />
                                    <Stop offset="1" stopColor="#1c2238" stopOpacity="1" />
                                </LinearGradient>
                            </Defs>
                            <Rect width="100%" height="100%" fill="url(#listFade)" />
                        </Svg>
                    </View>
                )}
            </View>
            <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={() => {
                    if (typeof navigation !== 'undefined') {
                        navigation.navigate('AddExercise');
                    }
                }}
            >
                <Image style={
                    {
                        width: normalizeWidth(16),
                        height: normalizeHeight(16),
                        marginRight: normalizeWidth(8)
                    }
                } source={white_plus} />
                <Text
                    style={
                        {
                            fontSize: normalize(16),
                            fontWeight: '500',
                            color: '#FFFFFF',
                            letterSpacing: 0.2,
                        }
                    }
                >Add Exercise</Text>
            </TouchableOpacity>
        </View>)
};

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#1c2238',
    },
    addButtonContainer: {
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 10,
        borderWidth: normalize(1),
        borderColor: 'gray',
        backgroundColor: '#31467b',
        marginHorizontal: normalizeWidth(20),
        marginTop: normalizeHeight(12),
        marginBottom: normalizeHeight(20),
        borderRadius: normalize(8),
        paddingVertical: normalizeHeight(12),
        flexDirection: 'row',
        justifyContent: 'center',
    },
    emptyState: {
        alignItems: 'center',
        paddingTop: normalizeHeight(30),
        paddingBottom: normalizeHeight(16),
    },
    emptyIcon: {
        width: normalizeWidth(70),
        height: normalizeWidth(70) * (588.0 / 551.0),
        tintColor: 'rgba(255,255,255,0.6)',
        marginBottom: normalizeHeight(20),
    },
    emptyTitle: {
        fontSize: normalize(20),
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: normalizeHeight(6),
        letterSpacing: 0.2,
    },
    emptySubtitle: {
        fontSize: normalize(14),
        fontWeight: '400',
        color: 'rgba(255,255,255,0.55)',
    },
    emptySubtitleHighlight: {
        color: '#67a4f9',
        fontWeight: '500',
    },
});

export default ExercisesScreen;

