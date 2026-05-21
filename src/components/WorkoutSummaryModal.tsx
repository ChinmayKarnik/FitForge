import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import CurrentWorkoutList from './CurrentWorkoutList';
import cross_icon from '../images/cross-icon-white.png';

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
        backgroundColor: 'rgba(0,0,0,0.65)',
        paddingTop: normalizeHeight(60),
      }}>
        <View style={{
          width: '100%',
          paddingHorizontal: normalizeWidth(16),
          maxHeight: '85%',
        }}>
          <View style={{
            backgroundColor: '#262745',
            borderRadius: normalize(12),
            borderWidth: normalize(1),
            borderColor: '#37384b',
            paddingTop: normalizeHeight(20),
            paddingBottom: normalizeHeight(20),
          }}>
            <View style={{ paddingHorizontal: normalizeWidth(16) }}>
              <Text style={{
                color: '#F2F4F8',
                fontSize: normalize(18),
                fontWeight: '600',
                textAlign: 'center',
                alignSelf: 'stretch',
              }}>
                Workout Summary
              </Text>
              <TouchableOpacity
                onPress={onClose}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                activeOpacity={0.7}
                style={{ position: 'absolute', right: normalizeWidth(16), top: 0, bottom: 0, justifyContent: 'center' }}
              >
                <Image
                  source={cross_icon}
                  style={{ width: normalizeWidth(14), height: normalizeWidth(14) * (120 / 122), resizeMode: 'contain', tintColor: '#8a90b0' }}
                />
              </TouchableOpacity>
            </View>

            <CurrentWorkoutList
              workout={workout}
              emptyStateText="No exercises were logged in this workout"
              horizontalPadding={true}
              showHeaderDivider={false}
              listMaxHeight={normalizeHeight(380)}
              showSectionHeader={false}
            />

          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WorkoutSummaryModal;
