import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { normalize, normalizeWidth } from '../utils/normalize';
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
			<View style={styles.modalOverlay}>
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
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
	},
	modalContent: {
		backgroundColor: '#272b48',
		borderRadius: normalize(20),
		marginHorizontal: normalizeWidth(16),
		paddingVertical: normalize(12),
		paddingHorizontal: normalizeWidth(16),
		maxHeight: '60%',
	},
});

export default ExercisePickerLoggerModal;
