import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text, TextInput, Dimensions } from 'react-native';
import { normalize, normalizeWidth, normalizeHeight } from '../utils/normalize';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface TimeSelectionModalProps {
  visible: boolean;
  onClose: () => void;
}

interface SelectedTime {
  hours: number;
  minutes: number;
  isAm: boolean;
}

const TimeSelectionModal: React.FC<TimeSelectionModalProps> = ({ visible, onClose,
    selectedTimeInit,
    onConfirmTime
 }) => {
    
    const [selectedTime, setSelectedTime] = useState<SelectedTime>(selectedTimeInit);
    const [isHourSelected, setIsHourSelected] = useState(true);

    const handleHourChange = (text: string) => {
        const numericValue = parseInt(text);
        if(numericValue < 0 || numericValue > 12) return; // Ignore invalid hour values
      setSelectedTime({ ...selectedTime, hours: text});
    };

    const handleMinuteChange = (text: string) => {
      const numericValue = parseInt(text);
      if(numericValue < 0 || numericValue > 59) return; // Ignore invalid minute values
      setSelectedTime({ ...selectedTime, minutes: text});
    };

    const toggleAMPM = (isAm: boolean) => {
      setSelectedTime({ ...selectedTime, isAm });
    };

    const onPressOkay = () => {
      if (isTimeValid()) {
        onConfirmTime(selectedTime);
        onClose();
      }
    }

    const isTimeValid = () => {
      const hoursNum = parseInt(String(selectedTime.hours));
      const minutesNum = parseInt(String(selectedTime.minutes));
      return hoursNum >= 1 && hoursNum <= 12 && minutesNum >= 0 && minutesNum <= 59;
    };

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
        <View style={styles.container} pointerEvents="box-none">

            {/* Title */}
            <Text style={styles.title}>Enter time</Text>

            {/* Hour : Minute + AM/PM row */}
            <View style={styles.timeRow}>

              {/* Hour box */}
              <TextInput
                style={[styles.timeBox, isHourSelected ? styles.timeBoxSelected : styles.timeBoxUnselected, styles.timeInput, { color: isHourSelected ? '#FFFFFF' : '#B0B7C3' }]}
                value={String(selectedTime.hours)}
                onChangeText={handleHourChange}
                onFocus={() => setIsHourSelected(true)}
                keyboardType="number-pad"
                maxLength={2}
                selectionColor="#4e68a6"
                cursorColor="#6B8FDB"
              />

              <Text style={styles.colon}>:</Text>

              {/* Minute box */}
              <TextInput
                style={[styles.timeBox, !isHourSelected ? styles.timeBoxSelected : styles.timeBoxUnselected, styles.timeInput, { color: !isHourSelected ? '#FFFFFF' : '#B0B7C3' }]}
                value={String(selectedTime.minutes)}
                onChangeText={handleMinuteChange}
                onFocus={() => setIsHourSelected(false)}
                keyboardType="number-pad"
                maxLength={2}
                selectionColor="#4e68a6"
                cursorColor="#6B8FDB"
              />

              {/* AM/PM toggle */}
              <View style={styles.amPmContainer}>
                <TouchableOpacity 
                  style={[styles.amPmButton, selectedTime.isAm ? styles.amPmButtonSelected : styles.amPmButtonUnselected]} 
                  onPress={() => toggleAMPM(true)}
                  activeOpacity={0.8}
                >
                  <Text style={selectedTime.isAm ? styles.amPmTextSelected : styles.amPmTextUnselected}>AM</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.amPmButton, !selectedTime.isAm ? styles.amPmButtonSelected : styles.amPmButtonUnselected]} 
                  onPress={() => toggleAMPM(false)}
                  activeOpacity={0.8}
                >
                  <Text style={!selectedTime.isAm ? styles.amPmTextSelected : styles.amPmTextUnselected}>PM</Text>
                </TouchableOpacity>
              </View>

            </View>

            {/* Hour / Minute labels */}
            <View style={styles.labelsRow}>
              <Text style={styles.fieldLabel}>Hour</Text>
              <Text style={[styles.fieldLabel, styles.minuteLabel]}>Minute</Text>
            </View>

            {/* Separator */}
            <View style={styles.separator} />

            {/* Bottom row: Cancel + OK */}
            <View style={styles.actionsRow}>
              <TouchableOpacity onPress={onClose} hitSlop={{ top: 12, bottom: 12, left: 16, right: 16 }}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressOkay} disabled={!isTimeValid()} activeOpacity={isTimeValid() ? 0.7 : 0.3} hitSlop={{ top: 12, bottom: 12, left: 16, right: 16 }}>
                <Text style={[styles.okButton, !isTimeValid() && styles.actionButtonDisabled]}>OK</Text>
              </TouchableOpacity>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: SCREEN_HEIGHT * 0.24,
  },
  container: {
    backgroundColor: '#1c2238',
    borderRadius: normalize(16),
    width: '90%',
    maxWidth: normalizeWidth(400),
    paddingHorizontal: normalizeWidth(16),
    paddingTop: normalizeHeight(16),
    paddingBottom: normalizeHeight(12),
  },
  title: {
    fontSize: normalize(20),
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: normalizeHeight(16),
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeBox: {
    borderRadius: normalize(8),
    width: normalizeWidth(96),
    height: normalizeHeight(72),
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeBoxSelected: {
    backgroundColor: 'rgba(78, 104, 166, 0.5)',
    borderWidth: 2,
    borderColor: '#4e68a6',
  },
  timeBoxUnselected: {
    backgroundColor: 'rgba(42, 50, 75, 1)',
    borderWidth: 1,
    borderColor: 'rgba(68, 75, 95, 1)',
  },
  timeBoxTextSelected: {
    fontSize: normalize(40),
    fontWeight: '500',
    color: '#FFFFFF',
  },
  timeBoxTextUnselected: {
    fontSize: normalize(40),
    fontWeight: '500',
    color: '#B0B7C3',
  },  timeInput: {
    fontSize: normalize(48),
    fontWeight: '300',
    textAlign: 'center',
    padding: 0,
    color: '#FFFFFF',
    lineHeight: normalize(50),
    height: normalizeHeight(72),
  },  colon: {
    fontSize: normalize(40),
    fontWeight: '300',
    color: '#FFFFFF',
    marginHorizontal: normalizeWidth(8),
    marginBottom: normalizeHeight(8),
  },
  amPmContainer: {
    marginLeft: normalizeWidth(12),
    borderRadius: normalize(8),
    borderWidth: 1,
    borderColor: 'rgba(68, 75, 95, 1)',
    overflow: 'hidden',
    backgroundColor: 'rgba(42, 50, 75, 1)',
  },
  amPmButton: {
    width: normalizeWidth(52),
    height: normalizeHeight(36),
    justifyContent: 'center',
    alignItems: 'center',
  },
  amPmButtonSelected: {
    backgroundColor: 'rgba(78, 104, 166, 0.5)',
  },
  amPmButtonUnselected: {
    backgroundColor: 'rgba(42, 50, 75, 1)',
  },
  amPmTextSelected: {
    fontSize: normalize(14),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  amPmTextUnselected: {
    fontSize: normalize(14),
    fontWeight: '400',
    color: '#B0B7C3',
  },
  labelsRow: {
    flexDirection: 'row',
    marginTop: normalizeHeight(4),
  },
  fieldLabel: {
    fontSize: normalize(13),
    color: '#B0B7C3',
    width: normalizeWidth(96),
    textAlign: 'center',
  },
  minuteLabel: {
    marginLeft: normalizeWidth(16),
  },
  separator: {
    height: normalizeHeight(1),
    backgroundColor: 'rgba(68, 75, 95, 0.5)',
    marginTop: normalizeHeight(16),
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalizeWidth(24),
    marginTop: normalizeHeight(12),
  },
  cancelButton: {
    fontSize: normalize(14),
    fontWeight: '500',
    color: '#B0B0B0',
  },
  okButton: {
    fontSize: normalize(15),
    fontWeight: '500',
    color: '#6B8FDB',
  },
  actionButtonDisabled: {
    color: 'rgba(255,255,255,0.3)',
  },
});

export default TimeSelectionModal;
