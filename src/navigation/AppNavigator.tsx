import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, TrackWorkoutScreen } from '../screens';

export type RootStackParamList = {
  Home: undefined;
  TrackWorkout: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'FitForge' }}
        />
        <Stack.Screen 
          name="TrackWorkout" 
          component={TrackWorkoutScreen}
          options={{ title: 'Track Workout' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
