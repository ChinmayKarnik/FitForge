import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  PanResponder,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import { databaseController } from '../data';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';

const SCREEN = Dimensions.get('window');
const STATUS_BAR_HEIGHT = (StatusBar.currentHeight ?? 0);
const CIRCLE_SIZE = normalize(280);  // Fixed circle size in center
const MIN_SCALE = 1;
const MAX_SCALE = 5;

export default function CropPhotoScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { imageUri } = route.params as { imageUri: string };

  // Natural image dimensions
  const naturalSizeRef = useRef<{ width: number; height: number } | null>(null);
  const [imageReady, setImageReady] = useState(false);

  // Container (viewport) size
  const containerSizeRef = useRef({ width: SCREEN.width, height: 0 });

  // Image transform state: scale and offset (pan)
  const scaleRef = useRef(1);
  const [scale, setScale] = useState(1);
  const offsetRef = useRef({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Pan gesture tracking
  const panStart = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });

  // Load natural image dimensions
  useEffect(() => {
    Image.getSize(
      imageUri,
      (w, h) => {
        naturalSizeRef.current = { width: w, height: h };
        setImageReady(true);
      },
      (err) => console.error('CropPhotoScreen: getSize failed:', err),
    );
  }, [imageUri]);

  // Initialize image centered in container with scale 1
  useEffect(() => {
    if (!imageReady || containerSizeRef.current.height === 0) return;
    const { width: cW, height: cH } = containerSizeRef.current;
    const { width: iW, height: iH } = naturalSizeRef.current!;
    
    // Fit image to container
    const scale = Math.min(cW / iW, cH / iH);
    const displayedW = iW * scale;
    const displayedH = iH * scale;
    
    // Center the image
    const x = (cW - displayedW) / 2;
    const y = (cH - displayedH) / 2;
    
    scaleRef.current = 1;
    setScale(1);
    offsetRef.current = { x, y };
    setOffset({ x, y });
  }, [imageReady, containerSizeRef.current.height]);

  // ── Pan Responder (drag image) ───────────────────────────────────────
  const panPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        panStart.current = {
          x: 0,
          y: 0,
          offsetX: offsetRef.current.x,
          offsetY: offsetRef.current.y,
        };
      },
      onPanResponderMove: (_, gs) => {
        if (!naturalSizeRef.current) return;
        const { width: cW, height: cH } = containerSizeRef.current;
        const { width: iW, height: iH } = naturalSizeRef.current;
        
        const scale = scaleRef.current;
        const displayedW = iW * scale;
        const displayedH = iH * scale;

        // Calculate new offset with bounds
        const newX = Math.max(
          cW - displayedW,
          Math.min(0, panStart.current.offsetX + gs.dx)
        );
        const newY = Math.max(
          cH - displayedH,
          Math.min(0, panStart.current.offsetY + gs.dy)
        );

        offsetRef.current = { x: newX, y: newY };
        setOffset({ x: newX, y: newY });
      },
    })
  ).current;

  // ── Pinch Zoom ────────────────────────────────────────────────────────
  // Simple zoom: track two-finger distance (iOS pinch), fallback to buttons
  const pinchStart = useRef({ distance: 0, scale: 1 });
  const handleZoomIn = () => {
    const newScale = Math.min(MAX_SCALE, scaleRef.current * 1.2);
    applyZoom(newScale);
  };
  const handleZoomOut = () => {
    const newScale = Math.max(MIN_SCALE, scaleRef.current / 1.2);
    applyZoom(newScale);
  };

  const applyZoom = (newScale: number) => {
    if (!naturalSizeRef.current) return;
    const { width: cW, height: cH } = containerSizeRef.current;
    const { width: iW, height: iH } = naturalSizeRef.current;

    const oldScale = scaleRef.current;
    const oldDisplayedW = iW * oldScale;
    const oldDisplayedH = iH * oldScale;
    const oldCenterX = offset.x + oldDisplayedW / 2;
    const oldCenterY = offset.y + oldDisplayedH / 2;

    scaleRef.current = newScale;
    setScale(newScale);

    const newDisplayedW = iW * newScale;
    const newDisplayedH = iH * newScale;
    let newX = oldCenterX - newDisplayedW / 2;
    let newY = oldCenterY - newDisplayedH / 2;

    // Clamp to bounds
    newX = Math.max(cW - newDisplayedW, Math.min(0, newX));
    newY = Math.max(cH - newDisplayedH, Math.min(0, newY));

    offsetRef.current = { x: newX, y: newY };
    setOffset({ x: newX, y: newY });
  };

  // ── Confirm ────────────────────────────────────────────────────────────
  const [saving, setSaving] = useState(false);
  const onConfirm = async () => {
    if (saving || !naturalSizeRef.current) return;
    setSaving(true);
    try {
      const { width: cW, height: cH } = containerSizeRef.current;
      const { width: iW, height: iH } = naturalSizeRef.current;
      
      // Displayed image dimensions
      const displayedW = iW * scale;
      const displayedH = iH * scale;

      // Circle center in container coords
      const circleCenterX = cW / 2;
      const circleCenterY = cH / 2;

      // Circle center in image coords
      const imgCenterX = (circleCenterX - offset.x) / (iW * scale);
      const imgCenterY = (circleCenterY - offset.y) / (iH * scale);

      // Circle radius in image coordinates
      const circleRadiusInImage = (CIRCLE_SIZE / 2) / (iW * scale);

      // Bounding box of the circle on the original image (0-1 normalized)
      const normX = Math.max(0, imgCenterX - circleRadiusInImage);
      const normY = Math.max(0, imgCenterY - circleRadiusInImage);
      const normSize = Math.min(1 - normX, Math.min(1 - normY, 2 * circleRadiusInImage));

      // Copy image to permanent storage
      const destPath = RNFS.DocumentDirectoryPath + '/profile.jpg';
      const srcUri = imageUri.startsWith('file://')
        ? imageUri.replace('file://', '')
        : imageUri;
      try {
        await RNFS.copyFile(srcUri, destPath);
      } catch {
        await RNFS.copyFile(imageUri, destPath);
      }

      const fileUri = 'file://' + destPath;
      await databaseController.saveProfilePhoto(fileUri, { x: normX, y: normY, size: normSize });
      navigation.navigate('MainTabs');
    } finally {
      setSaving(false);
    }
  };

  const circleRadius = CIRCLE_SIZE / 2;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#000" translucent />

      {/* ── Header ── */}
      <View style={[styles.header, { paddingTop: STATUS_BAR_HEIGHT + (Platform.OS === 'android' ? 8 : 0) }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* ── Image container ── */}
      <View
        style={styles.imageContainer}
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          containerSizeRef.current = { width, height };
        }}
        {...panPanResponder.panHandlers}
      >
        {/* Image with transform */}
        {imageReady && naturalSizeRef.current && (
          <Image
            source={{ uri: imageUri }}
            style={[
              styles.image,
              {
                width: (naturalSizeRef.current.width * scale),
                height: (naturalSizeRef.current.height * scale),
                transform: [
                  { translateX: offset.x },
                  { translateY: offset.y },
                ],
              },
            ]}
            resizeMode="contain"
          />
        )}

        {/* Dark overlay - outside circle */}
        <View style={[styles.overlayTop, { height: SCREEN.height / 2 - circleRadius }]} />
        <View style={[styles.overlayBottom, { height: SCREEN.height / 2 - circleRadius }]} />
        <View style={[styles.overlayLeft, { width: CIRCLE_SIZE / 2 }]} />
        <View style={[styles.overlayRight, { width: CIRCLE_SIZE / 2 }]} />

        {/* Circular crop indicator (white border) */}
        <View style={[styles.cropCircle, { width: CIRCLE_SIZE, height: CIRCLE_SIZE, borderRadius: circleRadius }]} />
      </View>

      {/* ── Footer ── */}
      <View style={styles.footer}>
        <View style={styles.zoomControls}>
          <TouchableOpacity style={styles.zoomBtn} onPress={handleZoomOut} activeOpacity={0.7}>
            <Text style={styles.zoomBtnText}>−</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomBtn} onPress={handleZoomIn} activeOpacity={0.7}>
            <Text style={styles.zoomBtnText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.confirmBtn, saving && { opacity: 0.6 }]}
          onPress={onConfirm}
          activeOpacity={0.7}
          disabled={saving}
        >
          <Text style={styles.confirmBtnText}>{saving ? 'Saving…' : 'Use Photo'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingHorizontal: normalizeWidth(16),
    paddingBottom: normalizeHeight(10),
  },
  cancelText: {
    color: '#fff',
    fontSize: normalize(16),
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    backgroundColor: 'transparent',
  },
  overlayTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
  },
  overlayLeft: {
    position: 'absolute',
    left: 0,
    top: SCREEN.height / 2 - CIRCLE_SIZE / 2,
    height: CIRCLE_SIZE,
    backgroundColor: '#000',
  },
  overlayRight: {
    position: 'absolute',
    right: 0,
    top: SCREEN.height / 2 - CIRCLE_SIZE / 2,
    height: CIRCLE_SIZE,
    backgroundColor: '#000',
  },
  cropCircle: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent',
  },
  footer: {
    flexDirection: 'row',
    height: normalizeHeight(90),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: normalizeWidth(20),
  },
  zoomControls: {
    flexDirection: 'row',
    gap: normalize(12),
  },
  zoomBtn: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(22),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomBtnText: {
    fontSize: normalize(24),
    fontWeight: '600',
    color: '#000',
  },
  confirmBtn: {
    backgroundColor: '#c62230',
    paddingHorizontal: normalizeWidth(44),
    paddingVertical: normalizeHeight(13),
    borderRadius: normalize(30),
  },
  confirmBtnText: {
    color: '#fff',
    fontSize: normalize(16),
    fontWeight: '600',
  },
});
