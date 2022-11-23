import React from 'react';
import { View, Text, StatusBar, ImageBackground, StyleSheet } from 'react-native';
import Navigation from './src/components/Navigation';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#06bcee" />
      <Navigation />
    </>
  )
}

export default App;