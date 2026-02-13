
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalizeHeight, normalize, normalizeWidth } from '../utils/normalize';
import { databaseController } from '../data';
import ExerciseCard from '../components/ExerciseCard';
import magnifying_glass from '../images/magnifying-glass-white.png'
import white_plus from '../images/white-plus.png'

const ExercisesScreen = () => {
    const navigation = useNavigation();
    const exercises = databaseController.getAllExercises();
    const [searchText, setSearchText] = useState('');

    const filteredExercises = exercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchText.toLowerCase())
    );

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
                    marginBottom: normalizeHeight(20),
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
            </View>

            <FlatList
                data={filteredExercises}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                renderItem={renderItem}
                ItemSeparatorComponent={renderSeparator}
                contentContainerStyle={{ 
                    paddingBottom: normalizeHeight(100)
                 }}
                 showsVerticalScrollIndicator = {false}
            />
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
        position: 'absolute',
        bottom: normalizeHeight(30),
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 10, // for Android
        borderWidth: normalize(1),
        borderColor: 'gray',
        backgroundColor: '#31467b',
        marginHorizontal: normalizeWidth(20),
        borderRadius: normalize(8),
        paddingVertical: normalizeHeight(12),
        flexDirection: 'row',
        justifyContent:'center',
    },
    addButtonText: {
        backgroundColor: '#4f5b93',
        color: '#fff',
        fontSize: normalize(18),
        // Remove elevation from text, keep it on container
    },
});

export default ExercisesScreen;

