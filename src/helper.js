import {Avatar} from 'react-native-paper';
import Realm from 'realm';
import {KEY} from './config';
import {EformResultSubDetails} from './database/schema/EformResultSubDetails';
import {AahkActivityDetail} from './database/schema/AahkActivityDetail';
import {EformResultGlobal} from './database/schema/EformResultGlobal';
import {EformResultDetail} from './database/schema/EformResultDetail';
import {EformPhotoDetail} from './database/schema/EformPhotoDetail';
import {ActivityList} from './database/schema/ActivityList';
import {InspectorList} from './database/schema/InspectorList';
import {userInfoTable} from './database/schema/User';
import {realmCreate, realmDelete, realmRead} from './database/service/crud';
import {BASE_URL} from './config';
import AxiosRequest from './components/AxiosRequest';

export const getLocalTimeStamp = () => {
  Date.prototype.toISOString = function () {
    let pad = n => (n < 10 ? '0' + n : n);
    let hours_offset = this.getTimezoneOffset() / 60;
    let offset_date = this.setHours(this.getHours() - hours_offset);
    let symbol = hours_offset >= 0 ? '-' : '+';
    let time_zone = symbol + pad(Math.abs(hours_offset)) + ':00';

    return (
      this.getUTCFullYear() +
      '-' +
      pad(this.getUTCMonth() + 1) +
      '-' +
      pad(this.getUTCDate()) +
      'T' +
      pad(this.getUTCHours()) +
      ':' +
      pad(this.getUTCMinutes()) +
      ':' +
      pad(this.getUTCSeconds()) +
      '.' +
      (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5)
    );
  };

  return new Date().toISOString();
};

export const getLastLoginUserInfo = async () => {
  let userInfo = [];
  try {
    userInfo = await realmRead(
      userInfoTable,
      'userInfo',
      '',
      'createdAt',
      true,
    );

    //console.log('userInfo: ', userInfo[0]);
    return userInfo;
  } catch (error) {
    return userInfo;
  }
};

export const getBuildingFrDB = async cat => {
  let buildingList = [];
  try {
    buildingList = await realmRead(
      ActivityList,
      'ActivityDetail',
      `category == '${cat}' DISTINCT(locationCode)`,
    );
    return buildingList;
  } catch (error) {
    console.log('getBuildingFrDB error: ', error);
    return buildingList;
  }
};

export const getWorksOrderFrDB = async (cat, aahkBuilding, setState) => {
  let worksOrderList = [];
  try {
    worksOrderList = await realmRead(
      ActivityList,
      'ActivityDetail',
      `category == '${cat}' && locationCode == '${aahkBuilding}' DISTINCT(woNo)`,
    );
    setState(worksOrderList);
    return worksOrderList;
  } catch (error) {
    console.log('getWorksOrderFrDB error: ', error);
    setState(worksOrderList);
    return worksOrderList;
  }
};

export const getFloorFrDB = async (
  cat,
  aahkBuilding,
  aahkWorksOrder,
  setState,
) => {
  let FloorList = [];
  try {
    FloorList = await realmRead(
      ActivityList,
      'ActivityDetail',
      `category == '${cat}' && locationCode == '${aahkBuilding}' && woNo == '${aahkWorksOrder}' DISTINCT(locationDesc)`,
    );
    setState(FloorList);
    return FloorList;
  } catch (error) {
    console.log('getFloorFrDB error: ', error);
    setState(FloorList);
    return FloorList;
  }
};

export const validateLogin = (email, password) => {
  return email === null || password === null || email === '' || password === ''
    ? false
    : true;
};

export const convertDateString = dateStr => {
  const date = new Date(dateStr);
  const day = ('0' + date.getDate().toString()).slice(-2);
  const year = date.getFullYear().toString();
  const month = ('0' + (date.getMonth() + 1).toString()).slice(-2);

  return day + '-' + month + '-' + year;
};

export const dlAllActivityDataStart = async (userInfo, activityGuid, floor) => {
  //Door
  await axiosToRealmDB(
    userInfo.token,
    activityGuid,
    floor,
    'AahkActivityDetail',
    AahkActivityDetail,
    'AahkActivityDetail',
    `activityGuid == '${activityGuid}' && locationDesc == '${floor}'`,
  );
  //Gobal
  let resp = [];

  resp = await axiosToRealmDB(
    userInfo.token,
    activityGuid,
    floor,
    'EformResultGlobal',
    EformResultGlobal,
    'EformResultGlobal',
    `activityGuid == '${activityGuid}' && location == '${floor}'`,
  );

  let eformResultGuid_filtered_str = '';
  let eformResultGuid = [];

  for (const respItem of resp) {
    eformResultGuid.push(respItem.eformResultGuid);
  }

  try {
    eformResultGuid_filtered_str = JSON.stringify(eformResultGuid);
    eformResultGuid_filtered_str = eformResultGuid_filtered_str.replace(
      '[',
      '{',
    );
    eformResultGuid_filtered_str = eformResultGuid_filtered_str.replace(
      ']',
      '}',
    );
    eformResultGuid_filtered_str = eformResultGuid_filtered_str.replaceAll(
      '"',
      "'",
    );
    //console.log(eformResultGuid_filtered_str);
  } catch (error) {
    console.log('eformResultGuid error: ', error);
  }

  //await getEformResultFrDB();

  //EformResultDetail
  await axiosToRealmDB(
    userInfo.token,
    activityGuid,
    floor,
    'EformResultDetail',
    EformResultDetail,
    'EformResultDetail',
    `eformResultGuid IN ${eformResultGuid_filtered_str}`,
  );
  //EformResultSubDetail
  await axiosToRealmDB(
    userInfo.token,
    activityGuid,
    floor,
    'EformResultSubDetail',
    EformResultSubDetails,
    'EformResultSubDetails',
    `eformResultGuid IN ${eformResultGuid_filtered_str}`,
  );
  //EformPhotoDetail
  await axiosToRealmDB(
    userInfo.token,
    activityGuid,
    floor,
    'EformPhotoDetail/getphotodtl',
    EformPhotoDetail,
    'EformPhotoDetail',
    `refGuid IN ${eformResultGuid_filtered_str}`,
  );
};

