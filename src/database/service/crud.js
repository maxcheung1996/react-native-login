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
      deleteRealmIfMigrationNeeded: true,
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

export const realmDelete = async (schema, name, filter = '') => {
  let count = 0;

  try {
    const realm = await Realm.open({
      path: 'aahk',
      deleteRealmIfMigrationNeeded: true,
      schema: [schema],
      encryptionKey: KEY,
    });

    //create data to schema
    realm.write(() => {
      let delObj;
      delObj =
        filter == ''
          ? realm.objects(name)
          : realm.objects(name).filtered(filter);
      count = delObj.length;
      realm.delete(delObj);
    });

    realm.close();
    console.log(`delete ${count} record for ${name} successfully`);
  } catch (error) {
    console.log(`delete record for ${name} fail: ${error}`);
  }
};

export const realmRead = async (
  schema,
  name,
  filter = '',
  sortBy = '',
  DESC = true,
) => {
  let result = [];

  try {
    //open a schema with encryption
    const realm = await Realm.open({
      path: 'aahk',
      schema: [schema],
      encryptionKey: KEY,
      deleteRealmIfMigrationNeeded: true,
    });

    //get data from schema
    if (sortBy == '') {
      const resp =
        filter == ''
          ? realm.objects(name)
          : realm.objects(name).filtered(filter);
      result = [...resp.toJSON()];
    } else {
      const resp =
        filter == ''
          ? realm.objects(name).sorted(sortBy, DESC)
          : realm.objects(name).filtered(filter).sorted(sortBy, DESC);
      result = [...resp.toJSON()];
    }

    realm.close();

    console.log(`read ${result.length} record for ${name} successfully`);
    return result;
  } catch (error) {
    console.log(`read record for ${name} fail: ${error}`);
  }
};
