import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RFIPage from '../pages/RFIPage';

const Stack = createNativeStackNavigator();

const RFIStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="RFI" component={RFIPage} />
    </Stack.Navigator>
  );
};

export default RFIStackNavigator;
