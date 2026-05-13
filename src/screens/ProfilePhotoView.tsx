import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { normalizeHeight, normalizeWidth } from '../utils/normalize';
import white_left_arrow from '../images/white-left-arrow.png';
import profile_photo_default from '../images/profile-photo-default.png';
import { databaseController } from '../data';


const SCREEN = Dimensions.get('window');

export default function ProfilePhotoView() {
  const navigation = useNavigation<any>();

  const [profilePhotoPath, setProfilePhotoPath] = useState<string | null>(null);
  

  const [imgDimensions, setImgDimensions] = useState<{ width: number, height: number } | null>(null);
      
  const isHorizontalImage = imgDimensions ? imgDimensions.width >= imgDimensions.height : true;

  const [imageAspectRatio, setImageAspectRatio] = useState(1);
  const SQUARE_SIZE = Dimensions.get('window').width;

  const containerHeight = SCREEN.width;
    // Calculate image dimensions maintaining aspect ratio
    let imgWidth = SCREEN.width;
    let imgHeight = containerHeight;
    const aspectRatio = imgDimensions ? imgDimensions.width / imgDimensions.height : 1;
    if (imgDimensions) {
        const aspectRatio = imgDimensions.width / imgDimensions.height;
        imgHeight = imgWidth / aspectRatio;
        if (imgHeight > containerHeight) {
            imgHeight = containerHeight;
            imgWidth = imgHeight * aspectRatio;
        }
    }

  useFocusEffect(
    useCallback(() => {
      const userInfo = databaseController.getUserInfo();
      console.log('ckck userinfo ',userInfo)
      if (userInfo?.profilePhotoPath) {
        setProfilePhotoPath(userInfo.profilePhotoPath);
      }
    }, [])
  );

  useEffect(() => {
    if (profilePhotoPath) {
      console.log('ckck profile photo path here is ',profilePhotoPath)
      Image.getSize(profilePhotoPath, (width, height) => {
        setImgDimensions({width,height})
        setImageAspectRatio(width / height);
      });
    }else {
      console.log('ckck no profile photo ')
      // Image.getSize(profile_photo_default,(width,height)=>{
      //    setImgDimensions({width,height})
      //    setImageAspectRatio(width / height);
      // })
    }
  }, [profilePhotoPath]);

  

  return (
    <View style={{
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: '#1c2238',
    }}>
      {/* Header */}
      <View style={{
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(68, 75, 95)',
        alignItems: 'center',
        backgroundColor: 'rgba(36, 42, 65)',
        paddingTop: normalizeHeight(40),
        paddingBottom: normalizeHeight(12)
      }}>
        <TouchableOpacity 
          style={{
            position: 'absolute',
            top: normalizeHeight(46),
            left: normalizeWidth(16),
          }}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image 
            style={{
              width: normalizeWidth(9),
              height: normalizeWidth(9) * (86.0 / 51.0),
              aspectRatio: 51.0 / 86.0,
              resizeMode: 'stretch'
            }}
            source={white_left_arrow}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 22,
            letterSpacing: 1,
            fontWeight: '700',
            color: "#fefefe"
          }}
        >Profile Photo</Text>
      </View>

      {/* Image display area */}
      <View
        style={{
          width: '100%',
          height: containerHeight,
          marginTop: normalizeHeight(110),
          backgroundColor: 'black',
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {imgDimensions && (
          <Image
            source={
              profilePhotoPath ? { uri: profilePhotoPath }
            : 
            profile_photo_default
          }
            style={{
              width: imgWidth,
              height: imgHeight,
            }}
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  );
}
