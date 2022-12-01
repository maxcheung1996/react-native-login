import Realm from 'realm';
import {KEY} from '../../config';
import uuid from 'react-native-uuid';

export const realmCreate = async (schema, name, obj) => {
  let count = 0;
  //console.log(obj);
  try {
    //open a schema with encryption
    const realm = await Realm.open({
      path: 'aahk',
      schema: [schema],
      encryptionKey: KEY,
    });

    //create data to schema
    realm.write(() => {
      if (obj.length > 0) {
        for (const v of obj) {
          v['_id'] = uuid.v4();
          realm.create(name, v);
          count++;
        }
      }
    });

    realm.close();

    console.log(`create ${count}  record for ${name} successfully`);
  } catch (error) {
    console.log(`create record for ${name} fail: ${error}`);
  }
};

export const realmUpdate = async (schema, name, obj) => {
  let count = 0;

  try {
    //open a schema with encryption
    const realm = await Realm.open({
      path: 'aahk',
      schema: [schema],
      encryptionKey: KEY,
    });

    //create data to schema
    realm.write(() => {
      if (obj.length > 0) {
        for (const v of obj) {
          realm.create(name, v);
          count++;
        }
      }
    });

    realm.close();

    console.log(`create record for ${name} successfully`);
  } catch (error) {
    console.log(`create record for ${name} fail: ${error}`);
  } finally {
    console.log(`total created record count ${count} for ${name}`);
  }
};

export const realmDelete = async (schema, name, filter = '') => {
  let count = 0;

  try {
    //open a schema with encryption
    const realm = await Realm.open({
      path: 'aahk',
      schema: [schema],
      encryptionKey: KEY,
    });

    //create data to schema
    realm.write(() => {
      let delObj;
      if (filter != '') {
        delObj = realm.objects(name).filtered(filter);
      } else {
        delObj = realm.objects(name);
      }
      count = delObj.length;
      realm.delete(delObj);
    });

    realm.close();

    console.log(`delete ${count} record for ${name} successfully`);
  } catch (error) {
    console.log(`create record for ${name} fail: ${error}`);
  }
};
