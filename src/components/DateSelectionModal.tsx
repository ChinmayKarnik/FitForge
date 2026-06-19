import React, { useRef } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { normalize, normalizeWidth, normalizeHeight } from '../utils/normalize';

const left_arrow = require('../images/white-left-arrow.png');
const right_arrow = require('../images/white-right-arrow.png');


const DateSelectionModal = ({ visible, onClose,
  selectedDate:selectedDateProps,onConfirmDate
 }) => {

  const [selectedDate, setSelectedDate] = React.useState(selectedDateProps);
  const currentDateRef = useRef(new Date());
  const [displayMonth,setDisplayMonth] = React.useState(currentDateRef.current.getMonth());
  const [displayYear,setDisplayYear] = React.useState(currentDateRef.current.getFullYear());

  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
  const firstDayWeekday = new Date(displayYear, displayMonth, 1).getDay();

  const totalCells = firstDayWeekday + daysInMonth;
  const numberOfRows = Math.ceil(totalCells / 7);

  const onPressOkay = ()=>{
    onConfirmDate(selectedDate);
    onClose();
  }

  const renderCalendarRows = () => {
    const rows = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let row = 0; row < numberOfRows; row++) {
      const cells = [];

      for (let col = 0; col < 7; col++) {
        const cellIndex = row * 7 + col;
        const dateNumber = cellIndex - firstDayWeekday + 1;

        if (dateNumber < 1 || dateNumber > daysInMonth) {
          cells.push(
            <View key={`blank-${displayYear}-${displayMonth}-${row}-${col}`} style={styles.dateCell} />
          );
        } else {
          const thisDate = new Date(displayYear, displayMonth, dateNumber);
          thisDate.setHours(0, 0, 0, 0);
          const isFuture = thisDate > today;
          const isSelected =
            selectedDate.getDate() === dateNumber &&
            selectedDate.getMonth() === displayMonth &&
            selectedDate.getFullYear() === displayYear;
          const isToday =
            dateNumber === today.getDate() &&
            displayMonth === today.getMonth() &&
            displayYear === today.getFullYear();
          cells.push(
            <TouchableOpacity
              key={`date-${displayYear}-${displayMonth}-${dateNumber}`}
              style={[
                styles.dateCell,
                isSelected && styles.selectedDateCell,
                !isSelected && isToday && styles.todayDateCell,
              ]}
              onPress={() => {
                if (!isFuture) {
                  setSelectedDate(new Date(displayYear, displayMonth, dateNumber));
                }
              }}
              disabled={isFuture}
            >
              <Text style={[
                styles.dateText,
                isFuture && { color: 'rgba(176, 183, 195, 0.4)' },
                isSelected && styles.selectedDateText,
                !isSelected && isToday && styles.todayDateText,
              ]}>{dateNumber}</Text>
            </TouchableOpacity>
          );
        }
      }

      rows.push(
        <View key={`row-${row}`} style={styles.weekRow}>
          {cells}
        </View>
      );
    }

    return rows;
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
        <View style={styles.centeredContent} pointerEvents="box-none">
          <View style={styles.container}>
            <Text style={styles.dateDisplay}>
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
            </Text>
            <View style={styles.separator} />

            <View style={styles.monthNavigationRow}>
              <TouchableOpacity
                style={styles.arrowButton}
                hitSlop={{ top: 12, bottom: 12, left: 16, right: 16 }}
                onPress={() => {
                  if (displayMonth === 0) {
                    setDisplayMonth(11);
                    setDisplayYear(displayYear - 1);
                  } else {
                    setDisplayMonth(displayMonth - 1);
                  }
                }}
              >
                <Image source={left_arrow} style={styles.arrowImage} />
              </TouchableOpacity>

              <Text style={styles.monthYearText}>
                {new Date(displayYear, displayMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </Text>

              <TouchableOpacity
                style={styles.arrowButton}
                hitSlop={{ top: 12, bottom: 12, left: 16, right: 16 }}
                onPress={() => {
                  if (displayMonth === 11) {
                    setDisplayMonth(0);
                    setDisplayYear(displayYear + 1);
                  } else {
                    setDisplayMonth(displayMonth + 1);
                  }
                }}
              >
                <Image source={right_arrow} style={styles.arrowImage} />
              </TouchableOpacity>
            </View>

            <View style={styles.calendarContainer}>
              <View style={styles.weekdayRow}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                  <Text key={`weekday-${displayYear}-${displayMonth}-${idx}`} style={styles.weekdayText}>{day}</Text>
                ))}
              </View>
              {renderCalendarRows()}
            </View>

             <View style={styles.separator} />

            {/* Action Buttons at the bottom, mimic reference */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: normalizeHeight(12),
                paddingHorizontal: normalizeWidth(40),
              }}
            >
              <TouchableOpacity onPress={onClose}>
                <Text style={{ color: '#B0B0B0', fontSize: normalize(14), fontWeight: '500',
                }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressOkay}>
                <Text style={{ color: '#FF3B30', fontSize: normalize(15), fontWeight: '500' }}>OK</Text>
              </TouchableOpacity>
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
    marginTop: normalizeHeight(24),
    marginBottom: normalizeHeight(20),
    marginLeft: normalizeWidth(16),
  },
  separator: {
    height: normalizeHeight(1),
    backgroundColor: 'rgba(68, 75, 95, 0.5)',
  },
  monthNavigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: normalizeHeight(12),
    paddingHorizontal: normalizeWidth(24),
  },
  monthYearText: {
    fontSize: normalize(14),
    fontWeight: '500',
    color: '#B0B7C3',
  },
  arrowButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowImage: {
    width: normalize(8),
    height: normalize(13),
    tintColor: '#B0B7C3',
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
    paddingHorizontal: normalizeWidth(10),
    paddingTop: normalizeHeight(16),
  },
  weekdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: normalizeHeight(8),
  },
  weekdayText: {
    fontSize: normalize(14),
    fontWeight: '500',
    color: '#FFFFFF',
    width: `${100 / 7}%`,
    textAlign: 'center',
  },
  weekRow: {
    flexDirection: 'row',
  },
  dateCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: normalizeHeight(38),
  },
  dateText: {
    fontSize: normalize(16),
    fontWeight: '500',
    color: '#FFFFFF',
  },
  selectedDateCell: {
    backgroundColor: '#FF5C2A', // orangish
    borderRadius: Math.max(normalizeWidth(38), normalizeHeight(38)) / 2,
    width: normalizeWidth(38),
    height: normalizeHeight(38),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  selectedDateText: {
    color: '#FFF',
    fontWeight: '700',
  },
  todayDateCell: {
    borderWidth: 2,
    borderColor: '#FF5C2A',
    borderRadius: Math.max(normalizeWidth(38), normalizeHeight(38)) / 2,
    width: normalizeWidth(38),
    height: normalizeHeight(38),
    marginHorizontal: normalizeWidth(1),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  todayDateText: {
    color: '#FF5C2A',
    fontWeight: '700',
  },
});

export default DateSelectionModal;