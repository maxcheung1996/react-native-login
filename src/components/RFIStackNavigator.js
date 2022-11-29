import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RFIScreen from '../screens/RFIScreen';

const Stack = createNativeStackNavigator();

const RFIStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="RFI" component={RFIScreen} />
    </Stack.Navigator>
  );
};

export default RFIStackNavigator;
