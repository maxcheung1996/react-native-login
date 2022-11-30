import {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../context/GlobalContext';
import {Text} from 'react-native-paper';
import {AuthContext} from '../context/AuthContext';
import axiosRequest from '../components/axios';
import {ActivityList} from '../database/schema/ActivityList';
import {realmCreate, realmDelete} from '../database/service/crud';
import {getBuildingFrDB} from '../helper';

const BuildingScreen = () => {
  const {aahkTray, isConnected} = useContext(GlobalContext);
  const {userInfo} = useContext(AuthContext);
  const [building, setBuilding] = useState([]);

  useEffect(() => {
    if (isConnected) {
      getBuildingFrSer();
    }
  }, []);

  const getBuildingFrSer = async () => {
    let url = `https://dev.socam.com/aahkapi/api/AahkActivity?cat=${aahkTray}`;
    let res = await axiosRequest(url, userInfo.token);
    if (res.length > 0) {
      await realmDelete(ActivityList, 'ActivityList');
      await realmCreate(ActivityList, 'ActivityList', res);
      let result = await getBuildingFrDB(aahkTray);
      console.log(result);
    }
  };

  return (
    <>
      <Text>{aahkTray}</Text>
      {building.map((v, i) => {
        return (
          <>
            <Text>{v.woNo}</Text>
          </>
        );
      })}
    </>
  );
};

export default BuildingScreen;
