import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AAHKPage from '../pages/AAHKPage';

const Stack = createNativeStackNavigator();

const AAHKStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AAHK" component={AAHKPage} />
    </Stack.Navigator>
  );
};

export default AAHKStackNavigator;
