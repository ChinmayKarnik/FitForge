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

  // Calculate number of days in the displayed month
  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
  
  // Calculate the weekday of the first day of the displayed month (0 = Sunday, 1 = Monday, etc.)
  const firstDayWeekday = new Date(displayYear, displayMonth, 1).getDay();

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
            <Text style={styles.selectDateLabel}>Select date</Text>
            <Text style={styles.dateDisplay}>
              {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </Text>
            <View style={styles.separator} />
            <View style={styles.monthNavigationRow}>
              <View style={styles.monthYearSection}>
                <Text style={styles.monthYearText}>
                  {new Date(displayYear, displayMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </Text>
                <Text style={styles.dropdownCaret}>▼</Text>
              </View>
              <View style={styles.navigationArrows}>
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => {
                    if (displayMonth === 0) {
                      setDisplayMonth(11);
                      setDisplayYear(displayYear - 1);
                    } else {
                      setDisplayMonth(displayMonth - 1);
                    }
                  }}
                >
                  <Text style={styles.arrowText}>‹</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => {
                    if (displayMonth === 11) {
                      setDisplayMonth(0);
                      setDisplayYear(displayYear + 1);
                    } else {
                      setDisplayMonth(displayMonth + 1);
                    }
                  }}
                >
                  <Text style={styles.arrowText}>›</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Calendar Grid */}
            <View style={styles.calendarContainer}>
              {/* Weekday headers */}
              <View style={styles.weekdayRow}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                  <Text key={day} style={styles.weekdayText}>{day}</Text>
                ))}
              </View>
              
              {/* Date cells */}
              <View style={styles.datesGrid}>
                {/* Blank cells before the first date */}
                {Array.from({ length: firstDayWeekday }).map((_, index) => (
                  <View key={`blank-${displayMonth}-${displayYear}-${index}`} style={styles.dateCell} />
                ))}
                
                {/* Date cells */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const date = index + 1;
                  return (
                    <TouchableOpacity
                      key={`date-${displayMonth}-${displayYear}-${date}`}
                      style={styles.dateCell}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.dateText}>{date}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </View>
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
  monthNavigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: normalizeHeight(4),
    paddingHorizontal: normalizeWidth(16),
  },
  monthYearSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthYearText: {
    fontSize: normalize(14),
    fontWeight: '500',
    color: '#B0B7C3',
    marginRight: normalizeWidth(6),
  },
  dropdownCaret: {
    fontSize: normalize(12),
    color: '#B0B7C3',
  },
  navigationArrows: {
    flexDirection: 'row',
    gap: normalizeWidth(12),
  },
  arrowButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: normalize(24),
    color: '#B0B7C3',
    fontWeight: '300',
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
  calendarContainer: {
   paddingHorizontal: normalizeWidth(16),
    paddingVertical: normalizeHeight(12),
    borderWidth:1,
    borderColor:'red'
  },
  weekdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: normalizeHeight(8),
  },
  weekdayText: {
    fontSize: normalize(14),
    fontWeight: '500',
    color: '#B0B7C3',
    width: `${100 / 7}%`,
    textAlign: 'center',
  },
  datesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: normalize(16),
    fontWeight: '500',
    color: '#B0B7C3',
  },
});

export default DateSelectionModal;
