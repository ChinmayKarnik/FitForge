//@ts-nocheck
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import RNShare from 'react-native-share';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';

type Props = {
  visible: boolean;
  uri: string | null;
  message: string;
  onClose: () => void;
  workoutName?: string;
  durationText?: string;
  exerciseCount?: number;
  totalSets?: number;
};

const SharePreviewModal = ({ visible, uri, message, onClose, workoutName, durationText, exerciseCount, totalSets }: Props) => {
  const onShare = async () => {
    try {
      await RNShare.open({ url: uri, type: 'image/png', message });
    } catch (_) {}
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' }}>

        {/* Tap outside to dismiss */}
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose} />

        <View style={{
          backgroundColor: '#1e2440',
          borderTopLeftRadius: normalize(24),
          borderTopRightRadius: normalize(24),
          paddingHorizontal: normalizeWidth(24),
          paddingTop: normalizeHeight(28),
          paddingBottom: normalizeHeight(40),
        }}>

          {/* Close */}
          <TouchableOpacity
            onPress={onClose}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={{ position: 'absolute', top: normalizeHeight(16), right: normalizeWidth(20) }}
          >
            <Text style={{ color: 'rgba(255,255,255,0.35)', fontSize: normalize(18) }}>✕</Text>
          </TouchableOpacity>

          {/* Emoji */}
          <Text style={{ fontSize: normalize(48), textAlign: 'center', marginBottom: normalizeHeight(10) }}>🔥</Text>

          {/* Headline */}
          <Text style={{ color: '#ffffff', fontSize: normalize(24), fontWeight: '800', textAlign: 'center', marginBottom: normalizeHeight(6) }}>
            Workout Complete!
          </Text>

          {/* Workout name */}
          {workoutName ? (
            <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: normalize(14), textAlign: 'center', marginBottom: normalizeHeight(28) }}>
              {workoutName}
            </Text>
          ) : null}

          {/* Stats row */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: normalizeHeight(32) }}>
            {durationText ? (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#ffffff', fontSize: normalize(26), fontWeight: '800' }}>{durationText}</Text>
                <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: normalize(10), fontWeight: '600', letterSpacing: 0.8, marginTop: normalizeHeight(4) }}>DURATION</Text>
              </View>
            ) : null}
            {exerciseCount != null ? (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#ffffff', fontSize: normalize(26), fontWeight: '800' }}>{exerciseCount}</Text>
                <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: normalize(10), fontWeight: '600', letterSpacing: 0.8, marginTop: normalizeHeight(4) }}>EXERCISES</Text>
              </View>
            ) : null}
            {totalSets != null ? (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#ffffff', fontSize: normalize(26), fontWeight: '800' }}>{totalSets}</Text>
                <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: normalize(10), fontWeight: '600', letterSpacing: 0.8, marginTop: normalizeHeight(4) }}>SETS</Text>
              </View>
            ) : null}
          </View>

          {/* Share CTA */}
          <TouchableOpacity
            onPress={onShare}
            activeOpacity={0.85}
            style={{
              backgroundColor: '#fb7028',
              borderRadius: normalize(14),
              paddingVertical: normalizeHeight(16),
              alignItems: 'center',
              marginBottom: normalizeHeight(14),
            }}
          >
            <Text style={{ color: '#ffffff', fontSize: normalize(16), fontWeight: '700', letterSpacing: 0.2 }}>
              Share your workout 💪
            </Text>
          </TouchableOpacity>

          {/* Not now */}
          <TouchableOpacity onPress={onClose} activeOpacity={0.7} style={{ alignItems: 'center' }}>
            <Text style={{ color: 'rgba(255,255,255,0.35)', fontSize: normalize(13) }}>Not now</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default SharePreviewModal;
