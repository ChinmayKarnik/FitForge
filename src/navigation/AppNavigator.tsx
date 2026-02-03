import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityScreen, TrackWorkoutScreen, StatisticsScreen, CalendarScreen } from '../screens';
import { ProfileScreen } from '../screens/ProfileScreen';

import { View, Text, TouchableOpacity, Image } from 'react-native';
import { stylesTabBar } from './stylesTabBar';
import activity_icon_unselected from '../images/activity-tab-unselected.png'
import activity_icon_selected from '../images/activity-tab-selected.png'
import calendar_icon_selected from '../images/calendar-tab-selected.png'
import calendar_icon_unselected from '../images/calendar-tab-unselected.png'

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
    unselectedImage: activity_icon_unselected,
    selectedImage: activity_icon_selected,
    aspectRatio: (79.0/78.0)
  },
  Statistics:  {
    unselectedImage: activity_icon_unselected,
    selectedImage: activity_icon_selected,
    aspectRatio: (87.0/63.0)
  },
  Profile:  {
    unselectedImage: activity_icon_unselected,
    selectedImage: activity_icon_selected,
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

export type RootTabParamList = {
  Activity: undefined;
  Calendar: undefined;
  TrackWorkout: undefined;
  Statistics: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};
