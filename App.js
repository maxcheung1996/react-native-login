import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {View, Text, StatusBar, ImageBackground, StyleSheet} from 'react-native';
import DrawerNavigator from './src/components/DrawerNavigator';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#06bcee" />
      {/* <Navigation /> */}
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;
