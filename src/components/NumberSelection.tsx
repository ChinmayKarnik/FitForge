

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


const NumberSelection = ({ value, setValue }) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				borderRadius: normalize(8),
				overflow: 'hidden',
				backgroundColor: '#232441',
				borderWidth: normalize(1),
				borderColor: '#5a5a74',
			}}
		>
			<TouchableOpacity
				onPress={() => setValue(value - 1)}
			style={{
			  borderTopLeftRadius: normalize(8),
			  borderBottomLeftRadius: normalize(8),
              paddingHorizontal:normalizeWidth(12),
			  borderRightColor: '#35365C',
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
			  backgroundColor: '#15162c',
			}}
			>
				<TextInput
					style={{ color: '#F2F4F8', fontSize: normalize(20), fontWeight: '600',
				
						paddingVertical:normalize(8),
						paddingHorizontal: normalizeWidth(10),
						lineHeight:normalize(18),
						 textAlign: 'center', 
					}}
					onChange={(event)=>{
						setValue(Number(event.nativeEvent.text) || 0)
					}}
					value={String(value)}
					editable={true}
					keyboardType='numeric'
					placeholderTextColor="#F2F4F8"
					selectionColor="#F2F4F8"
				/>
				{/* <Text style={{ color: '#F2F4F8', fontSize: normalize(20), fontWeight: '600', paddingHorizontal: normalizeWidth(14),
                    paddingVertical: normalizeHeight(2)
                 }}>{value}</Text> */}
			</View>
			<TouchableOpacity
				onPress={() => setValue(value + 1)}
			style={{
			  backgroundColor: '#232441',
			  borderTopRightRadius: normalize(8),
			  borderBottomRightRadius: normalize(8),
              paddingHorizontal:normalizeWidth(12),
			  borderLeftColor: '#35365C',
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


