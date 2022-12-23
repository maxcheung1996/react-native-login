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
import { GlobalContext } from '../context/GlobalContext';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [cpassword, setCPassword] = useState(null);
  const {isLoading, register} = useContext(AuthContext);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [visible, setVisible] = useState(false);
  const {lang} = useContext(GlobalContext);

  const validPassword = (email, password) => {
    if (password === cpassword) {
      register(email, password);
    } else {
      setVisible(true);
      return;
    }
  };

  const onDismissSnackBar = () => {
    setVisible(false);
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
            label={
              lang == 'en'
                ? "Email"
                : lang == 'zh'
                ? '電子郵件'
                : "Email"
            }
            value={email}
            placeholder={
              lang == 'en'
                ? "Email"
                : lang == 'zh'
                ? '電子郵件'
                : "Email"
            }
            onChangeText={val => setEmail(val)}
            right={<TextInput.Icon icon="email" />}
          />
          <TextInput
            disabled={isLoading}
            mode="outlined"
            label={
              lang == 'en'
                ? "Password"
                : lang == 'zh'
                ? '密碼'
                : "Password"
            }
            value={password}
            placeholder={
              lang == 'en'
                ? "Password"
                : lang == 'zh'
                ? '密碼'
                : "Password"
            }
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
          <TextInput
            disabled={isLoading}
            mode="outlined"
            label={
              lang == 'en'
                ? "Confirm Password"
                : lang == 'zh'
                ? '確認密碼'
                : "Confirm Password"
            }
            value={cpassword}
            placeholder={
              lang == 'en'
                ? "Confirm Password"
                : lang == 'zh'
                ? '確認密碼'
                : "Confirm Password"
            }
            secureTextEntry={isPasswordSecure}
            onChangeText={val => setCPassword(val)}
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
              mode="elevated"
              onPress={() => {
                validPassword(email, password);
              }}>
              {lang == 'en'
                  ? 'Register'
                  : lang == 'zh'
                  ? '注冊'
                  : 'Register'}
            </Button>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'flex-end',
            }}>
            <Text>{
              lang == 'en'
                ? "Already have an account? "
                : lang == 'zh'
                ? '已有帳戶？'
                : "Already have an account? "
            }</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={style.link}>{
              lang == 'en'
                ? "Login"
                : lang == 'zh'
                ? '登入'
                : "Login"
            }</Text>
                        </TouchableOpacity>
          </View>
        </View>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={2500}>
          Password and confirm password does not match.
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

export default RegisterScreen;
