import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import SettingScreen from '../screens/SettingScreen';
import BottomTabNavigator from './TabNavigator';
import StressTestScreen from '../screens/StressTestScreen';
import SplashScreen from '../screens/SplashScreen';
import {AuthContext} from '../context/AuthContext';
import RegisterScreen from '../screens/RegisterScreen';
import {useContext} from 'react';
import CustomDrawer from './CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GlobalContext } from '../context/GlobalContext';
import TakePhotoScreen from '../screens/TakePhotoScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const {userInfo, splashLoading} = useContext(AuthContext);

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "yellow",
        drawerLabelStyle: {
          //marginLeft: -25,
          fontFamily: 'System',
          fontSize: 15,
        },
      }}>
      {splashLoading ? (
        <Drawer.Screen name="Splash Screen" component={SplashScreen} />
      ) : userInfo.token ? (
        <>
          <Drawer.Screen
            name="CMMS"
            component={BottomTabNavigator}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons name="home-outline" size={22} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Stress Test"
            component={StressTestScreen}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons name="speedometer-outline" size={22} color={color} />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons name="log-in-outline" size={22} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons name="person-add-outline" size={22} color={color} />
              ),
            }}
          />
        </>
      )}
      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="TakePhoto"
        component={TakePhotoScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="camera" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
