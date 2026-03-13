import React from 'react';
import { View, Image } from 'react-native';

interface CropConfig {
  x: number;
  y: number;
  size: number;
}

interface ProfileImageCircularProps {
  imageSource: any;
  width: number;
  aspectRatio: number;
  crop: CropConfig;
}

const ProfileImageCircular: React.FC<ProfileImageCircularProps> = ({
  imageSource,
  width,
  aspectRatio,
  crop,
}) => {
  const height = width * aspectRatio;
  const AVATAR_SIZE = width;

  return (
    <View
      style={{
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        overflow: 'hidden',
      }}
    >
      <Image
        source={imageSource}
        style={{
          position: 'absolute',
          width: AVATAR_SIZE / crop.size,
          height: AVATAR_SIZE / crop.size,
          left: -crop.x * (AVATAR_SIZE / crop.size),
          top: -crop.y * (AVATAR_SIZE / crop.size),
        }}
      />
    </View>
  );
};

export default ProfileImageCircular;
