import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginPage from '../pages/LoginPage';
import SettingPage from '../pages/SettingPage';
import BottomTabNavigator from './TabNavigator';
import StressTestPage from '../pages/StressTestPage';
import SplashPage from '../pages/SplashPage';
import {AuthContext} from '../context/AuthContext';
import RegisterPage from '../pages/RegisterPage';
import { useContext } from 'react';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const {userInfo, splashLoading} = useContext(AuthContext);

  return (
    <Drawer.Navigator>
      {splashLoading ? (
        <Drawer.Screen name="Splash Screen" component={SplashPage} />
      ) : userInfo.token ? (
        <>
          <Drawer.Screen name="CMMS" component={BottomTabNavigator} />
          <Drawer.Screen name="Stress Test" component={StressTestPage} />
          <Drawer.Screen name="Setting" component={SettingPage} />
        </>
      ) : (
        <>
          <Drawer.Screen name="Login" component={LoginPage} />
          <Drawer.Screen name="Register" component={RegisterPage} />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
