import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {
  TextInput,
  Button,
  Snackbar,
  ActivityIndicator,
  MD2Colors,
} from 'react-native-paper';
import biometrics from '../biometrics';
import { FINGERPRINT_BYPASS } from '../config';
import { getLastLoginUserInfo } from '../helper';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {isLoading, login, loginVisible, loginMsg, setLoginVisible} =
    useContext(AuthContext);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [firstTimeLogin, setFirstTimeLogin] = useState(true);

  useEffect(() => {
    checkFirstTimeLogin()
  }, [])

  const checkFirstTimeLogin = async () => {
    let user = [];
    user = await getLastLoginUserInfo()
    setFirstTimeLogin(user.length > 0 ? true : false)
  }

  const BioLogin = async () => {
    let res = await biometrics();
    if(res){
      login(FINGERPRINT_BYPASS, "SOCAM_BIO");
    }
  }

  const onDismissLoginBar = () => {
    setLoginVisible(false);
  };

  return (
    <View style={style.container}>
      <ImageBackground
        source={require('../images/app_bg.jpg')}
        resizeMode="cover"
        style={style.image}>
        <View style={style.wrapper}>
          <ActivityIndicator
            animating={isLoading}
            color={MD2Colors.purpleA700}
          />
          <TextInput
            disabled={isLoading}
            mode="outlined"
            label="Email"
            value={email}
            placeholder="Enter email"
            onChangeText={val => setEmail(val)}
            right={<TextInput.Icon icon="email" />}
          />
          <TextInput
            disabled={isLoading}
            mode="outlined"
            label="Password"
            value={password}
            placeholder="Enter password"
            secureTextEntry={isPasswordSecure}
            onChangeText={val => setPassword(val)}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => {
                  isPasswordSecure
                    ? setIsPasswordSecure(false)
                    : setIsPasswordSecure(true);
                }}
              />
            }
          />
          <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
            <Button
              disabled={isLoading}
              icon="login"
              mode="elevated"
              onPress={() => {
                login(email, password);
              }}>
              Login
            </Button>
            {firstTimeLogin ? <Button style={{marginLeft: 15, width: 5}} icon="fingerprint" onPress={BioLogin} /> : <></>}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'flex-end',
            }}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={style.link}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Snackbar
          visible={loginVisible}
          onDismiss={onDismissLoginBar}
          duration={2500}>
          {loginMsg}
        </Snackbar>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    width: '80%',
  },
  link: {
    color: 'blue',
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
