import React, { useEffect } from 'react';
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
  crop,
}) => {
 
  const AVATAR_SIZE = width;
  const [imageAspectRatio, setImageAspectRatio] = React.useState(1);

  const isImageHorizontal = imageAspectRatio >= 1.0
  
  let imageWidth,imageHeight;
  if (isImageHorizontal) {
    imageWidth = AVATAR_SIZE / crop.size;

    imageHeight = imageWidth / imageAspectRatio;
  } else {
    imageHeight = AVATAR_SIZE/crop.size;
    imageWidth = (imageHeight*1.0) * imageAspectRatio
  }
  

  
  useEffect(() => {
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
        backgroundColor:'black'
      }}
    >
      <Image
        source={imageSource}
        style={{
          position: 'absolute',
          width:imageWidth,
          height: imageHeight,
          left: -crop.x * (imageWidth),
          top: -crop.y * (imageHeight),
        }}
      />
    </View>
  );
};

export default ProfileImageCircular;
