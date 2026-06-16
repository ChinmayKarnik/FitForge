import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, KeyboardAvoidingView, Keyboard, Dimensions } from 'react-native';
import { normalize, normalizeWidth } from '../utils/normalize';
import { databaseController } from '../data';
import SelectExerciseModalContent from './SelectExerciseModalContent';
import SetsRepsSelector from './SetsRepsSelector';
import ExerciseFormMultiset from './ExerciseFormMultiset';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');


export const ExercisePickerLoggerModal = ({ visible, onClose,
	addSetsForExercise
 }) => {

    const exercises = databaseController.getAllExercises();

    const [selectedData,setSelectedData]  = useState({exerciseId:null,data:{}});
    const isSelectionPending = !selectedData.exerciseId;
    const showNumberOfSetsInput = !!selectedData.exerciseId && !selectedData.data?.sets;
    const showSetsInput = !isSelectionPending && !showNumberOfSetsInput;

	const [keyboardVisible, setKeyboardVisible] = useState(false);

	useEffect(() => {
		const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
		const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
		return () => { show.remove(); hide.remove(); };
	}, []);

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
	if(!!isSelectionPending){
      return (
		<Modal
			visible={visible}
			transparent={true}
			animationType="slide"
			onRequestClose={onClose}
		>
			<View style={styles.fixedOverlay}>
				<View style={[styles.modalContent, { maxHeight: screenHeight * 0.68 }]}>
					<SelectExerciseModalContent
						onSelectExercise={onSelectExercise}
						closeModal={onClose}
					/>
				</View>
			</View>
		</Modal>
	  )

	}

    return (
		<Modal
			visible={visible}
			transparent={true}
			animationType="slide"
			onRequestClose={onClose}
		>
			<KeyboardAvoidingView
				style={[
					styles.modalOverlay,
					keyboardVisible && styles.modalOverlayKeyboardOpen,
				]}
				behavior="padding"
			>
				<View style={[styles.modalContent, !showSetsInput && styles.modalContentFixed]}>

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
	modalOverlayKeyboardOpen: {
		justifyContent: 'flex-start',
		paddingTop: normalize(24),
	},
	fixedOverlay: {
		position: 'absolute',
		width: screenWidth,
		height: screenHeight,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'flex-start',
		paddingTop: screenHeight * 0.13,
	},
	modalContent: {
		backgroundColor: '#272b48',
		borderRadius: normalize(20),
		marginHorizontal: normalizeWidth(16),
		paddingVertical: normalize(20),
		paddingHorizontal: normalizeWidth(16),
	},
	modalContentFixed: {
		height: Math.round(screenHeight * 0.52),
	},
});

export default ExercisePickerLoggerModal;
