import React from 'react';
import {
    View, StyleSheet,
    Dimensions,
    Text,
    Image
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { normalizeHeight } from '../utils/normalize';

const SCREEN = Dimensions.get('window');

const CIRCLE_SIZE = 280;
const MAX_SCALE = 5;

export default function CropPhotoScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { imageUri } = route.params;



    return (
        <View style={{
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: '#1c2238',
        }}>
            {/* Basic header */}
            <View style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'rgba(68, 75, 95)',
                alignItems: 'center',
                backgroundColor: 'rgba(36, 42, 65)',
                paddingTop: normalizeHeight(40),
                paddingBottom: normalizeHeight(12)
            }}>
                <Text
                    style={{
                        fontSize: 22,
                        letterSpacing: 1,
                        fontWeight: '700',
                        color: "#fefefe"
                    }}
                >Adjust Photo</Text>
            </View>

            <View style={{
                width:'100%',
                height:normalizeHeight(300),
                borderWidth:1,
                borderColor:'red',
                marginTop:normalizeHeight(150),
                overflow:'hidden'
            }}>
                <Image
                    source={{ uri: imageUri }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

});