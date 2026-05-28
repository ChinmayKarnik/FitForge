import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { normalize, normalizeWidth, normalizeF } from '../utils/normalize';
import cross_icon from '../images/cross-icon-white.png';
import blue_dumbbell from '../images/blue-dumbbell.png';
import { databaseController } from '../data';


const SetsRepsSelector = ({ closeModal, exerciseId,
    setWorkoutParameters
 }) => {
	const [numberOfSets, setNumberOfSets] = useState('');
	const [restTime, setRestTime] = useState('60');
	const exercise = databaseController.getAllExercises().find(ex => ex.id === exerciseId);
	const exerciseName = exercise?.name || 'Unknown Exercise';

	const areInputsValid = !isNaN(Number(numberOfSets)) && numberOfSets.trim() !== '' && !isNaN(Number(restTime)) && restTime.trim() !== '';
	const onConfirm = () => {
		setWorkoutParameters({sets:numberOfSets,restTime:restTime})
	}

	return (
		<View style={{flex: 1}}>
			{/* Header */}
			<View style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginBottom: normalize(8),
			}}>
				<Text style={styles.modalTitle}>Workout Parameters</Text>
				<TouchableOpacity
					onPress={closeModal}
					hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}>
					<Image
						source={cross_icon}
						style={{
							width: normalize(12),
							height: normalize(12),
							tintColor: '#cecfd5'
						}} />
				</TouchableOpacity>
			</View>

			<ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
				{/* Exercise Hero */}
				<View style={styles.heroSection}>
					<View style={styles.iconContainer}>
						<Image
							source={blue_dumbbell}
							style={{
								height: normalize(36),
								width: normalize(36) * (598 / 494),
								tintColor: '#7FAFFF',
							}}
							resizeMode="contain"
						/>
					</View>

					<Text style={styles.exerciseName}>{exerciseName}</Text>
				</View>

				{/* Separator */}
				<View style={styles.separator} />

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Number of Sets</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter number of sets"
						placeholderTextColor={'#757689'}
						value={numberOfSets}
						onChangeText={setNumberOfSets}
						keyboardType="numeric"
					/>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Rest time between sets</Text>
					<View style={styles.inputRow}>
						<TextInput
							style={styles.inputInner}
							placeholder="Enter rest time"
							placeholderTextColor={'#757689'}
							value={restTime}
							onChangeText={setRestTime}
							keyboardType="numeric"
						/>
						<Text style={styles.secondsHint}>seconds</Text>
					</View>
				</View>
			</ScrollView>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.discardButton}
					onPress={closeModal}>
					<Text style={styles.discardButtonText}>Discard</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.confirmButton, !areInputsValid && styles.confirmButtonDisabled]}
					onPress={onConfirm}
					disabled={!areInputsValid}
				>
					<Text style={[styles.confirmButtonText, !areInputsValid && styles.confirmButtonTextDisabled]}>Confirm</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	modalTitle: {
		fontSize: normalize(18),
		fontWeight: '600',
		color: '#fefefe',
	},
	heroSection: {
		alignItems: 'center',
		marginBottom: normalize(10),
	},
	iconContainer: {
		width: normalize(60),
		height: normalize(60),
		borderRadius: normalize(30),
		backgroundColor: '#212841',
		borderWidth: normalizeF(3, 2),
		borderColor: '#4a5878',
		marginBottom: normalize(10),
		justifyContent: 'center',
		alignItems: 'center',
	},
	exerciseName: {
		fontSize: normalize(20),
		fontWeight: '700',
		color: '#ffffff',
		textAlign: 'center',
	},
	separator: {
		height: normalize(1),
		backgroundColor: '#404060',
		marginBottom: normalize(18),
	},
	inputContainer: {
		marginBottom: normalize(16),
	},
	label: {
		fontSize: normalize(15),
		fontWeight: '700',
		color: '#e8eaf6',
		marginBottom: normalize(8),
	},
	input: {
		borderWidth: normalize(1),
		borderColor: '#545878',
		borderRadius: normalize(8),
		paddingHorizontal: normalize(12),
		paddingVertical: normalize(10),
		backgroundColor: '#1c1e34',
		color: 'white',
		fontSize: normalize(14),
	},
	inputRow: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: normalize(1),
		borderColor: '#545878',
		borderRadius: normalize(8),
		backgroundColor: '#1c1e34',
		paddingHorizontal: normalize(12),
		paddingVertical: normalize(10),
	},
	inputInner: {
		flex: 1,
		color: 'white',
		fontSize: normalize(14),
		padding: 0,
	},
	secondsHint: {
		fontSize: normalize(13),
		color: '#757689',
		marginLeft: normalize(8),
	},
	buttonContainer: {
		flexDirection: 'row',
		gap: normalizeWidth(12),
		marginTop: normalize(8),
	},
	discardButton: {
		flex: 1,
		backgroundColor: '#5c2828',
		paddingVertical: normalize(14),
		borderRadius: normalize(12),
		borderWidth: normalize(1),
		borderColor: '#a04040',
		alignItems: 'center',
	},
	discardButtonText: {
		color: '#e88080',
		fontSize: normalize(16),
		fontWeight: '600',
	},
	confirmButton: {
		flex: 1,
		backgroundColor: '#2a54b0',
		paddingVertical: normalize(14),
		borderRadius: normalize(12),
		borderWidth: normalize(1),
		borderColor: '#3d6ad4',
		alignItems: 'center',
	},
	confirmButtonDisabled: {
		backgroundColor: '#1f2239',
		borderColor: '#2f334a',
	},
	confirmButtonText: {
		color: '#ffffff',
		fontSize: normalize(16),
		fontWeight: '700',
	},
	confirmButtonTextDisabled: {
		color: '#7880a0',
	},
});

export default SetsRepsSelector;
