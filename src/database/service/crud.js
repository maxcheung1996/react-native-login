import Realm from "realm";
import { key } from "../../config";

export const realmCreate = async (schema, name, obj) => {
    let count = 0;
    //console.log(obj);
    try {
        //open a schema with encryption
        const realm = await Realm.open({
            path: 'aahk',
            schema: [schema],
            encryptionKey: key
        });

        //create data to schema
        realm.write(() => {
            if (obj.length > 0) {
                for (const v of obj) {
                    realm.create(name, v)
                    count++;
                }
            }
        })

        //close the realm
        realm.close()
        console.log(`create record for ${name} successfully`)
    } catch (error) {
        console.log(`create record for ${name} fail: ${error}`)
    } finally {
        console.log(`total created record count ${count} for ${name}`)
    }
}

export const realmUpdate = async (schema, name, obj) => {
    let count = 0;

    try {
        //open a schema with encryption
        const realm = await Realm.open({
            path: 'aahk',
            schema: [schema],
            encryptionKey: key
        });

        //create data to schema
        realm.write(() => {
            if (obj.length > 0) {
                for (const v of obj) {
                    realm.create(name, v)
                    count++;
                }
            }
        })

        //close the realm
        realm.close()
        console.log(`create record for ${name} successfully`)
    } catch (error) {
        console.log(`create record for ${name} fail: ${error}`)
    } finally {
        console.log(`total created record count ${count} for ${name}`)
    }
}

export const realmDelete = async (schema, name) => {
    try {
        //open a schema with encryption
        const realm = await Realm.open({
            path: 'aahk',
            schema: [schema],
            encryptionKey: key
        });

        //create data to schema
        realm.write(() => {
            realm.delete(realm.objects(name));
        })

        //close the realm
        realm.close()
        console.log(`delete record for ${name} successfully`)
    } catch (error) {
        console.log(`create record for ${name} fail: ${error}`)
    }
}
