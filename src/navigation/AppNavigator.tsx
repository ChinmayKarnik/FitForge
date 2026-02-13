import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityScreen, TrackWorkoutScreen, StatisticsScreen, CalendarScreen, ExercisesScreen, AddExerciseScreen } from '../screens';
import { ProfileScreen } from '../screens/ProfileScreen';
import RoutinesScreen from '../screens/RoutinesScreen';
import RoutineDetailsScreen from '../screens/RoutineDetailsScreen';
import AddRoutineScreen from '../screens/AddRoutineScreen';
import EditRoutineScreen from '../screens/EditRoutineScreen';

import { View, Text, TouchableOpacity, Image } from 'react-native';
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
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="MainTabs" component={MainTabs} />
        <RootStack.Screen name="Routines" component={RoutinesScreen} />
        <RootStack.Screen name="RoutineDetails" component={RoutineDetailsScreen} />
        <RootStack.Screen name="AddRoutine" component={AddRoutineScreen} />
        <RootStack.Screen name="EditRoutine" component={EditRoutineScreen} />
        <RootStack.Screen name="Exercises" component={ExercisesScreen} />
        <RootStack.Screen name="AddExercise" component={AddExerciseScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
