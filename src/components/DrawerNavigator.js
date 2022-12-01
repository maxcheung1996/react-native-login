import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import SettingScreen from '../screens/SettingScreen';
import BottomTabNavigator from './TabNavigator';
import StressTestScreen from '../screens/StressTestScreen';
import SplashScreen from '../screens/SplashScreen';
import {AuthContext} from '../context/AuthContext';
import RegisterScreen from '../screens/RegisterScreen';
import { useContext } from 'react';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const {userInfo, splashLoading} = useContext(AuthContext);

  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      {splashLoading ? (
        <Drawer.Screen name="Splash Screen" component={SplashScreen} />
      ) : userInfo.token ? (
        <>
          <Drawer.Screen name="CMMS" component={BottomTabNavigator} />
          <Drawer.Screen name="Stress Test" component={StressTestScreen} />
          <Drawer.Screen name="Setting" component={SettingScreen} />
        </>
      ) : (
        <>
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
