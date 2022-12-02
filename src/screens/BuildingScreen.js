import {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../context/GlobalContext';
import {AuthContext} from '../context/AuthContext';
import AxiosRequest from '../components/AxiosRequest';
import {ActivityList} from '../database/schema/ActivityList';
import {realmCreate, realmDelete} from '../database/service/crud';
import {getBuildingFrDB, getInspectorListFrDB} from '../helper';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomList from '../components/CustomList';
import { BASE_URL } from '../config';
import { InspectorList } from '../database/schema/InspectorList';
import { List } from 'react-native-paper';

const BuildingScreen = ({navigation}) => {
  const {aahkTray, isConnected, setAAHKBuilding, setInspectorList} = useContext(GlobalContext);
  const {userInfo} = useContext(AuthContext);
  const [building, setBuilding] = useState([]);

  const routeToScreen = (state, screen, setState) => {
    setState(state);
    navigation.push(screen);
  };

  useEffect(() => {
    getBuilding();
    getInspector();
  }, []);

  const getBuilding = async () => {
    if (isConnected) {
      let url = `${BASE_URL}AahkActivity?cat=${aahkTray}`;
      let res = await AxiosRequest(url, userInfo.token);
      if (res.length > 0) {
        await realmDelete(
          ActivityList,
          'ActivityDetail',
          `category == '${aahkTray}'`,
        );
        await realmCreate(ActivityList, 'ActivityDetail', res);
      }
    }
    let result = await getBuildingFrDB(aahkTray);
    setBuilding(result);
  };

  const getInspector = async () => {
    if (isConnected) {
      let url = `${BASE_URL}EformResultGlobal/getinspectorlist`;
      let res = await AxiosRequest(url, userInfo.token);
      if (res.length > 0) {
        await realmDelete(
          InspectorList,
          'InspectorList'
        );
        await realmCreate(InspectorList, 'InspectorList', res);
      }
    }
    let result = await getInspectorListFrDB();
    setInspectorList(result);
  };

  return (
    <View style={style.container}>
      <ScrollView contentContainerStyle={style.scrollView}>
        {building.map((v, i) => {
          return (
            <CustomList
              key={i}
              title={v.locationCode}
              description={''}
              icon={'office-building-marker-outline'}
              style={style.item}
              onPress={() => {
                routeToScreen(
                  v.locationCode,
                  'WorksOrder',
                  setAAHKBuilding
                );
              }}
              rightIcon={(prop) => (
                <List.Icon {...prop} icon={"arrow-right-thin"} />
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

export default BuildingScreen;
