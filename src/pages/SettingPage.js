import React, {useContext} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {Button, ActivityIndicator, MD2Colors} from 'react-native-paper';

const SettingPage = () => {
  const {userInfo, isLoading, logout} = useContext(AuthContext);

  return (
    <View style={style.container}>
      <ImageBackground
        source={require('../images/app_bg.jpg')}
        resizeMode="cover"
        style={style.image}>
        <ActivityIndicator animating={isLoading} color={MD2Colors.purpleA700} />
        <Text style={style.welcome}>Welcome {userInfo.fullname}</Text>
        <Text>This is Setting Screen.</Text>
        <Button
          disabled={isLoading}
          style={{marginTop: 20, width: '50%'}}
          icon="logout"
          mode="elevated"
          onPress={() => {
            logout();
          }}>
          Logout
        </Button>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingPage;
