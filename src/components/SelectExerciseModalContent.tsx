import React, { useMemo, useState } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, FlatList, TextInput } from 'react-native';
import { normalize, normalizeWidth, normalizeHeight } from '../utils/normalize';
import cross_icon from '../images/cross-icon-white.png';
import magnifying_glass from '../images/magnifying-glass-white.png';
import checkbox_blue_bg from '../images/checkbox-blue-bg.png';
import { databaseController, Exercise } from '../data';

const SelectExerciseModalContent = ({
    onSelectExercise,
    closeModal
}) => {
    const exercises = databaseController.getAllExercises();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedExercise, setSelectedExercise] = useState(null);
    const isExerciseSelected = !!selectedExercise
    const filteredExercises = useMemo(() => {
        if (!searchQuery.trim()) {
            return exercises;
        }
        return exercises.filter((exercise) =>
            exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [exercises, searchQuery]);

    return (
        <>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: normalize(16),
            }}>
                <Text style={styles.modalTitle}>Select Exercise</Text>
                <TouchableOpacity
                    onPress={closeModal}
                    hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}>
                    <Image
                        source={cross_icon}
                        style={{
                            width: normalize(12), height: normalize(12),
                            tintColor: '#cecfd5'
                        }} />
                </TouchableOpacity>
            </View>

            <View style={styles.searchInput}>
                <Image source={magnifying_glass}
                    style={{
                        height: normalize(17),
                        width: normalize(17),
                        marginRight: normalizeWidth(5),
                        tintColor: '#757689',
                        aspectRatio: 1,
                    }} />
                <TextInput
                    style={{
                        fontSize: normalize(14), color: 'white',
                        width: '100%'
                    }}
                    placeholder="Search exercises..."
                    hitSlop={{ left: 50, right: 50, top: 5, bottom: 5 }}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor={'#757689'}
                />
            </View>

            <FlatList
                                    data={filteredExercises}
                                    keyExtractor={(item) => item.id}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => {
                                        const isSelected = selectedExercise?.id === item.id;
                                        return (
                                            <TouchableOpacity
                                                style={styles.exerciseItem}
                                                onPress={() => {
                                                    setSelectedExercise(isSelected ? null : item)}}
                                            >
                                                <Text style={styles.exerciseItemText}>{item.name}</Text>
                                                {
                                                    isSelected ? (<Image
                                                        source={checkbox_blue_bg}
                                                        style={{
                                                            width: normalize(20),
                                                            height: normalize(20),
                                                        }}
                                                    />) :
                                                        (<View style={{
                                                            width: normalize(20),
                                                            height: normalize(20),
                                                            borderRadius: normalize(20),
                                                            borderColor: '#5f637a',
                                                            borderWidth: normalize(1)
                                                        }} />
            
            
                                                        )
                                                }
                                            </TouchableOpacity>
                                        )
                                    }
            
                                    }
                                    ListEmptyComponent={
                                        <View style={styles.emptyContainer}>
                                            <Text style={styles.emptyText}>No exercises found</Text>
                                        </View>
                                    }
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#1f2239',
                                            paddingVertical: normalize(14),
                                            borderRadius: normalize(12),
                                            borderWidth: normalize(1),
                                            borderColor: '#2f334a',
                                            marginRight: normalizeWidth(2),
                                            flex: 1,
                                            alignItems: 'center',
                                        }}
                                        onPress={closeModal}
                                    >
                                        <Text style={styles.cancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            backgroundColor: isExerciseSelected ? '#404d7c':'#1f2239',
                                            paddingVertical: normalize(14),
                                            borderRadius: normalize(12),
                                            borderWidth: normalize(1),
                                            borderColor: isExerciseSelected ? '#7a94cd': '#2f334a',
                                            marginLeft: normalizeWidth(2),
                                            alignItems: 'center',
                                        }}
                                        disabled = {!isExerciseSelected}
                                        onPress={()=>{
                                            if(selectedExercise){
                                                onSelectExercise(selectedExercise)
                                            }
                                        }}
                                    >
                                        <Text style={{
                                            color: isExerciseSelected ? '#fefeff': '#dbdde4',
                                            fontSize: normalize(16),
                                            fontWeight: '600'
                                        }}>Select</Text>
                                    </TouchableOpacity>
                                </View>
        </>
    )
};



const styles = StyleSheet.create({
	modalTitle: {
		fontSize: normalize(18),
		fontWeight: '600',
		color: '#fefefe'
	},
	searchInput: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: normalize(1),
		borderColor: '#474b65',
		borderRadius: normalize(8),
		paddingHorizontal: normalize(12),
		paddingVertical: normalize(3),
		backgroundColor: '#1c1e34',
		marginBottom: normalize(12),
	},
	emptyContainer: {
		paddingVertical: 32,
		alignItems: 'center',
	},
	emptyText: {
		fontSize: 16,
		color: '#888888',
	},
	exerciseItem: {
		paddingVertical: normalizeHeight(16),
		paddingHorizontal: normalizeWidth(12),
		borderBottomWidth: normalize(1),
		borderBottomColor: '#3f425d',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	exerciseItemText: {
		fontSize: normalize(16),
		color: '#f8f8fa',
	},
	cancelButtonText: {
		color: '#dbdde4',
		fontSize: normalize(16),
		fontWeight: '600',
	},
});

export default SelectExerciseModalContent;

