// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Dimensions,
    Text,
    Image,
    Animated,
    PanResponder,
    TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import { databaseController } from '../data';
import white_left_arrow from '../images/white-left-arrow.png';
import magnifying_glass from '../images/magnifying-glass-thin.png';
import all_direction_arrow from '../images/all-direction-arrow.png';
import ProfileImageCircular from '../components/ProfileImageCircular';

const SCREEN = Dimensions.get('window');

const CIRCLE_SIZE = normalize(300);
const MAX_SCALE = 5;


export default function CropPhotoScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { imageUri } = route.params;

    const [imgDimensions, setImgDimensions] = useState<{ width: number, height: number } | null>(null);
    const [liveCrop, setLiveCrop] = useState({ x: 0, y: 0, size: CIRCLE_SIZE / containerHeight });
    const getCropRef = useRef<any>(null);
    const panTotalX = useRef(0);
    const panTotalY = useRef(0);

    const isHorizontalImage = imgDimensions ? imgDimensions.width >= imgDimensions.height : true;
    const scale = useRef(new Animated.Value(1)).current;
    const scaleValue = useRef(1);
    const initialDistance = useRef<number | null>(null);
    const prevTouchesLength = useRef(0);

    const pan = useRef(new Animated.ValueXY()).current;

    const getDistance = (touches: any[]) => {
        const dx = touches[0].pageX - touches[1].pageX;
        const dy = touches[0].pageY - touches[1].pageY;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const onConfirm = async () => {
        if (!imgDimensions) return;
        let panXVal = 0, panYVal = 0;
        pan.x.stopAnimation((x) => { panXVal = x; });
        pan.y.stopAnimation((y) => { panYVal = y; });
        const scalVal = scaleValue.current;
        const crop = getCrop(panXVal, panYVal, scalVal);
        if (typeof databaseController?.saveProfilePhoto === 'function') {
            await databaseController.saveProfilePhoto(imageUri, crop);
        }
        navigation.goBack();
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt) => {
                if (evt.nativeEvent.touches.length === 2) {
                    initialDistance.current = getDistance(evt.nativeEvent.touches);
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                const touches = evt.nativeEvent.touches;
                if (touches.length >= 2) {
                    if (prevTouchesLength.current < 2 || initialDistance.current === null) {
                        initialDistance.current = getDistance(touches);
                    }
                    if (initialDistance.current !== null) {
                        const currentDistance = getDistance(touches);
                        const newScale = Math.max(0.5, Math.min(MAX_SCALE,
                            scaleValue.current * (currentDistance / initialDistance.current)
                        ));
                        scale.setValue(newScale);
                        if (getCropRef.current) {
                            setLiveCrop(getCropRef.current(panTotalX.current, panTotalY.current, newScale));
                        }
                    }
                } else if (touches.length === 1) {
                    pan.x.setValue(gestureState.dx);
                    pan.y.setValue(gestureState.dy);
                }
                prevTouchesLength.current = touches.length;
            },
            onPanResponderRelease: (evt) => {
                if (evt.nativeEvent.touches.length === 0) {
                    let px = 0, py = 0;
                    pan.x.stopAnimation((x) => { px = x; panTotalX.current = x; });
                    pan.y.stopAnimation((y) => { py = y; panTotalY.current = y; });
                    scale.stopAnimation((val) => {
                        scaleValue.current = val;
                        if (getCropRef.current) {
                            setLiveCrop(getCropRef.current(px, py, val));
                        }
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

    useEffect(() => {
        if (imgDimensions && getCropRef.current) {
            setLiveCrop(getCropRef.current(0, 0, 1));
        }
    }, [imgDimensions]);

    const containerHeight = SCREEN.width;
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

    const getCrop = getCropRef.current = (panXVal, panYVal, scaleVal) => {
        if (isHorizontalImage) {
            const imageTopSpace = (containerHeight - (imgHeight * scaleVal)) / 2.0;
            const circleTopSpace = (containerHeight - CIRCLE_SIZE) / 2.0;
            const Ycoord = -(imageTopSpace - circleTopSpace);
            const ycropVal = (Ycoord - panYVal) / (scaleVal * imgHeight * 1.0);
            const circleSpaceLeft = (containerHeight * scaleVal - CIRCLE_SIZE) / 2.0;
            const xcropVal = (circleSpaceLeft - panXVal) / (scaleVal * imgWidth * 1.0);
            const scaleval = CIRCLE_SIZE / (containerHeight * 1.0);
            return { x: xcropVal, y: ycropVal, size: scaleval / scaleVal };
        } else {
            const imageLeftSpace = (containerHeight - (imgWidth * scaleVal)) / 2.0;
            const circleLeftSpace = (containerHeight - CIRCLE_SIZE) / 2.0;
            const Xcoord = -(imageLeftSpace - circleLeftSpace);
            const xcropVal = (Xcoord - panXVal) / (scaleVal * imgWidth * 1.0);
            const circleSpaceTop = (containerHeight * scaleVal - CIRCLE_SIZE) / 2.0;
            const ycropVal = (circleSpaceTop - panYVal) / (scaleVal * imgHeight * 1.0);
            const scaleval = CIRCLE_SIZE / (containerHeight * 1.0);
            return { x: xcropVal, y: ycropVal, size: scaleval / scaleVal };
        }
    };

    return (
        <View style={{ flex: 1, width: '100%', backgroundColor: '#1c2238' }}>

            {/* Header */}
            <View style={{
                width: '100%',
                borderBottomWidth: 1,
                borderColor: 'rgba(68,75,95,1)',
                alignItems: 'center',
                backgroundColor: 'rgba(36,42,65,1)',
                paddingTop: normalizeHeight(40),
                paddingBottom: normalizeHeight(12),
            }}>
                <TouchableOpacity
                    style={{ position: 'absolute', top: normalizeHeight(46), left: normalizeWidth(16) }}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        style={{
                            width: normalizeWidth(9),
                            height: normalizeWidth(9) * (86.0 / 51.0),
                            resizeMode: 'stretch',
                        }}
                        source={white_left_arrow}
                    />
                </TouchableOpacity>
                <Text style={{
                    fontSize: normalize(18),
                    letterSpacing: 1,
                    fontWeight: '700',
                    color: '#fefefe',
                }}>Adjust Photo</Text>
            </View>

            {/* Hint text */}
            <View style={{
                width: '100%',
                paddingVertical: normalizeHeight(10),
                alignItems: 'center',
                backgroundColor: 'rgba(36,42,65,0.9)',
            }}>
                <Text style={{
                    color: 'rgba(255,255,255,0.68)',
                    fontSize: normalize(13),
                    fontWeight: '500',
                    letterSpacing: 0.3,
                }}>Position your photo within the circle</Text>
            </View>

            {/* Photo area with crop circle */}
            <View
                style={{
                    width: '100%',
                    height: containerHeight,
                    backgroundColor: 'black',
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
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
                                { scale },
                            ],
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
                    backgroundColor: 'transparent',
                }}>
                    <View style={{ position: 'absolute', width: 1, height: CIRCLE_SIZE, backgroundColor: '#fff', left: CIRCLE_SIZE / 2 - 0.5 }} />
                    <View style={{ position: 'absolute', width: CIRCLE_SIZE, height: 1, backgroundColor: '#fff', top: CIRCLE_SIZE / 2 - 0.5 }} />
                </View>
            </View>

            {/* Bottom content */}
            <View style={{
                flex: 1,
                paddingHorizontal: normalizeWidth(16),
                paddingTop: normalizeHeight(14),
                paddingBottom: normalizeHeight(100),
            }}>
                {/* How it will appear */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#272d46',
                    borderRadius: normalize(12),
                    borderWidth: 1,
                    borderColor: '#3d4563',
                    paddingVertical: normalizeHeight(14),
                    paddingHorizontal: normalize(16),
                    marginBottom: normalizeHeight(14),
                }}>
                    <View>
                        <Text style={{
                            color: '#ffffff',
                            fontSize: normalize(15),
                            fontWeight: '700',
                        }}>How it will appear</Text>
                        <Text style={{
                            color: 'rgba(255,255,255,0.62)',
                            fontSize: normalize(11),
                            fontWeight: '500',
                            marginTop: normalizeHeight(3),
                            letterSpacing: 0.2,
                        }}>Shown on your profile</Text>
                    </View>
                    <View style={{ width: 1, height: normalize(50), backgroundColor: 'rgba(255,255,255,0.18)', marginHorizontal: normalizeWidth(14) }} />
                    <View style={{
                        width: normalize(94) + 4,
                        height: normalize(94) + 4,
                        borderRadius: (normalize(94) + 4) / 2,
                        borderWidth: 2,
                        borderColor: 'rgba(255,255,255,0.30)',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <ProfileImageCircular
                            imageSource={{ uri: imageUri }}
                            width={normalize(94)}
                            aspectRatio={1}
                            crop={liveCrop}
                        />
                    </View>
                </View>

                {/* Gesture hints */}
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: '#272d46',
                    borderRadius: normalize(12),
                    borderWidth: 1,
                    borderColor: '#3d4563',
                    paddingVertical: normalizeHeight(13),
                    paddingHorizontal: normalize(16),
                    alignItems: 'center',
                }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={all_direction_arrow} style={{ width: normalize(20), height: normalize(20) * (396.0/401.0), tintColor: 'rgba(255,255,255,0.85)' }} />
                        <View style={{ marginLeft: normalizeWidth(12) }}>
                            <Text style={{ color: '#ffffff', fontSize: normalize(14), fontWeight: '700' }}>Move Photo</Text>
                            <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: normalize(12), marginTop: normalizeHeight(4) }}>Drag to position</Text>
                        </View>
                    </View>
                    <View style={{ width: 1, height: normalizeHeight(36), backgroundColor: 'rgba(255,255,255,0.15)' }} />
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={magnifying_glass}
                            style={{ width: normalize(20), height: normalize(20) * (332.0/352.0), tintColor: 'rgba(255,255,255,0.85)' }}
                        />
                        <View style={{ marginLeft: normalizeWidth(12) }}>
                            <Text style={{ color: '#ffffff', fontSize: normalize(14), fontWeight: '700' }}>Zoom</Text>
                            <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: normalize(12), marginTop: normalizeHeight(4) }}>Pinch to zoom</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Use Photo button */}
            <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                paddingHorizontal: normalizeWidth(16),
                paddingBottom: normalizeHeight(24),
                paddingTop: normalizeHeight(8),
            }}>
                <TouchableOpacity
                    onPress={onConfirm}
                    style={{
                        backgroundColor: '#c62230',
                        borderRadius: normalizeWidth(28),
                        paddingVertical: normalizeHeight(16),
                        alignItems: 'center',
                    }}
                    activeOpacity={0.85}
                >
                    <Text style={{
                        color: '#fff',
                        fontWeight: '700',
                        fontSize: normalize(16),
                        letterSpacing: 0.5,
                    }}>Use Photo</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

