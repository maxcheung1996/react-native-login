import {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../context/GlobalContext';
import {View, StyleSheet, Platform, Button} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Checkbox, FAB, IconButton, List, Text, TextInput} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {EformResultGlobal} from '../database/schema/EformResultGlobal';
import {EformResultDetail} from '../database/schema/EformResultDetail';
import {realmRead} from '../database/service/crud';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  const [checkListGlobal, setCheckListGlobal] = useState([]);
  const [checkListDetail, setCheckListDetail] = useState([]);
  const routeToScreen = screen => {
    navigation.push(screen);
  };

  useEffect(() => {
    getCheckListFrDBByEFormGuid(eformResultGuid);
  }, []);

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState('');

  const onChange = (selectedDate, guid, formType1) => {
    setShow('');
    console.log("selectedDate: ", selectedDate.nativeEvent.timestamp);
    handlechange(guid, selectedDate.nativeEvent.timestamp, formType1)
    
  };

  const showMode = (currentMode, guid) => {
    setShow(guid);
    setMode(currentMode);
  };

  const showDatepicker = (guid) => {
    console.log(`showDatePicker clicked!`);
    showMode('date', guid);
  };

  const getCheckListFrDBByEFormGuid = async eformResultGuid => {
    let checkListGlobal = [];
    let checkListDetail = [];
    try {
      checkListGlobal = await realmRead(
        EformResultGlobal,
        'EformResultGlobal',
        `eformResultGuid == '${eformResultGuid}'`,
      );

      setCheckListGlobal(checkListGlobal);

      checkListDetail = await realmRead(
        EformResultDetail,
        'EformResultDetail',
        `eformResultGuid == '${eformResultGuid}'`,
      );

      setCheckListDetail(checkListDetail);
    } catch (error) {
      console.log('getDoorFrDB error: ', error);
      setCheckListGlobal(checkListGlobal);
      setCheckListDetail(checkListDetail);
    }
  };

  const handlechange = (eformResultDetailGuid, value, formType1) => {
    console.log(`handlechange start ${eformResultDetailGuid} ${value} ${formType1}`);
    let newCheckListDetail = [...checkListDetail];
    for(const [index, detail] of newCheckListDetail.entries()){
      if(detail.eformResultDetailGuid === eformResultDetailGuid){
        if (formType1 === 'SELECT') {
          newCheckListDetail[index].ans1 = newCheckListDetail[index].ans1 === "1" ? "" : "1"
        } else {
          newCheckListDetail[index].ans1 = value;
        }
      }
    }
    setCheckListDetail(newCheckListDetail);
  };

  const eraseInput = (guid) => {
    console.log(`eraseInput start ${guid}`);
    let newCheckListDetail = [...checkListDetail];
    for(const [index, detail] of newCheckListDetail.entries()){
      if(detail.eformResultDetailGuid === guid){
        newCheckListDetail[index].ans1 = "";
      }
    }
    setCheckListDetail(newCheckListDetail);
  }

  return (
    <View style={style.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        {checkListDetail.map((v, i) => {
          if (v.formType1 === 'SECTION') {
            return (
              <List.Section key={i}>
                <List.Subheader
                  style={style.subheader}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    {v.header1}
                  </Text>
                </List.Subheader>
              </List.Section>
            );
          } else if (v.formType1 === 'SELECT') {
            return (
              <>
                    <View key={i} style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{fontSize: 13}}>
                        {v.header1} {v.ansOption1}
                      </Text>
                      <Checkbox status={v.ans1 === "1" ? 'checked' : 'unchecked'} onPress={() => handlechange(v.eformResultDetailGuid, v.ans1, v.formType1)} />
                    </View>
              </>
            );
          } else if (v.formType1 === 'TEXTBOX') {
            return (
              <TextInput
                value={v.ans1}
                key={i}
                style={{fontSize: 13}}
                mode={'outlined'}
                label={v.header1}
                right={<TextInput.Icon onPress={() => {eraseInput(v.eformResultDetailGuid)}} size={13} icon="eraser" />}
                onChangeText={text => {handlechange(v.eformResultDetailGuid, text, v.formType1)}}
              />
            );
          } else if (v.formType1 === 'DROPDOWN') {
            let option = [];
            if(v.ansOption1){
              if(v.ansOption1.indexOf("|") > -1){
                option = v.ansOption1.split("|");
              }
            }
            
            return (
              <View key={i}>
                <Text style={style.dropdownText}>{v.header1}</Text>

                <View
                  style={style.pickerView}>
                  <Picker
                    style={{height: 43}}
                    itemStyle={{height: 43}}
                    selectedValue={v.ans1}
                    onValueChange={(itemValue, itemIndex) =>
                      handlechange(v.eformResultDetailGuid, itemValue, v.formType1)
                    }>
                    {option.map((v, i) => {
                      return <Picker.Item key={i} label={v} value={v} />;
                    })}
                  </Picker>
                </View>
              </View>
            );
          } else if (v.formType1 === 'CALENDAR') {
            return (
              <>
                <View key={i}>
                  <View>
                    <TextInput
                      value={v.ans1 ? new Date(v.ans1).toString() : new Date().toString()}
                      editable={false}
                      style={{fontSize: 13}}
                      mode={'outlined'}
                      label={v.header1}
                      right={
                        <TextInput.Icon
                          onPress={() =>
                            showDatepicker(v.eformResultDetailGuid)
                          }
                          icon="timetable"
                        />
                      }
                    />
                  </View>
                  {show === v.eformResultDetailGuid && (
                    <DateTimePicker
                      testID={v.eformResultDetailGuid}
                      value={v.ans1 ? new Date(v.ans1) : new Date()}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      onChange={(date) => onChange(date, v.eformResultDetailGuid, v.formType1)}
                    />
                  )}
                </View>
              </>
            );
          } else {
            return (
              <Text key={i}>
                {v.header1} {v.formType1}
              </Text>
            );
          }
        })}
      </ScrollView>
      <FAB.Group
        style={style.fabStyle}
        open={open}
        visible
        icon={open ? 'close-circle-outline' : 'plus'}
        actions={[
          {
            icon: 'camera-plus-outline',
            label: lang == 'en' ? 'Take Photo' : '拍照',
            style: {backgroundColor: '#5bc0de'},
            onPress: () => routeToScreen('TakePhoto'),
          },
          {
            icon: 'content-save-edit-outline',
            label: lang == 'en' ? 'Save' : '儲存',
            style: {backgroundColor: '#00FF00'},
            onPress: handleSubmit(onSubmit),
          },
          {
            icon: 'clipboard-check-multiple-outline',
            label: lang == 'en' ? 'Complete' : '完成',
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
  dropDownPicker: {
    elevation: 8,
    shadowColor: '#52006A',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderColor: 'white',
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
  },
  datePickerStyle: {
    width: 230,
  },
  text: {
    textAlign: 'left',
    width: 230,
    fontSize: 16,
    color: '#000',
  },
  pickerView: {
    marginVertical: 7,
    backgroundColor: '#fff',
    borderWidth: 0.9,
    borderColor: 'grey',
    borderRadius: 8,
    justifyContent: 'center',
  },
  dropdownText: {
    marginTop: 5
  },
  subheader: {
    flexDirection: 'row',
    backgroundColor: '#16bbff',
    borderRadius: 8,
    elevation: 2,
  }
});

export default CheckListScreen;
