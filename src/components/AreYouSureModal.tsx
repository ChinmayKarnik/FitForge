//@ts-nocheck
import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';

const AreYouSureModal = ({
  visible,
  onClose,
  title,
  description,
  primaryLabel,
  onPrimary,
  primaryVariant,
  secondaryLabel,
  onSecondary,
}) => {
  const isDestructive = primaryVariant === 'destructive';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          style={{ width: '100%', paddingHorizontal: normalizeWidth(24) }}
        >
          <View style={{
            backgroundColor: '#262745',
            borderRadius: normalize(14),
            borderWidth: normalize(1),
            borderColor: '#37384b',
            paddingTop: normalizeHeight(24),
            paddingBottom: normalizeHeight(24),
            paddingHorizontal: normalizeWidth(20),
            alignItems: 'center',
          }}>

            {/* Icon */}
            <Image
              source={require('../images/warning-circle-border.png')}
              style={{ width: normalizeWidth(56), height: normalizeWidth(56) * (585/606), marginBottom: normalizeHeight(16) }}
            />

            {/* Title */}
            <Text style={{
              color: '#F2F4F8',
              fontSize: normalize(18),
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: normalizeHeight(8),
            }}>{title}</Text>

            {/* Description */}
            <Text style={{
              color: '#acadba',
              fontSize: normalize(13),
              fontWeight: '400',
              textAlign: 'center',
              lineHeight: normalize(19),
              marginBottom: normalizeHeight(24),
            }}>{description}</Text>

            {/* Buttons */}
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: '#313967',
                  borderRadius: normalize(10),
                  paddingVertical: normalize(13),
                  marginRight: normalize(6),
                  alignItems: 'center',
                  borderWidth: normalize(1),
                  borderColor: '#536196',
                }}
                onPress={onSecondary || onClose}
                activeOpacity={0.8}
              >
                <Text style={{ color: '#e4e5ee', fontWeight: '500', fontSize: normalize(15) }}>
                  {secondaryLabel || 'Cancel'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: isDestructive ? '#6c1e29' : '#313967',
                  borderRadius: normalize(10),
                  paddingVertical: normalize(13),
                  marginLeft: normalize(6),
                  alignItems: 'center',
                  borderWidth: normalize(1),
                  borderColor: isDestructive ? '#a6353f' : '#536196',
                }}
                onPress={onPrimary}
                activeOpacity={0.8}
              >
                <Text style={{ color: '#F2F4F8', fontWeight: '500', fontSize: normalize(15) }}>
                  {primaryLabel}
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default AreYouSureModal;
