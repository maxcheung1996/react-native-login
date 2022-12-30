import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import {
  TextInput,
  Button,
  Snackbar,
  ActivityIndicator,
  MD2Colors,
} from 'react-native-paper';
import biometrics from '../biometrics';
import { FINGERPRINT_BYPASS } from '../config';
import { checkFirstTimeLogin } from '../helper';
import { GlobalContext } from '../context/GlobalContext';
import NetworkBar from '../components/NetworkBar';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { isLoading, login, loginVisible, loginMsg, setLoginVisible } =
    useContext(AuthContext);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [firstTimeLogin, setFirstTimeLogin] = useState(true);
  const { lang } = useContext(GlobalContext);

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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={style.container}>
        <NetworkBar />
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
              <Image
                style={style.logo}
                source={require('../images/logo.png')}
              />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={style.appName}>CMMS - Routine MainTenance</Text>
            </View>
            <TextInput
              disabled={isLoading}
              mode="outlined"
              label={
                lang == 'en' ? 'Email' : lang == 'zh' ? '電子郵件' : 'Email'
              }
              value={email}
              placeholder="Enter email"
              onChangeText={val => setEmail(val)}
              right={<TextInput.Icon icon="email" />}
            />
            <TextInput
              disabled={isLoading}
              mode="outlined"
              label={
                lang == 'en' ? 'Password' : lang == 'zh' ? '密碼' : 'Password'
              }
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
                {lang == 'en' ? 'Login' : lang == 'zh' ? '登入' : 'Login'}
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
              <Text>
                {lang == 'en'
                  ? "Don't have an account? "
                  : lang == 'zh'
                    ? '沒有帳戶？'
                    : "Don't have an account? "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={style.link}>
                  {lang == 'en'
                    ? 'Register'
                    : lang == 'zh'
                      ? '注冊'
                      : 'Register'}
                </Text>
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
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 80,
    width: 220,
  },
  wrapper: {
    width: '80%',
    marginBottom: 130
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
    marginBottom: 30,
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
  appName: {
    fontSize: 20, 
    color: 'red', 
    marginBottom: 30, 
    fontWeight: 'bold'
  }
});

export default LoginScreen;
