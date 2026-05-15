import React, { useRef, useState, useEffect, useCallback } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RNExitApp from 'react-native-exit-app';
import { ActivityScreen, TrackWorkoutScreen, StatisticsScreen, CalendarScreen, ExercisesScreen, AddExerciseScreen } from '../screens';
import { ProfileScreen } from '../screens/ProfileScreen';
import ProfilePhotoView from '../screens/ProfilePhotoView';
import WorkoutDetailsScreen from '../screens/WorkoutDetailsScreen';
import RoutinesScreen from '../screens/RoutinesScreen';
import RoutineDetailsScreen from '../screens/RoutineDetailsScreen';
import AddRoutineScreen from '../screens/AddRoutineScreen';
import EditRoutineScreen from '../screens/EditRoutineScreen';
import CropPhotoScreen from '../screens/CropPhotoScreen';
import { DayDetails } from '../screens/DayDetails';

import { View, Text, TouchableOpacity, Image, Modal, BackHandler } from 'react-native';
import { stylesTabBar } from './stylesTabBar';

import activity_icon_unselected from '../images/activity-tab-unselected.png';
import activity_icon_selected from '../images/activity-tab-selected.png';
import calendar_icon_selected from '../images/calendar-tab-selected.png';
import calendar_icon_unselected from '../images/calendar-tab-unselected.png';
import track_icon_selected from '../images/track-tab-selected.png';
import track_icon_unselected from '../images/track-tab-unselected.png';
import stats_icon_selected from '../images/stats-tab-selected.png';
import stats_icon_unselected from '../images/stats-tab-unselected.png';
import profile_icon_selected from '../images/profile-tab-selected.png';
import profile_icon_unselected from '../images/profile-tab-unselected.png';

import { normalize, normalizeHeight } from '../utils/normalize';


// Color palette for tab icons
const TAB_COLORS = {
  Activity: ['#F7B733', '#FC4A1A'], // orange gradient
  Calendar: ['#56CCF2', '#2F80ED'], // blue gradient
  TrackWorkout: ['#43E97B', '#38F9D7'], // green gradient
  Statistics: ['#B06AB3', '#4568DC'], // purple gradient
  Profile: ['#F7971E', '#FFD200'], // yellow gradient
  Inactive: ['#E0E0E0', '#BDBDBD'],
};

