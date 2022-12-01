import Realm from 'realm';
import {KEY} from './config';
import {ActivityList} from './database/schema/ActivityList';
import {userInfoTable} from './database/schema/User';

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
    //open a schema with encryption
    const realm = await Realm.open({
      path: 'aahk',
      schema: [userInfoTable],
      encryptionKey: KEY,
    });

    //get data from schema
    const userInfoTask = await realm
      .objects('userInfo')
      .sorted('createdAt', true);
    userInfo = [...userInfoTask.toJSON()];

    realm.close();
    //console.log('userInfo: ', userInfo[0]);
    return userInfo;
  } catch (error) {
    return userInfo;
  }
};

export const getBuildingFrDB = async cat => {
  let buildingList = [];
  try {
    //open a schema with encryption
    const realm = await Realm.open({
      path: 'aahk',
      schema: [ActivityList],
      encryptionKey: KEY,
    });

    //get data from schema
    const buildingListTask = realm
      .objects('ActivityDetail')
      .filtered(`category == '${cat}' DISTINCT(locationCode)`);

    buildingList = [...buildingListTask.toJSON()];

    realm.close();
    return buildingList;
  } catch (error) {
    console.log('getBuildingFrDB error: ', error);
    return buildingList;
  }
};

export const getWorksOrderFrDB = async (cat, aahkBuilding) => {
  let worksOrderList = [];
  try {
    //open a schema with encryption
    const realm = await Realm.open({
      path: 'aahk',
      schema: [ActivityList],
      encryptionKey: KEY,
    });

    //get data from schema
    const worksOrderListTask = realm
      .objects('ActivityDetail')
      .filtered(`category == '${cat}' && locationCode == '${aahkBuilding}' DISTINCT(woNo)`);

    worksOrderList = [...worksOrderListTask.toJSON()];

    realm.close();
    return worksOrderList;
  } catch (error) {
    console.log('getWorksOrderFrDB error: ', error);
    return worksOrderList;
  }
};

export const getFloorFrDB = async (cat, aahkBuilding, aahkWorksOrder) => {
  let FloorList = [];
  try {
    //open a schema with encryption
    const realm = await Realm.open({
      path: 'aahk',
      schema: [ActivityList],
      encryptionKey: KEY,
    });

    //get data from schema
    const FloorTask = realm
      .objects('ActivityDetail')
      .filtered(`category == '${cat}' && locationCode == '${aahkBuilding}' && woNo == '${aahkWorksOrder}' DISTINCT(locationDesc)`);

      FloorList = [...FloorTask.toJSON()];

    realm.close();
    return FloorList;
  } catch (error) {
    console.log('getFloorFrDB error: ', error);
    return FloorList;
  }
};

export const validateLogin = (email, password) => {
  return email === null || password === null || email === '' || password === ''
    ? false
    : true;
};
