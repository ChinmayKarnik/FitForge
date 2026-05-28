import React, { useState } from 'react';
import { View, StyleSheet, Modal, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { normalize, normalizeWidth } from '../utils/normalize';

const { height: screenHeight } = Dimensions.get('window');
import { databaseController } from '../data';
import SelectExerciseModalContent from './SelectExerciseModalContent';
import SetsRepsSelector from './SetsRepsSelector';
import ExerciseFormMultiset from './ExerciseFormMultiset';


export const ExercisePickerLoggerModal = ({ visible, onClose,
	addSetsForExercise
 }) => {
     
    const exercises = databaseController.getAllExercises();

    const [selectedData,setSelectedData]  = useState({exerciseId:null,data:{}});
    const isSelectionPending = !selectedData.exerciseId;
    const showNumberOfSetsInput = !!selectedData.exerciseId && !selectedData.data?.sets;
    const showSetsInput = !isSelectionPending && !showNumberOfSetsInput;

    const onSelectExercise = (exercise)=>{
        setSelectedData({exerciseId: exercise.id, data: {}});
    }
	const setWorkoutParamenters = (data) => {
		const { sets, restTime } = data;
		setSelectedData(prev => ({
			...prev,
			data: {
				...prev.data,
				sets,
				restTime
			}
		}));
	}
	const logExercisesForParent = (exercise, loggedData) => {
		addSetsForExercise(exercise, {numberOfSets: selectedData.data.sets, restTimeBetweenSets: selectedData.data.restTime}, loggedData);
	}
	
    return (
		<Modal
			visible={visible}
			transparent={true}
			animationType="slide"
			onRequestClose={onClose}
		>
			<KeyboardAvoidingView
				style={styles.modalOverlay}
				behavior="padding"
			>
				<View style={styles.modalContent}>
                    
					{
                        !!isSelectionPending && (
                            <SelectExerciseModalContent
                               onSelectExercise = {onSelectExercise}
                               closeModal = {onClose}
                             />
                        )
                    }
                    {
                        !!showNumberOfSetsInput && (
                            <SetsRepsSelector
                                exerciseId = {selectedData.exerciseId}
                                closeModal={onClose}
                                setWorkoutParameters ={setWorkoutParamenters}
                            />
                        )
                    }
					{
						!!showSetsInput && (
							<ExerciseFormMultiset 
								exerciseId={selectedData.exerciseId}
								closeModal={onClose}
								totalSets={selectedData.data?.sets}
								logExercisesForParent={logExercisesForParent}
							/>
						)
					}
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.35)',
		justifyContent: 'center',
	},
	modalContent: {
		backgroundColor: '#272b48',
		borderRadius: normalize(20),
		marginHorizontal: normalizeWidth(16),
		paddingVertical: normalize(20),
		paddingHorizontal: normalizeWidth(16),
		height: Math.round(screenHeight * 0.55),
	},
});

export default ExercisePickerLoggerModal;
