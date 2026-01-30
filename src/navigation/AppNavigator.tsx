import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityScreen, TrackWorkoutScreen, StatisticsScreen, CalendarScreen } from '../screens';
import { ProfileScreen } from '../screens/ProfileScreen';

import { View, Text, TouchableOpacity } from 'react-native';
import { stylesTabBar } from './stylesTabBar';


// Color palette for tab icons
const TAB_COLORS = {
  Activity: ['#F7B733', '#FC4A1A'], // orange gradient
  Calendar: ['#56CCF2', '#2F80ED'], // blue gradient
  TrackWorkout: ['#43E97B', '#38F9D7'], // green gradient
  Statistics: ['#B06AB3', '#4568DC'], // purple gradient
  Profile: ['#F7971E', '#FFD200'], // yellow gradient
  Inactive: ['#E0E0E0', '#BDBDBD'],
};

function CustomTabBar({ state, descriptors, navigation }) {
  return null;
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
          const [color1, color2] = isFocused
            ? TAB_COLORS[route.name] || TAB_COLORS.Inactive
            : TAB_COLORS.Inactive;
          // Use a circle for all icons
          const icon = (
            <View
              style={[
                stylesTabBar.iconCircle,
                {
                  backgroundColor: color1,
                  borderWidth: isFocused ? 2 : 0,
                  borderColor: isFocused ? color2 : 'transparent',
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
              activeOpacity={0.7}
            >
              {icon}
              <Text
                style={[
                  stylesTabBar.tabLabel,
                  {
                    color: isFocused ? color2 : color1,
                    fontWeight: isFocused ? 'bold' : 'normal',
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
