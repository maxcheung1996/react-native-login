import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SplashPage from '../pages/SplashPage';
import {AuthContext} from '../context/AuthContext';
import RegisterPage from '../pages/RegisterPage';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator({});

const Navigation = () => {
  const {userInfo, splashLoading} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <DrawerNavigator />
      {/* <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#9AC4F8',
          },
          headerTintColor: 'white',
          headerBackTitle: 'Back',
        }}>
        {splashLoading ? (
          <Stack.Screen
            name="Splash Screen"
            component={SplashPage}
            options={{headerShown: false}}
          />
        ) : userInfo.token ? (
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={RegisterPage}
              options={{headerShown: true}}
            />
          </>
        )}
      </Stack.Navigator> */}
    </NavigationContainer>
  );
};

export default Navigation;
