import React from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';

interface DateSelectionModalProps {
  visible: boolean;
  onClose: () => void;
}

const DateSelectionModal: React.FC<DateSelectionModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={onClose}
        activeOpacity={1}
      >
        <View
          style={{
            backgroundColor: '#1c2238',
            borderRadius: 16,
            padding: 24,
            width: '90%',
            maxWidth: 400,
          }}
        >
          {/* Modal content will be implemented here */}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default DateSelectionModal;