const TAB_ICONS_DATA = {
  Activity:  {
    unselectedImage: activity_icon_unselected,
    selectedImage: activity_icon_selected,
    aspectRatio: (73.0/71.0)
  },
  Calendar:  {
    unselectedImage: calendar_icon_unselected,
    selectedImage: calendar_icon_selected,
    aspectRatio: (75.0/67.0)
  },
  TrackWorkout:  {
    unselectedImage: track_icon_unselected,
    selectedImage: track_icon_selected,
    aspectRatio: (79.0/78.0)
  },
  Statistics:  {
    unselectedImage: stats_icon_unselected,
    selectedImage: stats_icon_selected,
    aspectRatio: (87.0/63.0)
  },
  Profile:  {
    unselectedImage: profile_icon_unselected,
    selectedImage: profile_icon_selected,
    aspectRatio: (79.0/74.0)
  },
}

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={stylesTabBar.barWrapper}>
      <View style={stylesTabBar.barContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          const isFocused = state.index === index;
          const onPress = () => {
            if (!isFocused) navigation.navigate(route.name);
          };
          // Pick color for each tab
          const color = isFocused ?"#c62230" : "#a5a7c1"

          const imgSource = isFocused ? TAB_ICONS_DATA[route.name].selectedImage:TAB_ICONS_DATA[route.name].unselectedImage 
      
          // Use a circle for all icons
          const icon = (
            <Image
              source={imgSource}
              style={[
                {
                  height:normalizeHeight(30),
                  aspectRatio: TAB_ICONS_DATA[route.name].aspectRatio,
                },
              ]}
            />
          );
        
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={stylesTabBar.tabItem}
            >
              {icon}
              <Text
                style={[
                  stylesTabBar.tabLabel,
                  {
                    color,
                    fontWeight: 'bold',
                  },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

 type RootTabParamList = {
  Activity: undefined;
  Calendar: undefined;
  TrackWorkout: undefined;
  Statistics: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const RootStack = createNativeStackNavigator();

const MainTabs = () => (
  <Tab.Navigator
    initialRouteName="Activity"
    tabBar={props => <CustomTabBar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen 
      name="Activity" 
      component={ActivityScreen}
      options={{ title: 'Activity' }}
    />
    <Tab.Screen 
      name="Calendar" 
      component={CalendarScreen}
      options={{ title: 'Calendar' }}
    />
    <Tab.Screen 
      name="TrackWorkout" 
      component={TrackWorkoutScreen}
      options={{ title: 'Track' }}
    />
    <Tab.Screen 
      name="Statistics" 
      component={StatisticsScreen}
      options={{ title: 'Stats' }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{ title: 'Profile' }}
    />
  </Tab.Navigator>
);

export const AppNavigator = () => {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const [showExitModal, setShowExitModal] = useState(false);

  const handleBackPress = useCallback(() => {
    console.log("ckck back button pressed");
    if (navigationRef.current && !navigationRef.current.canGoBack()) {
      setShowExitModal(true);
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => sub.remove();
  }, [handleBackPress]);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="MainTabs" component={MainTabs} />
          <RootStack.Screen name="Routines" component={RoutinesScreen} />
          <RootStack.Screen name="RoutineDetails" component={RoutineDetailsScreen} />
          <RootStack.Screen name="AddRoutine" component={AddRoutineScreen} />
          <RootStack.Screen name="EditRoutine" component={EditRoutineScreen} />
          <RootStack.Screen name="Exercises" component={ExercisesScreen} />
          <RootStack.Screen name="AddExercise" component={AddExerciseScreen} />
          <RootStack.Screen name="EditExercise" component={require('../screens/EditExerciseScreen').default} />
          <RootStack.Screen name="CropPhoto" component={CropPhotoScreen} />
          <RootStack.Screen name="ProfilePhotoView" component={ProfilePhotoView} />
          <RootStack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} />
          <RootStack.Screen name="DayDetails" component={DayDetails} />
        </RootStack.Navigator>
      </NavigationContainer>

      <Modal
        visible={showExitModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowExitModal(false)}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)'
        }}>
          <View style={{ width: '100%', paddingHorizontal: normalize(16) }}>
            <View style={{
              backgroundColor: '#262745',
              borderRadius: normalize(12),
              borderWidth: normalize(1),
              borderColor: '#37384b',
              paddingHorizontal: normalize(16),
              paddingVertical: normalizeHeight(16)
            }}>
              <Text style={{
                color: '#F2F4F8',
                fontSize: normalize(18),
                fontWeight: '500'
              }}>Exit App?</Text>
              <Text style={{
                color: '#acadba',
                fontSize: normalize(14),
                fontWeight: '400',
                marginTop: normalizeHeight(8)
              }}>Are you sure you want to exit?</Text>

              <View style={{
                marginTop: normalizeHeight(16),
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: '#313967',
                    borderRadius: normalize(8),
                    paddingVertical: normalize(10),
                    marginRight: normalize(4),
                    alignItems: 'center',
                    borderWidth: normalize(1),
                    borderColor: '#536196'
                  }}
                  onPress={() => setShowExitModal(false)}
                  activeOpacity={0.8}
                >
                  <Text style={{
                    color: '#e4e5ee',
                    fontWeight: '500',
                    fontSize: normalize(15),
                    letterSpacing: 0.5
                  }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: '#6c1e29',
                    borderRadius: normalize(8),
                    paddingVertical: normalize(10),
                    marginLeft: normalize(4),
                    alignItems: 'center',
                    borderWidth: normalize(1),
                    borderColor: '#a6353f'
                  }}
                  onPress={() => RNExitApp.exitApp()}
                  activeOpacity={0.8}
                >
                  <Text style={{
                    color: '#F2F4F8',
                    fontWeight: '500',
                    fontSize: normalize(15),
                    letterSpacing: 0.5
                  }}>Exit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
