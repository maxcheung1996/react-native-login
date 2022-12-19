import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
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
import {FINGERPRINT_BYPASS} from '../config';
import {checkFirstTimeLogin} from '../helper';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {isLoading, login, loginVisible, loginMsg, setLoginVisible} =
    useContext(AuthContext);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [firstTimeLogin, setFirstTimeLogin] = useState(true);

  useEffect(() => {
    checkFirstTimeLogin(setFirstTimeLogin);
  }, []);

  const BioLogin = async () => {
    let res = await biometrics();
    if (res) {
      login(FINGERPRINT_BYPASS, 'SOCAM_BIO');
    }
  };

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
          <View style={style.logoDiv}>
            <Image style={style.logo} source={require('../images/logo.png')} />
          </View>
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
          <View style={style.loginDiv}>
            <Button
              disabled={isLoading}
              icon="login"
              mode="elevated"
              onPress={() => {
                login(email, password);
              }}>
              Login
            </Button>
            {firstTimeLogin ? (
              <Button
                style={style.fingerprint}
                icon="fingerprint"
                onPress={BioLogin}
              />
            ) : (
              <></>
            )}
          </View>
          <View style={style.registerDiv}>
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
  logo: {
    height: 120, width: 310
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
  logoDiv: {
    marginBottom: 60,
    alignItems: 'center',
  },
  loginDiv: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  fingerprint: {
    marginLeft: 15,
    width: 5,
  },
  registerDiv: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'flex-end',
  },
});

export default LoginScreen;
