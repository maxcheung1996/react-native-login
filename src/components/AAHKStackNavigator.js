import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AAHKScreen from '../screens/AAHKScreen';
import BuildingScreen from '../screens/BuildingScreen';

const Stack = createNativeStackNavigator();

const AAHKStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="AAHK" component={AAHKScreen} />     
      <Stack.Screen name="Building" component={BuildingScreen} />
      
    </Stack.Navigator>
  );
};

export default AAHKStackNavigator;
