import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DrawerNavigator from './src/components/DrawerNavigator';
import NetworkBar from './src/components/NetworkBar';

const App = () => {
  return (
    <>
      {/* <StatusBar backgroundColor="#06bcee" /> */}
      <SafeAreaProvider>
        <NavigationContainer>
          
          <DrawerNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default App;
