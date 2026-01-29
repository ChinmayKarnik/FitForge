import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { initializeDatabase } from './src/data/utils/DatabaseInitUtils';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(()=>{
    initializeDatabase();
  },[])

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
