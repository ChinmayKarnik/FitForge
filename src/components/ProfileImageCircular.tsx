import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import profile_photo_default from '../images/profile-photo-default.png';

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
  onFallback?: () => void;
}

const ProfileImageCircular: React.FC<ProfileImageCircularProps> = ({
  imageSource,
  width,
  crop,
  onFallback,
}) => {

  const AVATAR_SIZE = width;
  const [imageAspectRatio, setImageAspectRatio] = React.useState(1);
  const [hasError, setHasError] = React.useState(false);

  const activeSrc = hasError ? profile_photo_default : imageSource;
  const activeCrop = hasError ? { x: 0, y: 0, size: 1 } : crop;
  const activeAspectRatio = hasError ? 1 : imageAspectRatio;

  const isImageHorizontal = activeAspectRatio >= 1.0;

  let imageWidth,imageHeight;
  if (isImageHorizontal) {
    imageWidth = AVATAR_SIZE / activeCrop.size;
    imageHeight = imageWidth / activeAspectRatio;
  } else {
    imageHeight = AVATAR_SIZE / activeCrop.size;
    imageWidth = (imageHeight*1.0) * activeAspectRatio;
  }

  useEffect(() => {
    setHasError(false);
    if (imageSource?.uri) {
      Image.getSize(imageSource.uri, (width, height) => {
        setImageAspectRatio(width / height);
      });
    }
  }, [imageSource?.uri]);

  return (
    <View
      style={{
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        overflow: 'hidden',
        backgroundColor:'#252d47'
      }}
    >
      <Image
        source={activeSrc}
        style={{
          position: 'absolute',
          width:imageWidth,
          height: imageHeight,
          left: -activeCrop.x * (imageWidth),
          top: -activeCrop.y * (imageHeight),
        }}
        onError={() => { setHasError(true); onFallback?.(); }}
      />
    </View>
  );
};

export default ProfileImageCircular;
