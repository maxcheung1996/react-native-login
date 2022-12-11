import {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../context/GlobalContext';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {FAB, Portal, Text, TextInput} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {EformResultGlobal} from '../database/schema/EformResultGlobal';
import {KEY} from '../config';

const CheckListScreen = ({navigation}) => {
  const {aahkDoor} = useContext(GlobalContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
    },
  });
  const onSubmit = data => console.log(data);
  const [open, setFABOpen] = useState(false);
  const {eformResultGuid} = useContext(GlobalContext);
  const [checkList, setCheckList] = useState([]);

  useEffect(() => {
    getCheckListFrDBByEFormGuid(eformResultGuid);
  }, []);

  const checkListTest = ['firstName', 'lastName', 'number'];

  const getCheckListFrDBByEFormGuid = async eformResultGuid => {
    let checkList = [];
    try {
      //open a schema with encryption
      const realm = await Realm.open({
        path: 'aahk',
        schema: [EformResultGlobal],
        encryptionKey: KEY,
      });

      //get data from schema
      const checkListTask = realm
        .objects('EformResultGlobal')
        .filtered(`eformResultGuid == '${eformResultGuid}'`);

      setCheckList([...checkListTask.toJSON()]);

      realm.close();
      return checkList;
    } catch (error) {
      console.log('getDoorFrDB error: ', error);
      setCheckList(checkList);
      return checkList;
    }
  };

  return (
    <View style={style.container}>
      <ScrollView>
        <Text>
          {aahkDoor} - {eformResultGuid}
        </Text>
        {checkListTest.map((v, i) => {
          return (
            <Controller
              key={v}
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  label={v}
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name={v}
            />
          );
        })}
      </ScrollView>
      <Portal>
        <FAB.Group
          style={style.fabStyle}
          open={open}
          visible
          icon={open ? 'close-circle-outline' : 'plus'}
          actions={[
            {
              icon: 'content-save-edit-outline',
              label: 'Save',
              style: {backgroundColor: '#00FF00'},
              onPress: handleSubmit(onSubmit),
            },
            {
              icon: 'clipboard-check-multiple-outline',
              label: 'Complete',
              style: {backgroundColor: '#FFD801'},
              onPress: handleSubmit(onSubmit),
            },
          ]}
          onStateChange={() => {
            setFABOpen(!open);
          }}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  fabStyle: {
    bottom: 45,
    right: 0,
    position: 'absolute',
  },
});

export default CheckListScreen;
