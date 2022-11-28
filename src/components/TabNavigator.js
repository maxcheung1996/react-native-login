import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AAHKStackNavigator from './AAHKStackNavigator';
import RFIStackNavigator from './RFIStackNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="AAHKTab" component={AAHKStackNavigator} options={{
          tabBarLabel: 'AAHK',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="airplane" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="RFITab" component={RFIStackNavigator} options={{
          tabBarLabel: 'RFI',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="form-select" color={color} size={size} />
          ),
        }}/>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
