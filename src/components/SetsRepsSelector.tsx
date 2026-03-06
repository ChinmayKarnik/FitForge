import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { normalize, normalizeWidth } from '../utils/normalize';
import cross_icon from '../images/cross-icon-white.png';

const SetsRepsSelector = ({ onClose }) => {
	const [numberOfSets, setNumberOfSets] = useState('');
	const [restTime, setRestTime] = useState('');

	return (
		<View>
			<View style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginBottom: normalize(16),
			}}>
				<Text style={styles.modalTitle}>Sets & Rest Time</Text>
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
				<Text style={styles.label}>Rest Time Between Sets (seconds)</Text>
				<TextInput
					style={styles.input}
					placeholder="Enter rest time"
					placeholderTextColor={'#757689'}
					value={restTime}
					onChangeText={setRestTime}
					keyboardType="numeric"
				/>
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
	inputContainer: {
		marginBottom: normalize(16),
	},
	label: {
		fontSize: normalize(14),
		fontWeight: '600',
		color: '#fefefe',
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
});

export default SetsRepsSelector;
