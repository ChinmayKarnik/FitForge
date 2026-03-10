import React, { useRef } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native';

interface DateSelectionModalProps {
  visible: boolean;
  onClose: () => void;
}

const DateSelectionModal: React.FC<DateSelectionModalProps> = ({ visible, onClose }) => {

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const currentDateRef = useRef(new Date());
  const [displayMonth,setDisplayMonth] = React.useState(currentDateRef.current.getMonth());
  const [displayYear,setDisplayYear] = React.useState(currentDateRef.current.getFullYear());
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <View style={styles.container}>
          {/* Modal content will go here */}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1c2238',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
});

export default DateSelectionModal;
