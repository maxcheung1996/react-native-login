import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Divider,
  IconButton,
  Menu,
  Provider,
  Text,
} from 'react-native-paper';
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

const Stack = createNativeStackNavigator();

const AAHKStackNavigator = ({navigation}) => {
  const {logout} = useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="AAHK"
        component={AAHKScreen}
        options={{
          header: () => (
            <CustomHeader
              itemTwo={<Text onPress={() => alert('2')}>AAHK</Text>}
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
                        title="Sign Out"
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
                        title="Setting"
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
                        title="Sign Out"
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
                        title="Setting"
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
                        title="Sign Out"
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
                        title="Setting"
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
                        title="Sign Out"
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
                        title="Setting"
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
                        title="Reload"
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
                        title="Sign Out"
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
                        title="Setting"
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
                        title="Sync"
                      />
                    </>
                  }
                />
              }
            />
          ),
        }}
      />
      <Stack.Screen name="CheckList" component={CheckListScreen} />
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
