import React, { useState, useEffect } from 'react';
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

    const [imgDimensions, setImgDimensions] = useState<{ width: number, height: number } | null>(null);

    useEffect(() => {
        if (imageUri) {
            Image.getSize(imageUri, (width, height) => {
                setImgDimensions({ width, height });
            });
        }
    }, [imageUri]);

    // Fixed container height
    const containerHeight = normalizeHeight(300);
    // Calculate image dimensions maintaining aspect ratio
    let imgWidth = SCREEN.width;
    let imgHeight = containerHeight;
    if (imgDimensions) {
        const aspectRatio = imgDimensions.width / imgDimensions.height;
        imgHeight = imgWidth / aspectRatio;
        if (imgHeight > containerHeight) {
            imgHeight = containerHeight;
            imgWidth = imgHeight * aspectRatio;
        }
    }



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
                height:containerHeight,
                borderWidth:1,
                borderColor:'red',
                marginTop:normalizeHeight(150),
                backgroundColor: 'black',
                overflow:'hidden',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {imgDimensions && (
                    <Image
                        source={{ uri: imageUri }}
                        style={{ width: imgWidth, height: imgHeight }}
                        resizeMode="contain"
                    />
                )}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

});