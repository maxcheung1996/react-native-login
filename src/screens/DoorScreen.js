import {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../context/GlobalContext';
import {getColorByStatus, getDoorFrDB} from '../helper';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomList from '../components/CustomList';
import {List} from 'react-native-paper';

const DoorScreen = ({navigation}) => {
  const {activityGuid, floor, setAAHKDoor} = useContext(GlobalContext);
  const [door, setDoor] = useState([]);

  useEffect(() => {
    getDoorFrDB(activityGuid, floor, setDoor);
  }, []);

  const routeToScreen = (state, screen, setState) => {
    setState(state);
    navigation.push(screen);
  };

  return (
    <View style={style.container}>
      <ScrollView contentContainerStyle={style.scrollView}>
        {door.map((v, i) => {
          return (
            <CustomList
              leftIconColor={getColorByStatus(v.status)}
              key={i}
              title={v.doorNo}
              description={v.testResult}
              icon={'checkbox-blank-circle'}
              style={style.item}
              onPress={() => {
                routeToScreen(v.doorNo, 'CheckList', setAAHKDoor);
              }}
              rightIcon={prop => (
                <List.Icon {...prop} icon={'arrow-right-thin'} />
              )}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollView: {
    alignItems: 'center',
  },
  item: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 10,
    elevation: 8,
    shadowColor: '#52006A',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default DoorScreen;
