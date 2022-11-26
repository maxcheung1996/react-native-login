import {createNavigator} from 'react-navigation';
import AAHKPage from '../pages/AAHKPage';

const Stack = createNavigator({});

const AAHKStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AAHK" component={AAHKPage} />
    </Stack.Navigator>
  );
};

export default AAHKStackNavigator;
