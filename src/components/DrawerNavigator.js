import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginPage from '../pages/LoginPage';
import SettingPage from '../pages/SettingPage';
import BottomTabNavigator from './TabNavigator';
import HomePage from '../pages/HomePage';
import SplashPage from '../pages/SplashPage';
import {AuthContext} from '../context/AuthContext';
import RegisterPage from '../pages/RegisterPage';

const Drawer = createDrawerNavigator({});

const DrawerNavigator = () => {
  const {userInfo, splashLoading} = useContext(AuthContext);

  return (
    <Drawer.Navigator>
      {splashLoading ? (
        <Drawer.Screen name="Splash Screen" component={SplashPage} />
      ) : userInfo.token ? (
        <>
          <Drawer.Screen name="Home" component={BottomTabNavigator} />
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
