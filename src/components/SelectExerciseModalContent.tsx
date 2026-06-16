import React, { useMemo, useState } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize, normalizeWidth, normalizeHeight } from '../utils/normalize';
import cross_icon from '../images/cross-icon-white.png';
import magnifying_glass from '../images/magnifying-glass-white.png';
import checkbox_blue_bg from '../images/checkbox-blue-bg.png';
import notepad_with_glass from '../images/notepad-with-glass.png';
import { databaseController, Exercise } from '../data';

const SelectExerciseModalContent = ({
    onSelectExercise,
    closeModal
}) => {
    const navigation = useNavigation<any>();
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
                    style={{ flex: 1, fontSize: normalize(14), color: 'white' }}
                    placeholder="Search exercises..."
                    hitSlop={{ left: 50, right: 50, top: 5, bottom: 5 }}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor={'#757689'}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity
                        onPress={() => setSearchQuery('')}
                        activeOpacity={0.7}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <View style={{
                            width: normalize(18), height: normalize(18),
                            borderRadius: normalize(9),
                            borderWidth: normalize(1),
                            borderColor: 'rgba(255,255,255,0.38)',
                            alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Image source={cross_icon} style={{ width: normalize(7), height: normalize(7), tintColor: 'rgba(255,255,255,0.62)' }} />
                        </View>
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                                    keyboardShouldPersistTaps="handled"
                                    data={filteredExercises}
                                    keyExtractor={(item) => item.id}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item, index }) => {
                                        const isSelected = selectedExercise?.id === item.id;
                                        const isLast = index === filteredExercises.length - 1;
                                        return (
                                            <TouchableOpacity
                                                style={[styles.exerciseItem, isLast && { borderBottomWidth: 0 }]}
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
                                            <Image source={notepad_with_glass} style={styles.emptyIcon} />
                                            <Text style={styles.emptyTitle}>No exercises found</Text>
                                            <Text style={styles.emptySubtitle}>
                                                {'No results for '}
                                                <Text style={styles.emptySubtitleHighlight}>"{searchQuery}"</Text>
                                            </Text>
                                            <TouchableOpacity
                                                style={styles.emptyCtaButton}
                                                onPress={() => { closeModal(); navigation.navigate('Exercises'); }}
                                            >
                                                <Text style={styles.emptyCtaText}>Browse Exercises</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                />
                                <View style={{ flexDirection: 'row', paddingTop: normalizeHeight(10) }}>
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
		paddingTop: normalizeHeight(16),
		paddingBottom: normalizeHeight(8),
		alignItems: 'center',
	},
	emptyText: {
		fontSize: 16,
		color: '#888888',
	},
	emptyIcon: {
		width: normalizeWidth(50),
		height: normalizeWidth(50) * (588.0 / 551.0),
		tintColor: 'rgba(255,255,255,0.5)',
		marginBottom: normalizeHeight(12),
	},
	emptyTitle: {
		fontSize: normalize(17),
		fontWeight: '700',
		color: '#ffffff',
		marginBottom: normalizeHeight(4),
	},
	emptySubtitle: {
		fontSize: normalize(13),
		color: 'rgba(255,255,255,0.5)',
		marginBottom: normalizeHeight(14),
	},
	emptySubtitleHighlight: {
		color: '#67a4f9',
		fontWeight: '500',
	},
	emptyCtaButton: {
		backgroundColor: '#31467b',
		borderWidth: normalize(1),
		borderColor: 'gray',
		borderRadius: normalize(8),
		paddingVertical: normalizeHeight(11),
		paddingHorizontal: normalizeWidth(24),
		alignItems: 'center',
	},
	emptyCtaText: {
		color: '#ffffff',
		fontSize: normalize(14),
		fontWeight: '600',
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

