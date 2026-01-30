import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityScreen, TrackWorkoutScreen, StatisticsScreen, CalendarScreen } from '../screens';
import { ProfileScreen } from '../screens/ProfileScreen';

import { View, Text, TouchableOpacity, Image } from 'react-native';
import activityTabSelected from '../images/activity_tab_selected.png';
import activityTabUnselected from '../images/activity_tab_unselected.png';
import { stylesTabBar } from './stylesTabBar';

// Custom Tab Bar implementation and color constants (move above AppNavigator)
const GOLD = '#D4AF37';
const GOLD_DARK = '#BFA76A';
const INACTIVE = '#A89B7C';
const BAR_BG = '#F7F5F2';

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
          let icon = null;
          if (route.name === 'Activity') {
            icon = (
              <Image
                source={isFocused ? activityTabSelected : activityTabUnselected}
                style={{ width: 36, height: 36, marginBottom: 2, backgroundColor: 'transparent' }}
                resizeMode="contain"
              />
            );
          } else {
            icon = <View style={[stylesTabBar.iconCircle, { backgroundColor: isFocused ? GOLD : INACTIVE }]} />;
          }
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
              <Text style={[stylesTabBar.tabLabel, { color: isFocused ? GOLD_DARK : INACTIVE, fontWeight: isFocused ? 'bold' : 'normal' }]}>{label}</Text>
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
