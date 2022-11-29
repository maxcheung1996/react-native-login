import React, {useContext, useState} from 'react';
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
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {isLoading, login, loginVisible, loginMsg, setLoginVisible} =
    useContext(AuthContext);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [visible, setVisible] = useState(false);
  const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })

  const promptBiometrics = () => {
    rnBiometrics
      .simplePrompt({promptMessage: 'Confirm fingerprint'})
      .then(resultObject => {
        const {success} = resultObject;

        if (success) {
          console.log('successful biometrics provided');
        } else {
          console.log('user cancelled biometric prompt');
        }
      })
      .catch(() => {
        console.log('biometrics failed');
      });
  };

  const biometricsLogin = () => {
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const {available, biometryType} = resultObject;

      if (available && biometryType === BiometryTypes.TouchID) {
        console.log('TouchID is supported');
        promptBiometrics();
      } else if (available && biometryType === BiometryTypes.FaceID) {
        console.log('FaceID is supported');
        promptBiometrics();
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        console.log('Biometrics is supported');
        promptBiometrics();
      } else {
        console.log('Biometrics not supported');
        promptBiometrics();
      }
    });
  };

  

  const validLogin = (email, password) => {
    if (
      email === null ||
      password === null ||
      email === '' ||
      password === ''
    ) {
      setVisible(true);
      return;
    } else {
      login(email, password);
    }
  };

  const onDismissSnackBar = () => {
    setVisible(false);
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
          <View style={{alignItems: 'center'}}>
            <Button
              disabled={isLoading}
              style={{marginTop: 20}}
              icon="login"
              mode="elevated"
              onPress={() => {
                validLogin(email, password);
              }}>
              Login
            </Button>
            <Button style={{marginTop: 20}} onPress={biometricsLogin} mode="elevated">Bio Login</Button>
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
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={2500}>
          Email or Password must not be empty.
        </Snackbar>
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
