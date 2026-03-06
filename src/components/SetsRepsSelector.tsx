import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { normalize, normalizeWidth, normalizeHeight } from '../utils/normalize';
import cross_icon from '../images/cross-icon-white.png';

const SetsRepsSelector = ({ onClose, exerciseId }) => {
	const [numberOfSets, setNumberOfSets] = useState('');
	const [restTime, setRestTime] = useState('');
	const exerciseName = "Pull ups"

	return (
		<View>
			<View style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginBottom: normalize(16),
			}}>
				<Text style={styles.modalTitle}>Workout Parameters</Text>
				<TouchableOpacity
					onPress={onClose}
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

			<View style={styles.exerciseNameBadgeContainer}>
				<Text style={styles.exerciseNameBadge}>{exerciseName}</Text>
			</View>

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
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Text style={styles.label}>Rest time between sets </Text>
					<Text style={styles.labelSecondary}>(seconds)</Text>
				</View>
				<TextInput
					style={styles.input}
					placeholder="Enter rest time"
					placeholderTextColor={'#757689'}
					value={restTime}
					onChangeText={setRestTime}
					keyboardType="numeric"
				/>
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.discardButton}
					onPress={() => { }}>
					<Text style={styles.discardButtonText}>Discard</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.confirmButton}
					onPress={() => { }}>
					<Text style={styles.confirmButtonText}>Confirm</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	modalTitle: {
		fontSize: normalize(18),
		fontWeight: '600',
		color: '#fefefe'
	},
	exerciseNameBadgeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#242648',
		borderRadius: normalize(8),
		paddingHorizontal: normalize(12),
		paddingVertical: normalize(10),
		marginBottom: normalize(16),
		borderWidth: normalize(1),
		borderColor: '#3d3f68',
	},
	badgeIconPlaceholder: {
		width: normalize(18),
		height: normalize(18),
		backgroundColor: '#4d5277',
		borderRadius: normalize(4),
		marginRight: normalize(10),
	},
	exerciseNameBadge: {
		fontSize: normalize(16),
		fontWeight: '600',
		color: '#fefefe',
	},
	inputContainer: {
		marginBottom: normalize(16),
	},
	label: {
		fontSize: normalize(14),
		fontWeight: '600',
		color: '#fefefe',
		marginBottom: normalize(8),
	},
	labelSecondary: {
		fontSize: normalize(14),
		fontWeight: '400',
		color: '#9ca3af',
		marginBottom: normalize(8),
	},
	input: {
		borderWidth: normalize(1),
		borderColor: '#474b65',
		borderRadius: normalize(8),
		paddingHorizontal: normalize(12),
		paddingVertical: normalize(10),
		backgroundColor: '#1c1e34',
		color: 'white',
		fontSize: normalize(14),
	},
	buttonContainer: {
		flexDirection: 'row',
		gap: normalizeWidth(12),
	},
	discardButton: {
		flex: 1,
		backgroundColor: '#5d1a1a',
		paddingVertical: normalize(14),
		borderRadius: normalize(10),
		borderWidth: normalize(1),
		borderColor: '#a42a2a',
		alignItems: 'center',
	},
	discardButtonText: {
		color: '#ffffff',
		fontSize: normalize(16),
		fontWeight: '600',
	},
	confirmButton: {
		flex: 1,
		backgroundColor: '#3d5a8c',
		paddingVertical: normalize(14),
		borderRadius: normalize(10),
		borderWidth: normalize(1),
		borderColor: '#5a7ec4',
		alignItems: 'center',
	},
	confirmButtonText: {
		color: '#ffffff',
		fontSize: normalize(16),
		fontWeight: '600',
	},
});

export default SetsRepsSelector;
