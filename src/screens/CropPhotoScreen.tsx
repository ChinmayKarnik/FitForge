import React, { useState, useEffect, useRef } from 'react';
import {
    View, StyleSheet,
    Dimensions,
    Text,
    Image,
    Animated,
    PanResponder,
    TouchableOpacity
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import { databaseController } from '../data';
import white_left_arrow from '../images/white-left-arrow.png';

const SCREEN = Dimensions.get('window');

const CIRCLE_SIZE = normalize(300);
const MAX_SCALE = 5;

export default function CropPhotoScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { imageUri } = route.params;


    const [imgDimensions, setImgDimensions] = useState<{ width: number, height: number } | null>(null);
    
    const isHorizontalImage = imgDimensions ? imgDimensions.width >= imgDimensions.height : true;
    // Animated values for image transform
    const scale = useRef(new Animated.Value(1)).current;
    const scaleValue = useRef(1); // tracks committed scale between gestures
    const initialDistance = useRef<number | null>(null);
    const prevTouchesLength = useRef(0);

    const pan = useRef(new Animated.ValueXY()).current;

    const getDistance = (touches: any[]) => {
        const dx = touches[0].pageX - touches[1].pageX;
        const dy = touches[0].pageY - touches[1].pageY;
        return Math.sqrt(dx * dx + dy * dy);
    };

    
    const onConfirm = async () => {
        // Calculate crop values based on pan, scale, and circle position
        if (!imgDimensions) return;

        // Get current pan values (using stopAnimation to extract current value)
        let panXVal = 0, panYVal = 0;
        pan.x.stopAnimation((x) => { panXVal = x; });
        pan.y.stopAnimation((y) => { panYVal = y; });

        const scalVal = scaleValue.current

        const crop = getCrop(panXVal,panYVal,scalVal);

        if (typeof databaseController?.saveProfilePhoto === 'function') {
            await databaseController.saveProfilePhoto(imageUri, crop);
        }
        navigation.goBack();
    }

    // PanResponder for dragging + pinch zoom
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt) => {
                if (evt.nativeEvent.touches.length === 2) {
                    const dist = getDistance(evt.nativeEvent.touches);
                    initialDistance.current = dist;
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                const touches = evt.nativeEvent.touches;
                if (touches.length >= 2) {
                    // Initialize distance when first detecting 2 touches
                    if (prevTouchesLength.current < 2 || initialDistance.current === null) {
                        const dist = getDistance(touches);
                        initialDistance.current = dist;
                    }
                    // Pinch zoom
                    if (initialDistance.current !== null) {
                        const currentDistance = getDistance(touches);
                        const newScale = Math.max(0.5, Math.min(MAX_SCALE,
                            scaleValue.current * (currentDistance / initialDistance.current)
                        ));
                        scale.setValue(newScale);
                    }
                } else if (touches.length === 1) {
                    // Pan drag
                    pan.x.setValue(gestureState.dx);
                    pan.y.setValue(gestureState.dy);
                }
                prevTouchesLength.current = touches.length;
            },
            onPanResponderRelease: (evt) => {
                if (evt.nativeEvent.touches.length === 0) {
                    // Commit scale
                    scale.stopAnimation((val) => { 
                        scaleValue.current = val; 
                    });
                    pan.extractOffset();
                    initialDistance.current = null;
                    prevTouchesLength.current = 0;
                }
            },
        })
    ).current;

    useEffect(() => {
        if (imageUri) {
            Image.getSize(imageUri, (width, height) => {
                setImgDimensions({ width, height });
            });
        }
    }, [imageUri]);

    // Fixed container - square (width = height = screen width)
    const containerHeight = SCREEN.width;
    // Calculate image dimensions maintaining aspect ratio
    let imgWidth = SCREEN.width;
    let imgHeight = containerHeight;
    const aspectRatio = imgDimensions ? imgDimensions.width / imgDimensions.height : 1;
    if (imgDimensions) {
        const aspectRatio = imgDimensions.width / imgDimensions.height;
        imgHeight = imgWidth / aspectRatio;
        if (imgHeight > containerHeight) {
            imgHeight = containerHeight;
            imgWidth = imgHeight * aspectRatio;
        }
    }

    const getCrop = (panXVal, panYVal, scaleVal)=>{
        if(isHorizontalImage){
        const imageTopSpace = (containerHeight-(imgHeight*scaleVal))/2.0
        const circleTopSpace = (containerHeight-CIRCLE_SIZE)/2.0 
        const Ycoord = -(imageTopSpace-circleTopSpace)
        const ycropVal = (Ycoord-panYVal)/(scaleVal* imgHeight*1.0);
        const circleSpaceLeft = (containerHeight*scaleVal - CIRCLE_SIZE)/2.0;
        const xcropVal = (circleSpaceLeft-panXVal)/(scaleVal*imgWidth*1.0); 
        const scaleval = CIRCLE_SIZE/(containerHeight*1.0);
        return {
            x: xcropVal,
            y: ycropVal,
            size: scaleval/scaleVal
        }}else {
            const imageLeftSpace = (containerHeight - (imgWidth * scaleVal)) / 2.0
            const circleLeftSpace = (containerHeight - CIRCLE_SIZE) / 2.0
            const Xcoord = -(imageLeftSpace - circleLeftSpace)
            const xcropVal = (Xcoord - panXVal) / (scaleVal * imgWidth * 1.0);
            const circleSpaceTop = (containerHeight * scaleVal - CIRCLE_SIZE) / 2.0;
            const ycropVal = (circleSpaceTop - panYVal) / (scaleVal * imgHeight * 1.0);
            const scaleval = CIRCLE_SIZE / (containerHeight * 1.0);
            return {
                x: xcropVal,
                y: ycropVal,
                size: scaleval / scaleVal
            }
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
                 <TouchableOpacity 
                        style={{ position: 'absolute',
                           top: normalizeHeight(46), left: normalizeWidth(16),
                          
                        }
                        }
                        hitSlop={{top:20,bottom:20,left:20,right:20}}
                        onPress={()=>{
                          navigation.goBack()
                        }}>
                        <Image style={{
                         
                             width:normalizeWidth(9),
                             height:normalizeWidth(9)*(86.0/51.0),
                          aspectRatio: (51.0/86.0),
                          resizeMode:'stretch'
                        }}
                          source ={white_left_arrow}   
                        />
                
                        </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 22,
                        letterSpacing: 1,
                        fontWeight: '700',
                        color: "#fefefe"
                    }}
                >Adjust Photo</Text>
            </View>

            <View 
                style={{
                    width:'100%',
                    height:containerHeight,
                    marginTop:normalizeHeight(110),
                    backgroundColor: 'black',
                    overflow:'hidden',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                {...panResponder.panHandlers}
            >
                {imgDimensions && (
                    <Animated.Image
                        source={{ uri: imageUri }}
                        style={{
                            width: imgWidth,
                            height: imgHeight,
                            transform: [
                                { translateX: pan.x },
                                { translateY: pan.y },
                                { scale }
                            ]
                        }}
                        resizeMode="contain"
                    />
                )}
                <View style={{
                    position: 'absolute',
                    width: CIRCLE_SIZE,
                    height: CIRCLE_SIZE,
                    borderRadius: CIRCLE_SIZE / 2,
                    borderWidth: 2,
                    borderColor: '#fff',
                    backgroundColor: 'transparent'
                }}>
                </View>
            </View>

            {/* Okay button at the bottom */}
            <View style={{
                width: '100%',
                position: 'absolute',
                bottom: 0,
                left: 0,
                padding: 24,
                alignItems: 'center',
            }}>
                <Text
                    onPress={onConfirm}
                    style={{
                        backgroundColor: '#c62230',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: normalizeWidth(16),
                        paddingVertical: normalizeHeight(12),
                        paddingHorizontal: normalizeWidth(60),
                        borderRadius: normalizeWidth(24),
                        overflow: 'hidden',
                        textAlign: 'center',
                        marginTop: normalizeHeight(8)
                    }}
                >Use Photo</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});