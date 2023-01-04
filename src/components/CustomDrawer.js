import React from 'react';
import {useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {AuthContext} from '../context/AuthContext';
import {Drawer, Switch, TouchableRipple} from 'react-native-paper';
import {GlobalContext} from '../context/GlobalContext';

const CustomDrawer = props => {
  const {userInfo, splashLoading, logout} = useContext(AuthContext);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setDarkMode(!darkMode);
  const {lang, darkMode, setDarkMode} = useContext(GlobalContext);

  return (
    <View style={{flex: 1}}>
      <>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{}}>
          <ImageBackground
            source={require('../images/building.jpg')}
            style={{padding: 20, marginTop: -4}}>
            <Image
              source={require('../images/worker-icon.png')}
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                marginBottom: 10,
              }}
            />
            {userInfo.token ? (
              <>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    fontFamily: 'System',
                    marginBottom: 5,
                  }}>
                  {userInfo.fullname}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'System',
                      marginRight: 5,
                    }}>
                    {userInfo.usermail}
                  </Text>

                  <FontAwesome5 name="mail-bulk" size={14} color="#fff" />
                </View>
              </>
            ) : (
              ''
            )}
          </ImageBackground>
          <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
            {/* <DrawerItemList {...props} /> */}
            {userInfo.token ? (
              <>
                <DrawerItem
                  style={getDrawerStyle(props, 'CMMS')}
                  labelStyle={{fontFamily: 'System', fontSize: 15}}
                  icon={() => <Ionicons name="home-outline" size={22} />}
                  label={
                    lang == 'en'
                      ? 'CMMS'
                      : lang == 'zh'
                      ? '合約管理維護系統'
                      : 'CMMS'
                  }
                  onPress={() => {
                    props.navigation.navigate('CMMS');
                  }}
                />

                <DrawerItem
                  style={getDrawerStyle(props, 'Stress Test')}
                  labelStyle={{fontFamily: 'System', fontSize: 15}}
                  icon={() => (
                    <Ionicons name="arrow-down-circle-outline" size={22} />
                  )}
                  label={
                    lang == 'en'
                      ? 'Stress Test'
                      : lang == 'zh'
                      ? '壓力測試'
                      : 'Stress Test'
                  }
                  onPress={() => {
                    props.navigation.navigate('Stress Test');
                  }}
                />
              </>
            ) : (
              <>
                <DrawerItem
                  style={getDrawerStyle(props, 'Login')}
                  labelStyle={{fontFamily: 'System', fontSize: 15}}
                  icon={() => <Ionicons name="log-in-outline" size={22} />}
                  label={
                    lang == 'en' ? 'Login' : lang == 'zh' ? '登入' : 'Login'
                  }
                  onPress={() => {
                    props.navigation.navigate('Login');
                  }}
                />

                <DrawerItem
                  style={getDrawerStyle(props, 'Register')}
                  labelStyle={{fontFamily: 'System', fontSize: 15}}
                  icon={() => <Ionicons name="person-add-outline" size={22} />}
                  label={
                    lang == 'en'
                      ? 'Register'
                      : lang == 'zh'
                      ? '注冊'
                      : 'Register'
                  }
                  onPress={() => {
                    props.navigation.navigate('Register');
                  }}
                />

                <DrawerItem
                  style={getDrawerStyle(props, 'TakePhoto')}
                  labelStyle={{fontFamily: 'System', fontSize: 15}}
                  icon={() => <Ionicons name="log-in-outline" size={22} />}
                  label={
                    lang == 'en'
                      ? 'TakePhoto'
                      : lang == 'zh'
                      ? '照相'
                      : 'TakePhoto'
                  }
                  onPress={() => {
                    props.navigation.navigate('TakePhoto');
                  }}
                />
              </>
            )}
            <TouchableRipple>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                }}>
                <Text>
                  {lang == 'en'
                    ? 'Dark Mode'
                    : lang == 'zh'
                    ? '夜間模式'
                    : 'Dark Mode'}
                </Text>
                <Switch value={darkMode} onValueChange={onToggleSwitch} />
              </View>
            </TouchableRipple>
          </View>
        </DrawerContentScrollView>
        <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
          {userInfo.token ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Setting');
                }}
                style={[{paddingVertical: 8 }, getDrawerStyle(props, 'Setting')]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons name="ios-settings-outline" size={16} />
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: 'System',
                      marginLeft: 5,
                    }}>
                    {lang == 'en'
                      ? 'Setting'
                      : lang == 'zh'
                      ? '設定'
                      : 'Setting'}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
                style={[{paddingVertical: 8 }]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons name="exit-outline" size={16} />
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: 'System',
                      marginLeft: 5,
                    }}>
                    {lang == 'en'
                      ? 'SignOut'
                      : lang == 'zh'
                      ? '登出'
                      : 'SignOut'}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Setting');
              }}
              style={[{paddingVertical: 10 }, getDrawerStyle(props, 'Setting')]}>
              <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10}}>
                <Ionicons name="ios-settings-outline" size={16} />
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'System',
                    marginLeft: 5,
                  }}>
                  {lang == 'en' ? 'Setting' : lang == 'zh' ? '設定' : 'Setting'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </>
    </View>
  );
};

const getDrawerStyle = (props, name) => {
  if (
    props.state.index === props.state.routes.findIndex(e => e.name === name)
  ) {
    return {
      backgroundColor: '#dbedf1',
      borderRadius: 15,
      elevation: 7,
      shadowColor: '#52006A',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
    };
  } else {
    return {
    };
  }
};

export default CustomDrawer;
