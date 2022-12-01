import {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../context/GlobalContext';
import {getWorksOrderFrDB} from '../helper';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomList from '../components/CustomList';

const WorksOrderScreen = ({navigation}) => {
  const {aahkTray, aahkBuilding, setAAHKWorksOrder} = useContext(GlobalContext);
  const [worksOrder, setWorksOrder] = useState([]);

  useEffect(() => {
    getWorksOrder();
  }, []);

  const getWorksOrder = async () => {
    let result = await getWorksOrderFrDB(aahkTray, aahkBuilding);
    setWorksOrder(result);
  };

  const routeToScreen = (state, screen, setState) => {
    setState(state);
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
              description={''}
              icon={'order-bool-descending-variant'}
              style={style.item}
              onPress={() => {
                routeToScreen(v.woNo, 'Floor', setAAHKWorksOrder);
              }}
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
