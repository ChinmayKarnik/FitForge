import React from 'react';
import { Modal, View, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import white_arrow_right from '../images/white-right-arrow.png';
import camera from '../images/camera.png';
import gallery from '../images/gallery.png';
import { launchCamera } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { databaseController } from '../data';

interface UpdateProfilePhotoModalProps {
  visible: boolean;
  onClose: () => void;
  onPhotoTaken?: (path: string) => void;
}

const UpdateProfilePhotoModal: React.FC<UpdateProfilePhotoModalProps> = ({ visible, onClose, onPhotoTaken }) => {
  const onTakePhoto = async () => {
    // 1. Close the modal first
    onClose();

    // 2. Launch the camera
    const response = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
      quality: 0.8,
    });

    if (response.didCancel || response.errorCode) {
      return;
    }

    const asset = response.assets?.[0];
    if (!asset?.uri) {
      return;
    }

    // 3. Copy image to permanent app storage
    const destPath = RNFS.DocumentDirectoryPath + '/profile.jpg';
    const srcUri = asset.uri.startsWith('file://') ? asset.uri.replace('file://', '') : asset.uri;
    try {
      await RNFS.copyFile(srcUri, destPath);
    } catch (err) {
      console.error('Error copying profile photo:', err);
      Alert.alert('Error', 'Could not save photo. Please try again.');
      return;
    }

    const fileUri = 'file://' + destPath;

    // 4. Save path in the database controller userInfo
    await databaseController.saveProfilePhotoPath(fileUri);

    // 5. Notify parent to update the UI
    onPhotoTaken?.(fileUri);
  };

  const onChooseFromGallery = () => {
    // Empty for now
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Title */}
          <Text style={styles.title}>Update Profile Photo</Text>

          {/* Take Photo Option */}
          <TouchableOpacity 
            style={styles.optionBox}
            onPress={onTakePhoto}
            activeOpacity={0.7}
          >
            <Image source={camera} style={styles.icon} />
            <Text style={styles.optionText}>Take Photo</Text>
            <Image source={white_arrow_right} style={styles.arrowIcon} />
          </TouchableOpacity>

          {/* Choose from Gallery Option */}
          <TouchableOpacity 
            style={styles.optionBox}
            onPress={onChooseFromGallery}
            activeOpacity={0.7}
          >
            <Image source={gallery} style={styles.galleryIcon} />
            <Text style={styles.optionText}>Choose from Gallery</Text>
            <Image source={white_arrow_right} style={styles.arrowIcon} />
          </TouchableOpacity>

          {/* Divider between options and cancel */}
          <View style={styles.divider} />

          {/* Cancel Button */}
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateProfilePhotoModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#243250',
    borderRadius: normalize(20),
    width: '88%',
    maxWidth: normalizeWidth(380),
    paddingTop: normalizeHeight(20),
    paddingBottom: normalizeHeight(20),
  },
  title: {
    fontSize: normalize(18),
    fontWeight: '600',
    color: '#f9f9f9',
    textAlign: 'center',
    marginBottom: normalizeHeight(20),
  },
  optionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(58, 75, 120, 0.4)',
    borderWidth: normalizeWidth(1),
    borderColor: 'rgba(100, 120, 180, 0.3)',
    borderRadius: normalize(12),
    paddingHorizontal: normalizeWidth(16),
    paddingVertical: normalizeHeight(16),
    marginBottom: normalizeHeight(12),
    marginHorizontal: normalizeWidth(20),
  },
  icon: {
    width: normalizeWidth(30),
    height: normalizeHeight(30),
    borderRadius: normalize(8),
    marginRight: normalizeWidth(14),
    resizeMode: 'contain',
  },
  galleryIcon: {
    width: normalizeWidth(30),
    aspectRatio: 538 / 506,
    marginRight: normalizeWidth(14),
    resizeMode: 'contain',
  },
  optionText: {
    flex: 1,
    fontSize: normalize(16),
    fontWeight: '500',
    color: '#e8ecf6',
  },
  arrowIcon: {
    width: normalizeWidth(8),
    aspectRatio: 52/87,
    marginLeft: normalizeWidth(10),
    resizeMode: 'contain',
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: normalizeHeight(4),
  },
  cancelText: {
    fontSize: normalize(16),
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  divider: {
    height: normalizeHeight(1),
    backgroundColor: 'rgba(68, 75, 95, 0.5)',
    marginVertical: normalizeHeight(8),
  },
});