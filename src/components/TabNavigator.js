import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AAHKStackNavigator from './AAHKStackNavigator';
import RFIStackNavigator from './RFIStackNavigator';
import * as Animatable from 'react-native-animatable';
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Icon, { Icons } from '../components/Icons';
import Colors from './Colors';
import { GlobalContext } from '../context/GlobalContext';
import {useContext} from 'react';


const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({0: {scale: .8, rotate: '0deg'}, 1: {scale: 1, rotate: '360deg'}});
      textRef.current.transitionTo({ scale: 1.2 });
    } else {
      viewRef.current.animate({0: {scale: 1, rotate: '360deg'}, 1: {scale: .8, rotate: '0deg'}});
      textRef.current.transitionTo({ scale: 1.2 });
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <Icon type={item.type} name={focused ? item.activeIcon : item.inActiveIcon} color={focused ? Colors.purple : Colors.primaryLite} />
        <Animatable.Text
          ref={textRef}
          style={{color: focused ? Colors.purple : Colors.primaryLite, fontSize: 10, textAlign: 'center'}}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}

const BottomTabNavigator = () => {
  const {lang} = useContext(GlobalContext);

  const TabArr = [
    { route: 'AAHKTab', label: lang == 'zh' ? '機場管理' : 'AAHK', type: Icons.Ionicons, activeIcon: 'airplane', inActiveIcon: 'airplane-outline', component: AAHKStackNavigator },
    { route: 'RFITab', label: lang == 'zh' ? '工程檢查' : 'RFI', type: Icons.MaterialCommunityIcons, activeIcon: 'form-select', inActiveIcon: 'form-select', component: RFIStackNavigator },
    { route: 'App1', label: lang == 'zh' ? '流程管理' : 'BPM', type: Icons.MaterialCommunityIcons, activeIcon: 'clipboard-flow', inActiveIcon: 'clipboard-flow-outline', component: AAHKStackNavigator },
    { route: 'App2', label: lang == 'zh' ? '網站' : 'Portal', type: Icons.Ionicons, activeIcon: 'ios-search', inActiveIcon: 'ios-search-outline', component: RFIStackNavigator },
  ];
  
  return (
    <Tab.Navigator screenOptions={styles.screenOptions}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.route} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screenOptions:{
    headerShown: false, tabBarStyle: {
      height: 60,
      position: 'absolute',
      bottom: 16,
      right: 16,
      left: 16,
      borderRadius: 16
    }
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    
  }
})

export default BottomTabNavigator;
