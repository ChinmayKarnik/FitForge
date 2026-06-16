import React from 'react';
import { View, Image } from 'react-native';

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
}

const ProfileImageSquare: React.FC<ProfileImageSquareProps> = ({
  imageSource,
  width,
  aspectRatio,
  crop,
}) => {
  const SQUARE_SIZE = width;
  const [imageAspectRatio, setImageAspectRatio] = React.useState(aspectRatio ?? 1);

  const isImageHorizontal = imageAspectRatio >= 1.0;

  let imageWidth, imageHeight;
  if (isImageHorizontal) {
    imageWidth = SQUARE_SIZE / crop.size;
    imageHeight = imageWidth / imageAspectRatio;
  } else {
    imageHeight = SQUARE_SIZE / crop.size;
    imageWidth = imageHeight * imageAspectRatio;
  }

  React.useEffect(() => {
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
        backgroundColor: '#252d47',
      }}
    >
      <Image
        source={imageSource}
        style={{
          position: 'absolute',
          width: imageWidth,
          height: imageHeight,
          left: -crop.x * imageWidth,
          top: -crop.y * imageHeight,
        }}
      />
    </View>
  );
};

export default ProfileImageSquare;
