import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AAHKScreen from '../screens/AAHKScreen';

const Stack = createNativeStackNavigator();

const AAHKStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AAHK" component={AAHKScreen} />
    </Stack.Navigator>
  );
};

export default AAHKStackNavigator;
