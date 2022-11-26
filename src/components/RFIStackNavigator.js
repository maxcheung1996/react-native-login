import {createNavigator} from 'react-navigation';
import RFIPage from '../pages/RFIPage';

const Stack = createNavigator({});

const RFIStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RFI" component={RFIPage} />
    </Stack.Navigator>
  );
};

export default RFIStackNavigator;
