import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityScreen, TrackWorkoutScreen, StatisticsScreen, CalendarScreen } from '../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type RootTabParamList = {
  Activity: undefined;
  TrackWorkout: undefined;
  Statistics: undefined;
  Calendar: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Activity"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = '';
            switch (route.name) {
              case 'Activity':
                iconName = 'barbell-outline';
                break;
              case 'TrackWorkout':
                iconName = 'walk-outline';
                break;
              case 'Statistics':
                iconName = 'stats-chart-outline';
                break;
              case 'Calendar':
                iconName = 'calendar-outline';
                break;
              default:
                iconName = 'ellipse-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="Activity" 
          component={ActivityScreen}
          options={{ title: 'Activity' }}
        />
        <Tab.Screen 
          name="TrackWorkout" 
          component={TrackWorkoutScreen}
          options={{ title: 'Track Workout' }}
        />
        <Tab.Screen 
          name="Statistics" 
          component={StatisticsScreen}
          options={{ title: 'Statistics' }}
        />
        <Tab.Screen 
          name="Calendar" 
          component={CalendarScreen}
          options={{ title: 'Calendar' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
