import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import white_right_arrow from '../images/white-right-arrow.png';

const ExerciseCard = ({ exercise }) => {
    const navigation = useNavigation();
    
    const name = exercise.name || 'Unnamed Exercise';
    const description = exercise.description || '';

    const handlePress = () => {
        // Navigate to ExerciseDetails when created
        // navigation.navigate('ExerciseDetails', { exercise });
    };

    return (
        <TouchableOpacity onPress={handlePress} style={{
            borderWidth:normalize(1),
            backgroundColor:'#292f46',
            marginHorizontal: normalize(16),
            borderColor: '#383e55',
            paddingVertical:normalizeHeight(16),
            paddingLeft:normalizeWidth(16),
            paddingRight:normalizeWidth(12),
            borderRadius: normalize(12),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <View style={{ flex: 1 }}>
                <Text style={
                    {
                        fontSize: normalize(16),
                        fontWeight: '600',
                        color: 'white',
                        letterSpacing: 0.2,
                        marginBottom: normalizeHeight(6)
                    }
                }>{name}</Text>
                {description && (
                    <Text
                        style={{
                            fontSize:normalize(14),
                            fontWeight: '400',
                            color: 'rgba(255,255,255,0.6)',
                        }}
                    >{description}</Text>
                )}
            </View>
            <Image 
                source={white_right_arrow}
                style={{
                    width: normalizeWidth(10),
                    aspectRatio: (52.0/87.0),
                    marginLeft: normalizeWidth(12),
                    tintColor: 'rgba(255,255,255,0.5)'
                }}
            />
        </TouchableOpacity>
    );
};

export default ExerciseCard;
