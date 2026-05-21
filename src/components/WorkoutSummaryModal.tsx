import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import CurrentWorkoutList from './CurrentWorkoutList';

const WorkoutSummaryModal = ({
  visible,
  onClose,
  workout,
}: {
  visible: boolean;
  onClose: () => void;
  workout: any;
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
      }}>
        <View style={{
          width: '100%',
          paddingHorizontal: normalizeWidth(16),
          height: '85%',
        }}>
          <View style={{
            backgroundColor: '#262745',
            borderRadius: normalize(12),
            borderWidth: normalize(1),
            borderColor: '#37384b',
            paddingTop: normalizeHeight(20),
            paddingBottom: normalizeHeight(20),
            flex: 1,
          }}>
            <Text style={{
              color: '#F2F4F8',
              fontSize: normalize(18),
              fontWeight: '600',
              paddingHorizontal: normalizeWidth(16),
            }}>
              Workout Summary
            </Text>

            <View style={{ flex: 1, marginTop: normalizeHeight(8) }}>
              <CurrentWorkoutList
                workout={workout}
                emptyStateText="No exercises were logged in this workout"
                horizontalPadding={true}
              />
            </View>

            <TouchableOpacity
              style={{
                marginTop: normalizeHeight(12),
                marginHorizontal: normalizeWidth(16),
                backgroundColor: '#313967',
                borderRadius: normalize(8),
                paddingVertical: normalize(10),
                alignItems: 'center',
                borderWidth: normalize(1),
                borderColor: '#536196',
              }}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={{ color: '#e4e5ee', fontWeight: '500', fontSize: normalize(15) }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WorkoutSummaryModal;
