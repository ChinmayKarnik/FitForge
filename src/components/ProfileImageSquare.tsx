import React from 'react';
import { View, Image } from 'react-native';
import profile_photo_default from '../images/profile-photo-default.png';

interface CropConfig {
  x: number;
  y: number;
  size: number;
}

interface ProfileImageSquareProps {
  imageSource: any;
  width: number;
  aspectRatio: number;
  crop: CropConfig;
  onFallback?: () => void;
}

const ProfileImageSquare: React.FC<ProfileImageSquareProps> = ({
  imageSource,
  width,
  aspectRatio,
  crop,
  onFallback,
}) => {
  const SQUARE_SIZE = width;
  const [imageAspectRatio, setImageAspectRatio] = React.useState(aspectRatio ?? 1);
  const [hasError, setHasError] = React.useState(false);

  const activeSrc = hasError ? profile_photo_default : imageSource;
  const activeCrop = hasError ? { x: 0, y: 0, size: 1 } : crop;
  const activeAspectRatio = hasError ? 1 : imageAspectRatio;

  const isImageHorizontal = activeAspectRatio >= 1.0;

  let imageWidth, imageHeight;
  if (isImageHorizontal) {
    imageWidth = SQUARE_SIZE / activeCrop.size;
    imageHeight = imageWidth / activeAspectRatio;
  } else {
    imageHeight = SQUARE_SIZE / activeCrop.size;
    imageWidth = imageHeight * activeAspectRatio;
  }

  React.useEffect(() => {
    setHasError(false);
    if (imageSource?.uri) {
      Image.getSize(imageSource.uri, (w, h) => {
        setImageAspectRatio(w / h);
      });
    }
  }, [imageSource?.uri]);

  return (
    <View
      style={{
        width: SQUARE_SIZE,
        height: SQUARE_SIZE,
        overflow: 'hidden',
        backgroundColor: 'black',
      }}
    >
      <Image
        source={activeSrc}
        style={{
          position: 'absolute',
          width: imageWidth,
          height: imageHeight,
          left: -activeCrop.x * imageWidth,
          top: -activeCrop.y * imageHeight,
        }}
        onError={() => { setHasError(true); onFallback?.(); }}
      />
    </View>
  );
};

export default ProfileImageSquare;
