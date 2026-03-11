import React, { useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { normalize, normalizeWidth, normalizeHeight } from '../utils/normalize';

interface TimeSelectionModalProps {
  visible: boolean;
  onClose: () => void;
}

const TimeSelectionModal: React.FC<TimeSelectionModalProps> = ({ visible, onClose,
    selectedTimeInit
 }) => {
    
    const [selectedTime, setSelectedTime] = useState(selectedTimeInit);
    const [isHourSelected,setIsHourSelected] = useState(true);
    const isMinuteSelected = !isHourSelected;
    const isAM = selectedTime.getHours() < 12;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          activeOpacity={1}
        />
        <View style={styles.centeredContent} pointerEvents="box-none">
          <View style={styles.container}>
            {/* Time selection content will go here */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    backgroundColor: '#1c2238',
    borderRadius: normalize(16),
    width: '90%',
    maxWidth: normalizeWidth(400),
    borderWidth: 1,
    borderColor: 'rgba(68, 75, 95, 1)',
    minHeight: normalizeHeight(120),
  },
});

export default TimeSelectionModal;
