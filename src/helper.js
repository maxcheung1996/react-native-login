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
    const userInfoTask = realm.objects('userInfo');
    userInfo = userInfoTask.sorted('createdAt', true);
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
    buildingList = realm.objects('ActivityList');

    console.log('buildingList: ', buildingList);

    return buildingList;
  } catch (error) {
    console.log('getBuildingFrDB error: ', error);
    return buildingList;
  }
};

export const validateLogin = (email, password) => {
  return email === null || password === null || email === '' || password === ''
    ? false
    : true;
};
