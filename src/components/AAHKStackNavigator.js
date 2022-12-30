import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Divider, IconButton, Menu, Provider, Text} from 'react-native-paper';
import AAHKScreen from '../screens/AAHKScreen';
import BuildingScreen from '../screens/BuildingScreen';
import CheckListScreen from '../screens/CheckListScreen';
import DoorScreen from '../screens/DoorScreen';
import FloorScreen from '../screens/FloorScreen';
import WorksOrderScreen from '../screens/WorksOrderScreen';
import {useContext} from 'react';
import {View} from 'react-native';
import {CustomHeader} from './CustomHeader';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../context/AuthContext';
import {GlobalContext} from '../context/GlobalContext';
import Icon, {Icons} from './Icons';
import TakePhotoScreen from '../screens/TakePhotoScreen';
import {SafeAreaView} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const AAHKStackNavigator = ({navigation}) => {
  const {logout} = useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const {lang} = useContext(GlobalContext);

  return (
    
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="AAHK"
          component={AAHKScreen}
          options={{
            header: () => (
              <CustomHeader
                itemTwo={
                  <Text onPress={() => alert('2')}>
                    {lang == 'zh' ? '機場管理' : 'AAHK'}
                  </Text>
                }
                itemThree={
                  <CustomMenu
                    visible={visible}
                    openMenu={openMenu}
                    closeMenu={closeMenu}
                    items={
                      <>
                        <Menu.Item
                          titleStyle={{fontSize: 14}}
                          leadingIcon={() => (
                            <Ionicons
                              style={{marginTop: 4}}
                              name="exit-outline"
                              size={16}
                            />
                          )}
                          onPress={() => {
                            setVisible(false);
                            logout();
                          }}
                          title={
                            lang == 'en'
                              ? 'Sign Out'
                              : lang == 'zh'
                              ? '登出'
                              : 'Sign Out'
                          }
                        />
                        <Divider bold={true} />
                        <Menu.Item
                          titleStyle={{fontSize: 14}}
                          leadingIcon={() => (
                            <Ionicons
                              style={{marginTop: 4}}
                              name="ios-settings-outline"
                              size={16}
                            />
                          )}
                          onPress={() => {
                            setVisible(false);
                            navigation.navigate('Setting');
                          }}
                          title={
                            lang == 'en'
                              ? 'Setting'
                              : lang == 'zh'
                              ? '設定'
                              : 'Setting'
                          }
                        />
                      </>
                    }
                  />
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="Building"
          component={BuildingScreen}
          options={{
            header: () => (
              <CustomHeader
                itemOne={
                  <IconButton
                    icon={'arrow-left-thin'}
                    iconColor={'black'}
                    size={20}
                    onPress={() => navigation.goBack()}
                  />
                }
                itemTwo={
                  <IconButton
                    icon={'home-circle-outline'}
                    iconColor={'black'}
                    size={20}
                    onPress={() => navigation.navigate('AAHK')}
                  />
                }
                itemThree={
                  <CustomMenu
                    visible={visible}
                    openMenu={openMenu}
                    closeMenu={closeMenu}
                    items={
                      <>
                        <Menu.Item
                          titleStyle={{fontSize: 14}}
                          leadingIcon={() => (
                            <Ionicons
                              style={{marginTop: 4}}
                              name="exit-outline"
                              size={16}
                            />
                          )}
                          onPress={() => {
                            setVisible(false);
                            logout();
                          }}
                          title={
                            lang == 'en'
                              ? 'Sign Out'
                              : lang == 'zh'
                              ? '登出'
                              : 'Sign Out'
                          }
                        />
                        <Divider bold={true} />
                        <Menu.Item
                          titleStyle={{fontSize: 14}}
                          leadingIcon={() => (
                            <Ionicons
                              style={{marginTop: 4}}
                              name="ios-settings-outline"
                              size={16}
                            />
                          )}
                          onPress={() => {
                            setVisible(false);
                            navigation.navigate('Setting');
                          }}
                          title={
                            lang == 'en'
                              ? 'Setting'
                              : lang == 'zh'
                              ? '設定'
                              : 'Setting'
                          }
                        />
                      </>
                    }
                  />
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="WorksOrder"
          component={WorksOrderScreen}
          options={{
            header: () => (
              <CustomHeader
                itemOne={
                  <IconButton
                    icon={'arrow-left-thin'}
                    iconColor={'black'}
                    size={20}
                    onPress={() => navigation.goBack()}
                  />
                }
                itemTwo={
                  <IconButton
                    icon={'home-circle-outline'}
                    iconColor={'black'}
                    size={20}
                    onPress={() => navigation.navigate('AAHK')}
                  />
                }
                itemThree={
                  <CustomMenu
                    visible={visible}
                    openMenu={openMenu}
                    closeMenu={closeMenu}
                    items={
                      <>
                        <Menu.Item
                          titleStyle={{fontSize: 14}}
                          leadingIcon={() => (
                            <Ionicons
                              style={{marginTop: 4}}
                              name="exit-outline"
                              size={16}
                            />
                          )}
                          onPress={() => {
                            setVisible(false);
                            logout();
                          }}
                          title={
                            lang == 'en'
                              ? 'Sign Out'
                              : lang == 'zh'
                              ? '登出'
                              : 'Sign Out'
                          }
                        />
                        <Divider bold={true} />
                        <Menu.Item
                          titleStyle={{fontSize: 14}}
                          leadingIcon={() => (
                            <Ionicons
                              style={{marginTop: 4}}
                              name="ios-settings-outline"
                              size={16}
                            />
                          )}
                          onPress={() => {
                            setVisible(false);
                            navigation.navigate('Setting');
                          }}
                          title={
                            lang == 'en'
                              ? 'Setting'
                              : lang == 'zh'
                              ? '設定'
                              : 'Setting'
                          }
                        />
                      </>
                    }
                  />
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="Floor"
          component={FloorScreen}
          options={{
            header: () => (
              <CustomHeader
                itemOne={
                  <IconButton
                    icon={'arrow-left-thin'}
                    iconColor={'black'}
                    size={20}
                    onPress={() => navigation.goBack()}
                  />
                }
                itemTwo={
                  <IconButton
                    icon={'home-circle-outline'}
                    iconColor={'black'}
                    size={20}
                    onPress={() => navigation.navigate('AAHK')}
                  />
                }
                itemThree={
                  <CustomMenu
                    visible={visible}
                    openMenu={openMenu}
                    closeMenu={closeMenu}
                    items={
                      <>
                        <Menu.Item
                          titleStyle={{fontSize: 14}}
                          leadingIcon={() => (
                            <Ionicons
                              style={{marginTop: 4}}
                              name="exit-outline"
                              size={16}
                            />
                          )}
                          onPress={() => {
                            setVisible(false);
                            logout();
                          }}
                          title={
                            lang == 'en'
                              ? 'Sign Out'
                              : lang == 'zh'
                              ? '登出'
                              : 'Sign Out'
                          }
                        />
                        <Divider bold={true} />
                        <Menu.Item
                          titleStyle={{fontSize: 14}}
                          leadingIcon={() => (
                            <Ionicons
                              style={{marginTop: 4}}
                              name="ios-settings-outline"
                              size={16}
                            />
                          )}
                          onPress={() => {
                            setVisible(false);
                            navigation.navigate('Setting');
                          }}
                          title={
                            lang == 'en'
                              ? 'Setting'
                              : lang == 'zh'
                              ? '設定'
                              : 'Setting'
                          }
                        />
                        <Divider bold={true} />
                        <Menu.Item
                          titleStyle={{fontSize: 14}}
                          leadingIcon={() => (
                            <Ionicons
                              style={{marginTop: 4}}
                              name="cloud-download-outline"
                              size={16}
                            />
                          )}
                          onPress={() => {
                            setVisible(false);
                          }}
                          title={
                            lang == 'en'
                              ? 'Reload'
                              : lang == 'zh'
                              ? '重新加載'
                              : 'Reload'
                          }
                        />
                      </>
                    }
                  />
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="Door"
          component={DoorScreen}
          options={{
            header: () => (
              <CustomHeader
                itemOne={
                  <IconButton
                    icon={'arrow-left-thin'}
                    iconColor={'black'}
                    size={20}
                    onPress={() => navigation.goBack()}
                  />
                }
                itemTwo={
                  <IconButton
                    icon={'home-circle-outline'}
                    iconColor={'black'}
                    size={20}
                    onPress={() => navigation.navigate('AAHK')}
                  />
                }
                itemThree={
                  <CustomMenu
                    visible={visible}
                    openMenu={openMenu}
                    closeMenu={closeMenu}
                    items={
                      <>
                        <Menu.Item
                          titleStyle={{fontSize: 14}}
                          leadingIcon={() => (
                            <Ionicons
                              style={{marginTop: 4}}
                              name="exit-outline"
                              size={16}
                            />
                          )}
                          onPress={() => {
                            setVisible(false);
                            logout();
                          }}
                          title={
                            lang == 'en'
                              ? 'Sign Out'
                              : lang == 'zh'
                              ? '登出'
                              : 'Sign Out'
                          }
                        />
                        <Divider bold={true} />
                        <Menu.Item
                          titleStyle={{fontSize: 14}}
                          leadingIcon={() => (
                            <Ionicons
                              style={{marginTop: 4}}
                              name="ios-settings-outline"
                              size={16}
                            />
                          )}
                          onPress={() => {
                            setVisible(false);
                            navigation.navigate('Setting');
                          }}
                          title={
                            lang == 'en'
                              ? 'Setting'
                              : lang == 'zh'
                              ? '設定'
                              : 'Setting'
                          }
                        />
                        <Divider bold={true} />
                        <Menu.Item
                          titleStyle={{fontSize: 14}}
                          leadingIcon={() => (
                            <Ionicons
                              style={{marginTop: 4}}
                              name="ios-sync-circle-outline"
                              size={16}
                            />
                          )}
                          onPress={() => {
                            setVisible(false);
                          }}
                          title={
                            lang == 'en'
                              ? 'Sync'
                              : lang == 'zh'
                              ? '同步'
                              : 'Sync'
                          }
                        />
                      </>
                    }
                  />
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="CheckList"
          component={CheckListScreen}
          options={{
            header: () => (
              <CustomHeader
                itemOne={
                  <IconButton
                    icon={'arrow-left-thin'}
                    iconColor={'black'}
                    size={20}
                    onPress={() => navigation.goBack()}
                  />
                }
                itemTwo={
                  <IconButton
                    icon={'home-circle-outline'}
                    iconColor={'black'}
                    size={20}
                    onPress={() => navigation.navigate('AAHK')}
                  />
                }
                itemThree={
                  <CustomMenu
                    visible={visible}
                    openMenu={openMenu}
                    closeMenu={closeMenu}
                    items={
                      <>
                        <Menu.Item
                          titleStyle={{fontSize: 14}}
                          leadingIcon={() => (
                            <Ionicons
                              style={{marginTop: 4}}
                              name="exit-outline"
                              size={16}
                            />
                          )}
                          onPress={() => {
                            setVisible(false);
                            logout();
                          }}
                          title={
                            lang == 'en'
                              ? 'Sign Out'
                              : lang == 'zh'
                              ? '登出'
                              : 'Sign Out'
                          }
                        />
                        <Divider bold={true} />
                        <Menu.Item
                          titleStyle={{fontSize: 14}}
                          leadingIcon={() => (
                            <Ionicons
                              style={{marginTop: 4}}
                              name="ios-settings-outline"
                              size={16}
                            />
                          )}
                          onPress={() => {
                            setVisible(false);
                            navigation.navigate('Setting');
                          }}
                          title={
                            lang == 'en'
                              ? 'Setting'
                              : lang == 'zh'
                              ? '設定'
                              : 'Setting'
                          }
                        />
                        <Divider bold={true} />
                        <Menu.Item
                          titleStyle={{fontSize: 14}}
                          leadingIcon={() => (
                            // <Ionicons
                            //   style={{marginTop: 4}}
                            //   name="ios-sync-circle-outline"
                            //   size={16}
                            // />
                            <Icon
                              style={{marginTop: 4}}
                              type={Icons.SimpleLineIcons}
                              size={16}
                              name={'exclamation'}
                            />
                          )}
                          onPress={() => {
                            setVisible(false);
                          }}
                          title={
                            lang == 'en'
                              ? 'Follow'
                              : lang == 'zh'
                              ? '跟進'
                              : 'Follow'
                          }
                        />
                      </>
                    }
                  />
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="TakePhoto"
          component={TakePhotoScreen}
          options={{
            header: () => (
              <CustomHeader
                itemOne={
                  <IconButton
                    icon={'arrow-left-thin'}
                    iconColor={'black'}
                    size={20}
                    onPress={() => navigation.goBack()}
                  />
                }
                itemTwo={
                  <IconButton
                    icon={'home-circle-outline'}
                    iconColor={'black'}
                    size={20}
                    onPress={() => navigation.navigate('AAHK')}
                  />
                }
                itemThree={
                  <CustomMenu
                    visible={visible}
                    openMenu={openMenu}
                    closeMenu={closeMenu}
                    items={
                      <>
                        <Menu.Item
                          titleStyle={{fontSize: 14}}
                          leadingIcon={() => (
                            <Ionicons
                              style={{marginTop: 4}}
                              name="exit-outline"
                              size={16}
                            />
                          )}
                          onPress={() => {
                            setVisible(false);
                            logout();
                          }}
                          title={
                            lang == 'en'
                              ? 'Sign Out'
                              : lang == 'zh'
                              ? '登出'
                              : 'Sign Out'
                          }
                        />
                        <Divider bold={true} />
                        <Menu.Item
                          titleStyle={{fontSize: 14}}
                          leadingIcon={() => (
                            <Ionicons
                              style={{marginTop: 4}}
                              name="ios-settings-outline"
                              size={16}
                            />
                          )}
                          onPress={() => {
                            setVisible(false);
                            navigation.navigate('Setting');
                          }}
                          title={
                            lang == 'en'
                              ? 'Setting'
                              : lang == 'zh'
                              ? '設定'
                              : 'Setting'
                          }
                        />
                      </>
                    }
                  />
                }
              />
            ),
          }}
        />
      </Stack.Navigator>
  );
};

export const CustomMenu = props => {
  return (
    <Provider>
      <View style={{flex: 1}}>
        <Menu
          style={{top: 40, left: -90, width: '220%'}}
          visible={props.visible}
          onDismiss={props.closeMenu}
          anchor={<IconButton icon="dots-vertical" onPress={props.openMenu} />}>
          {props.items}
        </Menu>
      </View>
    </Provider>
  );
};

export default AAHKStackNavigator;
