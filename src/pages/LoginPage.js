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

const LoginPage = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {isLoading, login} = useContext(AuthContext);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [visible, setVisible] = useState(false);

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

export default LoginPage;
