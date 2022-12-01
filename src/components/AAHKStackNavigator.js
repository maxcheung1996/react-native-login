import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AAHKScreen from '../screens/AAHKScreen';
import BuildingScreen from '../screens/BuildingScreen';
import FloorScreen from '../screens/FloorScreen';
import WorksOrderScreen from '../screens/WorksOrderScreen';

const Stack = createNativeStackNavigator();

const AAHKStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="AAHK" component={AAHKScreen} />     
      <Stack.Screen name="Building" component={BuildingScreen} />
      <Stack.Screen name="WorksOrder" component={WorksOrderScreen} />
      <Stack.Screen name="Floor" component={FloorScreen} />
    </Stack.Navigator>
  );
};

export default AAHKStackNavigator;
