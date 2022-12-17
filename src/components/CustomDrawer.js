import React from 'react';
import {useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
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

const CustomDrawer = props => {
  const {userInfo, splashLoading, logout} = useContext(AuthContext);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={{flex: 1}}>
      <>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{backgroundColor: '#8200d6'}}>
          <ImageBackground
            source={require('../images/menu-bg.jpeg')}
            style={{padding: 20}}>
            <Image
              source={require('../images/user-profile.jpg')}
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
                    fontFamily: 'Roboto-Medium',
                    marginBottom: 5,
                  }}>
                  {userInfo.fullname}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Roboto-Regular',
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
                  activeBackgroundColor={'#aa18ea'}
                  activeTintColor={'#fff'}
                  inactiveTintColor={'#333'}
                  labelStyle={{fontFamily: 'Roboto-Medium', fontSize: 15}}
                  icon={() => <Ionicons name="home-outline" size={22} />}
                  label={'CMMS'}
                  onPress={() => {
                    props.navigation.navigate('CMMS');
                  }}
                />

                <DrawerItem
                  activeBackgroundColor={'#aa18ea'}
                  activeTintColor={'#fff'}
                  inactiveTintColor={'#333'}
                  labelStyle={{fontFamily: 'Roboto-Medium', fontSize: 15}}
                  icon={() => (
                    <Ionicons name="arrow-down-circle-outline" size={22} />
                  )}
                  label={'Stress Tests'}
                  onPress={() => {
                    props.navigation.navigate('Stress Test');
                  }}
                />
              </>
            ) : (
              <>
                <DrawerItem
                  activeBackgroundColor={'#aa18ea'}
                  activeTintColor={'#fff'}
                  inactiveTintColor={'#333'}
                  labelStyle={{fontFamily: 'Roboto-Medium', fontSize: 15}}
                  icon={() => <Ionicons name="log-in-outline" size={22} />}
                  label={'Login'}
                  onPress={() => {
                    props.navigation.navigate('Login');
                  }}
                />

                <DrawerItem
                  activeBackgroundColor={'#aa18ea'}
                  activeTintColor={'#fff'}
                  inactiveTintColor={'#333'}
                  labelStyle={{fontFamily: 'Roboto-Medium', fontSize: 15}}
                  icon={() => <Ionicons name="person-add-outline" size={22} />}
                  label={'Register'}
                  onPress={() => {
                    props.navigation.navigate('Register');
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
                <Text>Dark Mode</Text>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
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
                style={{paddingVertical: 15}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons name="ios-settings-outline" size={22} />
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: 'Roboto-Medium',
                      marginLeft: 5,
                    }}>
                    Setting
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
                style={{paddingVertical: 15}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons name="exit-outline" size={22} />
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: 'Roboto-Medium',
                      marginLeft: 5,
                    }}>
                    Sign Out
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Setting');
              }}
              style={{paddingVertical: 15}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="ios-settings-outline" size={22} />
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Roboto-Medium',
                    marginLeft: 5,
                  }}>
                  Setting
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </>
    </View>
  );
};

export default CustomDrawer;
