import {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../context/GlobalContext';
import {convertDateString, getWorksOrderFrDB} from '../helper';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomList from '../components/CustomList';
import {List} from 'react-native-paper';

const WorksOrderScreen = ({navigation}) => {
  const {aahkTray, aahkBuilding, setAAHKWorksOrder, setActivityGuid} =
    useContext(GlobalContext);
  const [worksOrder, setWorksOrder] = useState([]);

  useEffect(() => {
    getWorksOrderFrDB(aahkTray, aahkBuilding, setWorksOrder);
  }, []);

  const routeToScreen = (
    state,
    screen,
    setState,
    setActivityGuid,
    activityGuid,
  ) => {
    setState(state);
    setActivityGuid(activityGuid);
    navigation.push(screen);
  };

  return (
    <View style={style.container}>
      <ScrollView contentContainerStyle={style.scrollView}>
        {worksOrder.map((v, i) => {
          return (
            <CustomList
              key={i}
              title={v.woNo}
              description={convertDateString(v.startDatetime) + " - " + convertDateString(v.endDatetime)}
              icon={'order-bool-descending-variant'}
              style={style.item}
              onPress={() => {
                routeToScreen(
                  v.woNo,
                  'Floor',
                  setAAHKWorksOrder,
                  setActivityGuid,
                  v.activityGuid,
                );
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

export default WorksOrderScreen;