const axiosToRealmDB = async (
  token,
  activityGuid,
  floor,
  apiName,
  schema,
  name,
  delFilter = '',
) => {
  let result = [];

  const obj = await AxiosRequest(
    `${BASE_URL}${apiName}?iniid=${activityGuid}&floor=${floor}`,
    token,
  );
  await realmDelete(schema, name, delFilter);
  await realmCreate(schema, name, obj);

  result = [...obj];

  return result;
};

export const getDoorFrDB = async (
  activityGuid,
  floor,
  setState,
  setFilteredData,
) => {
  let doorList = [];
  try {
    doorList = await realmRead(
      AahkActivityDetail,
      'AahkActivityDetail',
      `activityGuid == '${activityGuid}' && locationDesc == '${floor}' DISTINCT(doorNo)`,
    );
    setFilteredData(doorList);
    setState(doorList);

    return doorList;
  } catch (error) {
    console.log('getDoorFrDB error: ', error);
    setState(doorList);
    return doorList;
  }
};

export const getEformResultFrDB = async (activityGuid, floor, setState) => {
  let doorList = [];
  try {
    doorList = await realmRead(
      AahkActivityDetail,
      'AahkActivityDetail',
      `activityGuid == '${activityGuid}' && locationDesc == '${floor}' DISTINCT(doorNo)`,
    );
    setState(doorList);
    return doorList;
  } catch (error) {
    console.log('getDoorFrDB error: ', error);
    setState(doorList);
    return doorList;
  }
};

export const checkIfDoorDownloaded = async (floors, activityGuid, setState) => {
  let doorList = [];
  // console.log('floors: ', floors);
  try {
    //open a schema with encryption
    const realm = await Realm.open({
      path: 'aahk',
      schema: [AahkActivityDetail],
      encryptionKey: KEY,
    });

    //get data from schema
    for (const floor of floors) {
      let doorListTask = realm
        .objects('AahkActivityDetail')
        .filtered(
          `activityGuid == '${activityGuid}' && locationDesc == '${floor.locationDesc}' DISTINCT(doorNo)`,
        );

      // console.log(
      //   `activityGuid == '${activityGuid}' && locationDesc == '${floor.locationDesc}' DISTINCT(doorNo)`,
      // );
      let tempList = [...doorListTask.toJSON()];

      // console.log(tempList);

      if (tempList.length > 0) {
        doorList.push(floor.locationDesc);
      }
    }
    //console.log('doorList: ', doorList);
    setState([...doorList]);
    realm.close();

    return;
  } catch (error) {
    console.log('getDoorFrDB error: ', error);
    setState([...doorList]);
    return;
  }
};

export const getColorByStatus = status => {
  return status == 'COMPLETED'
    ? '#00FF00'
    : status == 'ISSUE'
    ? '#FFA500'
    : status == 'PROGRESS'
    ? '#16bbff'
    : '';
};

export const checkFirstTimeLogin = async setFirstTimeLogin => {
  let user = [];
  user = await getLastLoginUserInfo();
  setFirstTimeLogin(user.length > 0 ? true : false);
};

export const handleSubChange = (
  eformResultSubDetailGuid,
  value,
  subFormType1,
  checkListAllSubDetail,
  setCheckListAllSubDetail,
) => {
  console.log(
    `handleSubChange start ${eformResultSubDetailGuid} ${value} ${subFormType1}`,
  );
  let newCheckListAllSubDetail = [...checkListAllSubDetail];
  for (const [index, detail] of newCheckListAllSubDetail.entries()) {
    if (detail.eformResultSubDetailGuid === eformResultSubDetailGuid) {
      if (subFormType1 === 'SELECT' || subFormType1 === 'TOGGLE') {
        subFormType1 === 'SELECT'
          ? (newCheckListAllSubDetail[index].subAns1 =
              newCheckListAllSubDetail[index].subAns1 === '1' ? '' : '1')
          : subFormType1 === 'TOGGLE'
          ? (newCheckListAllSubDetail[index].subAns2 =
              newCheckListAllSubDetail[index].subAns2 === '1' ? '' : '1')
          : '';
      } else if (subFormType1 === 'CHECKBOX') {
        newCheckListAllSubDetail[index].subAns1 = value;
      } else {
        newCheckListAllSubDetail[index].subAns1 = value;
      }
    }
  }
  setCheckListAllSubDetail(newCheckListAllSubDetail);
};
