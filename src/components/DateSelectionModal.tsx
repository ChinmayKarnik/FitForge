import React, { useRef } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { normalize, normalizeWidth, normalizeHeight } from '../utils/normalize';

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
          <Text style={styles.selectDateLabel}>Select date</Text>
          <Text style={styles.dateDisplay}>
            {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </Text>
          <View style={styles.separator} />
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
    borderRadius: normalize(16),
    width: '90%',
    maxWidth: normalizeWidth(400),
  },
  selectDateLabel: {
    fontSize: normalize(15),
    fontWeight: '500',
    color: '#B0B7C3',
    marginBottom: normalizeHeight(16),
    marginTop: normalizeHeight(12),
    marginLeft: normalizeWidth(16),
  },
  dateDisplay: {
    fontSize: normalize(20),
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: normalizeHeight(16),
    marginLeft:normalizeWidth(12)
  },
  separator: {
    height: normalizeHeight(1),
    backgroundColor: 'rgba(68, 75, 95, 0.5)',
  },
});

export default DateSelectionModal;
