//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import RNShare from 'react-native-share';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';

type Props = {
  visible: boolean;
  uri: string | null;
  message: string;
  onClose: () => void;
};

const SharePreviewModal = ({ visible, uri, message, onClose }: Props) => {
  const [imageAspectRatio, setImageAspectRatio] = useState(0.9);

  useEffect(() => {
    if (!uri) return;
    Image.getSize(uri, (w, h) => {
      if (w && h) setImageAspectRatio(w / h);
    });
  }, [uri]);

  const onShare = async () => {
    try {
      await RNShare.open({ url: uri, type: 'image/png', message });
    } catch (_) {}
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.72)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: normalizeWidth(20),
      }}>
        <View style={{
          width: '100%',
          backgroundColor: '#1e2440',
          borderRadius: normalize(16),
          borderWidth: 1,
          borderColor: '#2e3458',
          paddingHorizontal: normalizeWidth(20),
          paddingTop: normalizeHeight(22),
          paddingBottom: normalizeHeight(20),
        }}>

          {/* Headline + close */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: normalizeHeight(4) }}>
            <View style={{ flex: 1 }}>
              <Text style={{
                color: '#ffffff',
                fontSize: normalize(18),
                fontWeight: '700',
              }}>Share your workout 💪</Text>
              <Text style={{
                color: 'rgba(255,255,255,0.48)',
                fontSize: normalize(12),
                lineHeight: normalize(18),
                marginTop: normalizeHeight(4),
              }}>
                Let your friends know what you've been up to.
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={{ marginLeft: normalizeWidth(12), marginTop: 2 }}
            >
              <Text style={{ color: 'rgba(255,255,255,0.35)', fontSize: normalize(18) }}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* YOUR WORKOUT CARD label */}
          <Text style={{
            color: 'rgba(255,255,255,0.28)',
            fontSize: normalize(10),
            letterSpacing: 1.4,
            fontWeight: '600',
            marginTop: normalizeHeight(16),
            marginBottom: normalizeHeight(8),
          }}>YOUR WORKOUT CARD</Text>

          {/* Card preview — fixed height so everything fits */}
          {uri && (
            <Image
              source={{ uri }}
              style={{
                width: '100%',
                height: normalizeHeight(200),
                borderRadius: normalize(10),
                marginBottom: normalizeHeight(14),
              }}
              resizeMode="contain"
            />
          )}

          {/* GOES WITH THIS MESSAGE label */}
          <Text style={{
            color: 'rgba(255,255,255,0.28)',
            fontSize: normalize(10),
            letterSpacing: 1.4,
            fontWeight: '600',
            marginBottom: normalizeHeight(8),
          }}>GOES WITH THIS MESSAGE</Text>

          {/* Caption box */}
          <View style={{
            backgroundColor: '#272d46',
            borderRadius: normalize(8),
            borderWidth: 1,
            borderColor: '#33395a',
            paddingHorizontal: normalizeWidth(12),
            paddingVertical: normalizeHeight(10),
            marginBottom: normalizeHeight(18),
          }}>
            <Text style={{
              color: 'rgba(255,255,255,0.58)',
              fontSize: normalize(12),
              lineHeight: normalize(18),
            }}>{message}</Text>
          </View>

          {/* Share with Friends button */}
          <TouchableOpacity
            onPress={onShare}
            activeOpacity={0.8}
            style={{
              backgroundColor: '#3a4fa0',
              borderRadius: normalize(10),
              paddingVertical: normalizeHeight(13),
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#5a72c4',
              marginBottom: normalizeHeight(10),
            }}
          >
            <Text style={{ color: '#eef0fb', fontSize: normalize(15), fontWeight: '600', letterSpacing: 0.3 }}>
              Share with Friends
            </Text>
          </TouchableOpacity>

          {/* Not now */}
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.7}
            style={{ alignItems: 'center' }}
          >
            <Text style={{ color: 'rgba(255,255,255,0.35)', fontSize: normalize(13) }}>
              Not now
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default SharePreviewModal;
