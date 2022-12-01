import {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../context/GlobalContext';
import {getFloorFrDB} from '../helper';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomList from '../components/CustomList';

const FloorScreen = () => {
  const {aahkTray, aahkBuilding, aahkWorksOrder} = useContext(GlobalContext);
  const [floor, setFloor] = useState([]);

  useEffect(() => {
    getFloor();
  }, []);

  const getFloor = async () => {
    let result = await getFloorFrDB(aahkTray, aahkBuilding, aahkWorksOrder);
    setFloor(result);
  };

  return (
    <View style={style.container}>
      <ScrollView contentContainerStyle={style.scrollView}>
        {floor.map((v, i) => {
          return (
            <CustomList
              key={i}
              title={v.woNo}
              description={`${v.locationDesc} ${v.startDatetime} - ${v.endDatetime}`}
              icon={'stairs'}
              style={style.item}
              onPress={() => {}}
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

export default FloorScreen;
