

import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { normalize, normalizeWidth, normalizeHeight } from '../utils/normalize';

const MinusIcon = ({width = normalizeWidth(10)})=>{
    return (
        <View style={{width,backgroundColor:'white',
            height: normalize(2)
        }}>

        </View>
    )
}

const PlusIcon = ({size= normalize(12)})=>{
    const thickness = normalize(2)
    const spacing = (size-thickness)/2.0
    return (<View style={{width:size,height:size}}>
    <View style={{position:'absolute', left:spacing,
        height: size,
        width: thickness,
        backgroundColor:'white',
    }} />
    <View style={{position: 'absolute',
        top:spacing,
        height: thickness,
        width: size,
        backgroundColor:'white'
    }} />
</View>
    )
}


const NumberSelection = ({ value, setValue, areNegativeNumbersAllowed = true }) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				borderRadius: normalize(8),
				overflow: 'hidden',
				backgroundColor: '#1a2138',
				borderWidth: normalize(1),
				borderColor: '#3d4563',
				minHeight: normalizeHeight(52),
			}}
		>
			<TouchableOpacity
				onPress={() => {
					const newValue = value - 1;
					if (areNegativeNumbersAllowed || newValue >= 0) {
						setValue(newValue);
					}
				}}
			style={{
			  borderTopLeftRadius: normalize(8),
			  borderBottomLeftRadius: normalize(8),
			  backgroundColor: '#1a2138',
              paddingHorizontal:normalizeWidth(12),
			  justifyContent: 'center',
			  alignItems: 'center',
			}}
            hitSlop={{left:20,right:20,top:20,bottom:20}}
				activeOpacity={0.7}
			>
				<MinusIcon />
			</TouchableOpacity>
			<View
			style={{
			  backgroundColor: '#161d30',
			}}
			>
				<TextInput
					style={{ color: '#F2F4F8', fontSize: normalize(28), fontWeight: '700',

						paddingVertical:normalize(10),
						paddingHorizontal: normalizeWidth(14),
						lineHeight:normalize(28),
						 textAlign: 'center',
					}}
					onChange={(event)=>{
						const newValue = Number(event.nativeEvent.text) || 0;
						if (areNegativeNumbersAllowed || newValue >= 0) {
							setValue(newValue);
						}
					}}
					value={String(value)}
					editable={true}
					keyboardType='numeric'
					placeholderTextColor="#F2F4F8"
					selectionColor="#F2F4F8"
				/>
			</View>
			<TouchableOpacity
				onPress={() => setValue(value + 1)}
			style={{
			  backgroundColor: '#1a2138',
			  borderTopRightRadius: normalize(8),
			  borderBottomRightRadius: normalize(8),
              paddingHorizontal:normalizeWidth(12),
			  justifyContent: 'center',
			  alignItems: 'center',
			}}
			 hitSlop={{left:20,right:20,top:20,bottom:20}}
				activeOpacity={0.7}
			>
				<PlusIcon />
			</TouchableOpacity>
		</View>
	);
};

export default NumberSelection;


