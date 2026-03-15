import React, { Activity, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import ProfilePageSection from '../components/ProfilePageSection';
import { View, StyleSheet, Text, Image, TouchableOpacity, Touchable } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import profile_photo_default from '../images/profile-photo-default.png';
import camera from '../images/camera-blue-white.png'
import activity_image from '../images/activity-tab-selected.png'
import kettlebell_image from '../images/red-black-kettlebell.png'
import blue_pencil from '../images/blue-pencil.png';
import calendar from '../images/calendar-tab-selected.png';
import stats_icon from '../images/stats-tab-unselected.png';
import routines_icon from '../images/notepad-with-ticks.png'

import { databaseController } from '../data';
import EditNameModal from '../components/EditNameModal';
import EditBioModal from '../components/EditBioModal';
import ProfileImageCircular from '../components/ProfileImageCircular';
import UpdateProfilePhotoModal from '../components/UpdateProfilePhotoModal';

const sections = [
  {
    name: 'Routines',
    route: 'Routines',
    icon: routines_icon,
    aspectRatio: (379.0/432.0)
  },
  {
    name: 'Exercises',
    route: 'Exercises',
    icon: kettlebell_image,
    aspectRatio: (457.0/582.0)
  },
  {
    name: 'Activity',
    route: 'Activity',
    icon: activity_image,
    aspectRatio: 1
  },
  {
    name: 'Stats',
    route: 'Statistics',
    icon: stats_icon,
    aspectRatio: (87.0/63.0)
  },
  {
    name: 'Calendar',
    route: 'Calendar',
    icon: calendar,
    aspectRatio: (78.0/69.0)
  },
];

export const ProfileScreen = () => {
  const userInfo = databaseController.getUserInfo() || { name: 'John Doe', bio: 'Fitness enthusiast. Working hard every day to improve myself and reach new goals.' };
  const name = userInfo.name;
  const bio = userInfo.bio;

  const [editNameVisible, setEditNameVisible] = useState(false);
  const [editNameValue, setEditNameValue] = useState(name);

  const [editBioVisible, setEditBioVisible] = useState(false);
  const [editBioValue, setEditBioValue] = useState(bio);

  const [profilePhotoModalVisible, setProfilePhotoModalVisible] = useState(false);
  const [profilePhotoPath, setProfilePhotoPath] = useState<string | null>(userInfo.profilePhotoPath || null);
  const [photoTimestamp, setPhotoTimestamp] = useState<number>(Date.now());
  const [imageCrop, setImageCrop] = useState(
    userInfo.profilePhotoCrop || { x: 0.25, y: 0.25, size: 0.5 }
  );

  // Refresh photo + crop whenever the screen comes back into focus (e.g. after CropPhotoScreen)
  useFocusEffect(
    useCallback(() => {
      const info = databaseController.getUserInfo();
      if (info?.profilePhotoPath) {
        setProfilePhotoPath(info.profilePhotoPath);
        setPhotoTimestamp(Date.now());
      }
      if (info?.profilePhotoCrop) {
        setImageCrop(info.profilePhotoCrop);
      }
    }, [])
  );

  const profilePhotoHeight = normalizeHeight(150);
  const profilePhotoAspectRatio = 100.0/100.0;
  const profilePhotoWidth = profilePhotoHeight * profilePhotoAspectRatio;

  const cameraIconHeight = normalizeHeight(40);
  const cameraIconAspectRatio = 24.0/24.0;
  const cameraIconWidth = cameraIconHeight * cameraIconAspectRatio;

  const bluePencilHeight = normalizeHeight(14);
  const bluePencilAspectRatio = 24.0/24.0;
  const bluePencilWidth = bluePencilHeight * bluePencilAspectRatio;

  const openEditNameModal = () => setEditNameVisible(true);
  const closeEditNameModal = () => setEditNameVisible(false);

  const onSave = (name)=>{
    databaseController.updateUserInfo({
      ...userInfo,
      name});
      setEditNameValue(name);
      closeEditNameModal();
  }

  const openEditBioModal = () => setEditBioVisible(true);
  const closeEditBioModal = () => setEditBioVisible(false);

  const onSaveBio = (bio) => {
    databaseController.updateUserInfo({
      ...userInfo,
      bio});
    setEditBioValue(bio);
    closeEditBioModal();
  }

  return (
    <View style={styles.container} >
     <View style={{width:'100%',borderWidth:1,
            borderColor: 'rgba(68, 75, 95)',
              alignItems:'center',
              backgroundColor: 'rgba(36, 42, 65)',
              paddingTop:normalizeHeight(40),
              paddingBottom:normalizeHeight(12)
            }}>
              <Text
              style={{fontSize:22,
                letterSpacing: 1,
                fontWeight: '700',
                color:"#fefefe"
              }}
              >Profile</Text>
            </View>
     <TouchableOpacity key={"profile-pic-section"}
     style={{alignItems:'center',
      marginTop:normalizeHeight(20),
     }}
     >
        <ProfileImageCircular
          key={profilePhotoPath || 'default'}
          imageSource={profilePhotoPath ? { uri: `${profilePhotoPath}?t=${photoTimestamp}` } : profile_photo_default}
          width={profilePhotoWidth}
          aspectRatio={profilePhotoAspectRatio}
          crop={imageCrop}
        />
      <TouchableOpacity style={{
        position: 'absolute',
        bottom: normalizeHeight(10),
        right: normalizeHeight(105),
      }}
      onPress={() => setProfilePhotoModalVisible(true)}
      >
        <Image
          style={{
            width: cameraIconWidth, height: cameraIconHeight,
          }}
          source={camera}
        />
      </TouchableOpacity>
     </TouchableOpacity>
     <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: normalizeHeight(5),
      }}
      onPress={openEditNameModal}
    >
      <Text
        style={{
          fontSize: normalize(22),
          fontWeight: '600',
          color: '#f9fafb',
          letterSpacing: 0.2,
          textAlign: 'center',
        }}
      >{name}</Text>
      <Image
        style={{
          width: bluePencilWidth,
          height: bluePencilHeight,
          marginTop: normalize(6),
          marginLeft: normalize(6),
          tintColor: '#6e94cd',
        }}
        source={blue_pencil}
      />
    </TouchableOpacity>
      
    <TouchableOpacity
      key={"bio-section"}
      onPress={openEditBioModal}
      style={{
        padding: normalize(12),
        borderWidth: normalize(1),
        borderColor: '#323b62',
        borderRadius: normalize(10),
        marginTop:normalizeHeight(15),
        backgroundColor: '#2a3259',
        marginHorizontal:normalizeWidth(12)
      }}
    >
      <Text
        style={
          {
            fontSize: normalize(14),
            fontWeight: '400',
            color: '#abb1cf',
            lineHeight: normalizeHeight(20),
            paddingRight: normalizeWidth(30),
          }
        }
      >
        {editBioValue}
      </Text>
      <Image 
        style={{width:bluePencilWidth,height:bluePencilHeight,
          marginTop:normalize(6),
          marginLeft:normalize(6),
          position:'absolute',
          right:normalizeWidth(12),
          bottom:normalizeHeight(10),
          tintColor: '#6e94cd'
        }}
        source={blue_pencil}
      />
    </TouchableOpacity>
    
    <View style={{marginTop:normalizeHeight(20)}}>
      {sections.map((section, idx) => (
        <ProfilePageSection key={section.route} section = {section}/>
      ))}
    </View>
    <EditNameModal
      visible={editNameVisible}
      value={editNameValue}
      onChangeText={setEditNameValue}
      onCancel={closeEditNameModal}
      onSave={onSave}
    />
    <EditBioModal
      visible={editBioVisible}
      value={editBioValue}
      onChangeText={setEditBioValue}
      onCancel={closeEditBioModal}
      onSave={onSaveBio}
    />
      <UpdateProfilePhotoModal
        visible={profilePhotoModalVisible}
        onClose={() => setProfilePhotoModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#1c2238',
  },
});