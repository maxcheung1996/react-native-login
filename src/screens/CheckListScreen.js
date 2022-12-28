import {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../context/GlobalContext';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {FAB, Portal, Text, TextInput} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {EformResultGlobal} from '../database/schema/EformResultGlobal';
import {KEY} from '../config';
import {realmRead} from '../database/service/crud';

const CheckListScreen = ({navigation}) => {
  const {aahkDoor} = useContext(GlobalContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({});
  const onSubmit = data => console.log(data);
  const [open, setFABOpen] = useState(false);
  const {eformResultGuid, lang} = useContext(GlobalContext);
  const [checkList, setCheckList] = useState([]);
  const routeToScreen = (screen) => {
    navigation.push(screen);
  };
  
  useEffect(() => {
    getCheckListFrDBByEFormGuid(eformResultGuid);
  }, []);

  const checkListTest = ['firstName', 'lastName', 'number'];

  const getCheckListFrDBByEFormGuid = async eformResultGuid => {
    let checkList = [];
    try {
      checkList = await realmRead(
        EformResultGlobal,
        'EformResultGlobal',
        `eformResultGuid == '${eformResultGuid}'`,
      );

      setCheckList(checkList);

      // realm.close();
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
              icon: 'camera-plus-outline',
              label: lang == "en" ? 'Take Photo' : '拍照',
              style: {backgroundColor: '#5bc0de'},
              onPress: () => routeToScreen("TakePhoto"),
            },
            {
              icon: 'content-save-edit-outline',
              label: lang == "en" ? 'Save' : '儲存',
              style: {backgroundColor: '#00FF00'},
              onPress: handleSubmit(onSubmit),
            },
            {
              icon: 'clipboard-check-multiple-outline',
              label: lang == "en" ? 'Complete' : '完成',
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
    bottom: 75,
    right: 0,
    position: 'absolute',
  },
});

export default CheckListScreen;
