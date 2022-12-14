import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IconButton, Text } from 'react-native-paper';
import { GlobalContext } from '../context/GlobalContext';
import AAHKScreen from '../screens/AAHKScreen';
import BuildingScreen from '../screens/BuildingScreen';
import CheckListScreen from '../screens/CheckListScreen';
import DoorScreen from '../screens/DoorScreen';
import FloorScreen from '../screens/FloorScreen';
import WorksOrderScreen from '../screens/WorksOrderScreen';
import {useContext} from 'react';

const Stack = createNativeStackNavigator();

const AAHKStackNavigator = ({ navigation }) => {
  const {aahkBuilding, aahkTrayName, aahkWorksOrder, floor, contractNo} = useContext(GlobalContext);
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="AAHK" component={AAHKScreen} options={{
          headerStyle: {backgroundColor: "#06bcee"},
          headerTitle: (props) => <Text variant="titleLarge" style={{color: "white"}} {...props}>{contractNo}</Text>,
          }}/>
      <Stack.Screen name="Building" component={BuildingScreen} options={{
          headerTintColor: 'white',
          headerStyle: {backgroundColor: "#06bcee"},
          headerTitle: (props) => <Text variant="titleLarge" style={{color: "white"}} {...props}>{aahkTrayName}</Text>,
        }}/>
      <Stack.Screen name="WorksOrder" component={WorksOrderScreen} options={{
          headerTintColor: 'white',
          headerStyle: {backgroundColor: "#06bcee"},
          headerTitle: (props) => <Text variant="titleLarge" style={{color: "white"}} {...props}>{aahkBuilding}</Text>,
          headerRight: () => (
            <IconButton
              icon="home-circle-outline"
              iconColor={"white"}
              size={20}
              onPress={() => navigation.navigate('AAHK')}
            />
          ),
        }}/>
      <Stack.Screen name="Floor" component={FloorScreen} options={{
          headerTintColor: 'white',
          headerStyle: {backgroundColor: "#06bcee"},
          headerTitle: (props) => <Text variant="titleLarge" style={{color: "white"}} {...props}>{aahkWorksOrder}</Text>,
          headerRight: () => (
            <IconButton
              icon="home-circle-outline"
              iconColor={"white"}
              size={20}
              onPress={() => navigation.navigate('AAHK')}
            />
          ),
        }}/>
      <Stack.Screen name="Door" component={DoorScreen}  options={{
          headerTintColor: 'white',
          headerStyle: {backgroundColor: "#06bcee"},
          headerTitle: (props) => <Text variant="titleLarge" style={{color: "white"}} {...props}>{aahkWorksOrder + " - " + floor}</Text>,
          headerRight: () => (
            <IconButton
              icon="home-circle-outline"
              iconColor={"white"}
              size={20}
              onPress={() => navigation.navigate('AAHK')}
            />
          ),
        }}/>
      <Stack.Screen name="CheckList" component={CheckListScreen} />
    </Stack.Navigator>
  );
};

export default AAHKStackNavigator;
