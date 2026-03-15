import React from 'react';
import { Modal, View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import white_arrow_right from '../images/white-right-arrow.png';
import camera from '../images/camera.png';
import gallery from '../images/gallery.png';

interface UpdateProfilePhotoModalProps {
  visible: boolean;
  onClose: () => void;
}

const UpdateProfilePhotoModal: React.FC<UpdateProfilePhotoModalProps> = ({ visible, onClose }) => {
  const onTakePhoto = () => {
    // Empty for now
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
    paddingHorizontal: normalizeWidth(20),
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
    paddingVertical: normalizeHeight(12),
    marginTop: normalizeHeight(8),
  },
  cancelText: {
    fontSize: normalize(16),
    fontWeight: '500',
    color: '#b0b8d3',
  },
});