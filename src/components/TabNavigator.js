import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AAHKStackNavigator from './AAHKStackNavigator';
import RFIStackNavigator from './RFIStackNavigator';

const Tab = createBottomTabNavigator({});

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AAHK" component={AAHKStackNavigator} />
      <Tab.Screen name="RFI" component={RFIStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
