import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import DrawerNavigator from './src/components/DrawerNavigator';
import NetworkBar from './src/components/NetworkBar';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#06bcee" />
      <NavigationContainer>
        <NetworkBar />
        <DrawerNavigator />
      </NavigationContainer>
    </>
  );
};



export default App;
