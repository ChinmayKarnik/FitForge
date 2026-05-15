//@ts-nocheck
import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import RNExitApp from 'react-native-exit-app';
import heartOnHouse from '../images/heart-on-house.png';
import exitIconWhite from '../images/exit-icon-white.png';
import palmWithTick from '../images/palm-with-tick.png';

const ExitButton = () => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: '#6d1828',
        borderRadius: normalize(14),
        paddingVertical: normalizeHeight(14),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#733146'
      }}
      onPress={() => RNExitApp.exitApp()}
      activeOpacity={0.8}
    >
      <Image
        source={exitIconWhite}
        style={{
          width: normalizeWidth(20),
          aspectRatio: (590.0 / 576.0),
          marginRight: normalizeWidth(8),
          tintColor: '#dfdee3'
        }}
      />
      <Text style={{
        color: '#e9d1d2',
        fontWeight: '600',
        fontSize: normalize(16)
      }}>Exit</Text>
    </TouchableOpacity>
  );
};

const StayButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: '#1c3975',
        borderRadius: normalize(14),
        paddingVertical: normalizeHeight(14),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#3b538b'
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={heartOnHouse}
        style={{
          width: normalizeWidth(20),
          aspectRatio: (594.0 / 494.0),
          marginRight: normalizeWidth(6)
        }}
      />
      <Text style={{
        color: '#e5eefd',
        fontWeight: '600',
        fontSize: normalize(16)
      }}>Stay</Text>
    </TouchableOpacity>
  );
};

const ExitAppModal = ({ visible, onClose }) => {

  const descText = "You're about to leave FitForge.\nSee you later?"
  const mainImageWidth = normalize(70);
  const mainImageAspectRatio =  (627.0 / 686.0);
  const mainImageHeight = mainImageWidth/ mainImageAspectRatio
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
        backgroundColor: 'rgba(0,0,0,0.6)'
      }}>
        <View style={{ width: '90%' }}>
          <View style={{
            backgroundColor: '#1f2238',
            borderRadius: normalize(20),
            paddingHorizontal: normalizeWidth(14),
            paddingTop: normalizeHeight(28),
            paddingBottom: normalizeHeight(15),
            alignItems: 'center',
            borderWidth: normalize(1),
            borderColor: '#4d5373'
          }}>
            <Image
              source={palmWithTick}
              style={{
                width: mainImageWidth,
                aspectRatio: mainImageAspectRatio,
                height: mainImageHeight,
                marginBottom: normalizeHeight(16)
              }}
            />

            <Text style={{
              color: '#F2F4F8',
              fontSize: normalize(24),
              fontWeight: '600',
              textAlign: 'center'
            }}>Hold on!</Text>

            <Text style={{
              color: '#9ca3af',
              fontSize: normalize(16),
              fontWeight: '400',
              marginTop: normalizeHeight(12),
              textAlign: 'center',
            }}>{descText}</Text>

            <View style={{
              marginTop: normalizeHeight(24),
              flexDirection: 'row',
              width: '100%',
              gap: normalizeWidth(12)
            }}>
              <ExitButton />
              <StayButton onPress={onClose} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ExitAppModal;
