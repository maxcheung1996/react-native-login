import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../context/GlobalContext';
import {View, StyleSheet, Platform} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  Button,
  Checkbox,
  FAB,
  IconButton,
  List,
  Text,
  TextInput,
} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {EformResultGlobal} from '../database/schema/EformResultGlobal';
import {EformResultDetail} from '../database/schema/EformResultDetail';
import {realmCreate, realmDelete, realmRead} from '../database/service/crud';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../context/AuthContext';
import CheckListHeader from '../components/CheckListHeader';
import FABGroup from '../components/FABGroup';
import SubModal from '../components/SubModal';
import {EformResultSubDetails} from '../database/schema/EformResultSubDetails';
import {handleSubChange} from '../helper';
import {useIsFocused} from '@react-navigation/native';

const CheckListScreen = ({navigation}) => {
  const {aahkDoor, inspector, floor, aahkTray} = useContext(GlobalContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({});
  const onSubmit = data => console.log(data);
  const [open, setFABOpen] = useState(false);
  const {eformResultGuid, lang, setCurrCheckListDetail} =
    useContext(GlobalContext);
  const [checkListGlobal, setCheckListGlobal] = useState([]);
  const [checkListDetail, setCheckListDetail] = useState([]);
  const [checkListAllSubDetail, setCheckListAllSubDetail] = useState([]);
  const [checkListSubDetail, setCheckListSubDetail] = useState([]);
  const [hideList, setHideList] = useState(['HEADER']);
  const [isFollow, setIsFollow] = useState([]);
  const {userInfo} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [doorSecFollow, setDoorSecFollow] = useState([]);
  const isFocused = useIsFocused();
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getCheckListFrDBByEFormGuid(eformResultGuid);
    }
  }, [isFocused]);

  const routeToScreen = screen => {
    navigation.push(screen);
  };

  const refreshHideList = sectionGroupId => {
    console.log('refreshHideList start: ', sectionGroupId);

    if (sectionGroupId === 'allSectionClose') {
      let tmp_list = [];
      let tmp_checklist = [...checkListDetail];
      for (const section of checkListDetail) {
        if (
          section.formType1 !== 'section' &&
          section.sectionGroupId !== 'G00'
        ) {
          if (!tmp_list.indexOf(section.sectionGroupId) > -1)
            tmp_list.push(section.sectionGroupId);
        }
      }
      if (!tmp_list.indexOf('HEADER') > -1) tmp_list.push('HEADER');
      setHideList(tmp_list);
      setCheckListDetail(tmp_checklist);
    }

    if (sectionGroupId === 'allSectionOpen') {
      let tmp_list = [];
      setHideList(tmp_list);
      setCheckListDetail(checkListDetail);
    }

    if (!(sectionGroupId.indexOf('allSection') > -1)) {
      let tmp_hideList = [...hideList];
      if (tmp_hideList.indexOf(sectionGroupId) > -1) {
        tmp_hideList = tmp_hideList.filter((v, i) => {
          return v !== sectionGroupId;
        });
        setHideList(tmp_hideList);
        setCheckListDetail(checkListDetail);
      } else {
        tmp_hideList.push(sectionGroupId);
        setHideList(tmp_hideList);
        setCheckListDetail(checkListDetail);
      }
    }
  };

  const onChange = (selectedDate, guid, formType1) => {
    setShow('');
    console.log('selectedDate: ', selectedDate.nativeEvent.timestamp);
    handlechange(guid, selectedDate.nativeEvent.timestamp, formType1);
  };

  const showMode = (currentMode, guid) => {
    setShow(guid);
    setMode(currentMode);
  };

  const showDatepicker = guid => {
    console.log(`showDatePicker clicked!`);
    showMode('date', guid);
  };

  const getCheckListFrDBByEFormGuid = async eformResultGuid => {
    let checkListGlobal = [];
    let checkListDetail = [];
    try {
      let checkListAllSubDetail = await realmRead(
        EformResultSubDetails,
        'EformResultSubDetails',
        `eformResultGuid == '${eformResultGuid}'`,
      );

      let tmp_doorfollow = [];
      let resp = checkListAllSubDetail;

      if (typeof resp !== 'undefined') {
        for (const item of resp) {
          if (item.subAns1 || item.subAns2) {
            tmp_doorfollow.push(item.eformResultDetailGuid);
          }
        }
        setDoorSecFollow(tmp_doorfollow);
      }
      setCheckListAllSubDetail(checkListAllSubDetail);

      let is_follow = checkIsFollow(checkListAllSubDetail);

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

      checkTestResult(
        checkListGlobal,
        tmp_doorfollow,
        checkListDetail,
        setCheckListGlobal,
        is_follow,
      );
      setCheckListDetail(checkListDetail);
      setCurrCheckListDetail(checkListDetail);
    } catch (error) {
      console.log('getDoorFrDB error: ', error);
      setCheckListGlobal(checkListGlobal);
      setCheckListDetail(checkListDetail);
    }
  };

  const checkTest = () => {
    checkTestResult(
      checkListGlobal,
      doorSecFollow,
      checkListDetail,
      setCheckListGlobal,
      isFollow,
    );
  };

  const checkTestResult = (
    checkListGlobal,
    doorSecFollow,
    checkListDetail,
    setCheckListGlobal,
    isFollow,
  ) => {
    let tmp_checklistGlobal = [...checkListGlobal];

    if (aahkTray === 'DOOR_INSPECTION') {
      let tmp_result = checkListDetail.filter((v, i) => {
        return v.header1 === '不能進入';
      });
      let getIn = '';
      if (tmp_result.length > 0) {
        getIn = tmp_result[0].ans1;
      }

      tmp_checklistGlobal[0].testResult =
        getIn === '1'
          ? '不能進入'
          : doorSecFollow.length > 0
          ? '待跟進'
          : '正常';
    } else {
      let tmp_result = checkListDetail.filter((v, i) => {
        return v.header1 === '檢查正常';
      });
      let getIn = '';
      //alert(JSON.stringify(tmp_result));
      if (tmp_result.length > 0) {
        getIn = tmp_result[0].ans1;
      }
      //alert(getIn);
      tmp_checklistGlobal[0].testResult =
        getIn === '1' ? '正常' : isFollow.length > 0 ? '待跟進' : '';
    }
    setCheckListGlobal(tmp_checklistGlobal);
  };

  const handlechange = (
    eformResultDetailGuid,
    value,
    formType1,
    header1,
    checkTest,
  ) => {
    console.log(
      `handlechange start ${eformResultDetailGuid} ${value} ${formType1}`,
    );

    let newCheckListDetail = [...checkListDetail];
    for (const [index, detail] of newCheckListDetail.entries()) {
      if (detail.eformResultDetailGuid === eformResultDetailGuid) {
        if (formType1 === 'SELECT') {
          newCheckListDetail[index].ans1 =
            newCheckListDetail[index].ans1 === '1' ? '' : '1';
        } else {
          newCheckListDetail[index].ans1 = value;
        }
      }
    }
    if (header1 === '檢查正常' || header1 === '不能進入') {
      checkTestResult(
        checkListGlobal,
        doorSecFollow,
        newCheckListDetail,
        setCheckListGlobal,
        isFollow,
      );
    }
    setCheckListDetail(newCheckListDetail);
  };

  const eraseInput = guid => {
    console.log(`eraseInput start ${guid}`);
    let newCheckListDetail = [...checkListDetail];
    for (const [index, detail] of newCheckListDetail.entries()) {
      if (detail.eformResultDetailGuid === guid) {
        newCheckListDetail[index].ans1 = '';
      }
    }

    let newCheckListSubDetail = [...checkListAllSubDetail];
    for (const [index, detail] of newCheckListSubDetail.entries()) {
      if (detail.eformResultSubDetailGuid === guid) {
        newCheckListSubDetail[index].ans1 = '';
      }
    }
    setCheckListSubDetail(checkListSubDetail);
    setCheckListDetail(newCheckListDetail);
  };

  const hideModal = async () => {
    await realmDelete(
      EformResultSubDetails,
      'EformResultSubDetails',
      `eformResultGuid == '${checkListAllSubDetail[0].eformResultGuid}'`,
    );
    await realmCreate(
      EformResultSubDetails,
      'EformResultSubDetails',
      checkListAllSubDetail,
    );
    let tmp_isFollow = checkIsFollow(checkListAllSubDetail);
    checkTestResult(
      checkListGlobal,
      doorSecFollow,
      checkListDetail,
      setCheckListGlobal,
      tmp_isFollow,
    );
    setVisible(false);
    setCheckListDetail(checkListDetail);
  };

  const checkIsFollow = checkListAllSubDetail => {
    let tmp_isFollow = [];
    checkListAllSubDetail.map((v, i) => {
      if (v.subAns1 || v.subAns2) {
        if (!(tmp_isFollow.indexOf(v.eformResultDetailGuid) > -1)) {
          tmp_isFollow.push(v.eformResultDetailGuid);
        }
      }
    });
    setIsFollow(tmp_isFollow);
    console.log(tmp_isFollow);
    return tmp_isFollow;
  };

  const showModal = eformResultDetailGuid => {
    console.log('show modal');
    let tmp_eformResultDetailGuid = [];
    tmp_eformResultDetailGuid = checkListAllSubDetail.filter((v, i) => {
      return v.eformResultDetailGuid === eformResultDetailGuid;
    });
    setCheckListSubDetail(tmp_eformResultDetailGuid);
    setVisible(true);
  };

  const removeSubItem = eformResultDetailGuid => {
    console.log(`eformResultDetailGuid : ${eformResultDetailGuid}`);
    let tmp_checklist = [...checkListDetail];
    for (const [index, item] of tmp_checklist.entries()) {
      if (item.eformResultDetailGuid === eformResultDetailGuid) {
        tmp_checklist[index].ans1 = '';
      }
    }

    let tmp_subChecklist = [...checkListSubDetail];
    for (const [index, item] of tmp_subChecklist.entries()) {
      if (item.eformResultDetailGuid === eformResultDetailGuid) {
        tmp_subChecklist[index].subAns1 = '';
      }
    }
    setCheckListSubDetail(tmp_subChecklist);
    setCheckListDetail(tmp_checklist);
  };

  const action = async type => {
    console.log(type);
    if (type === 'save') {
      await realmDelete(
        EformResultDetail,
        'EformResultDetail',
        `eformResultGuid == '${eformResultGuid}'`,
      );
      await realmCreate(
        EformResultDetail,
        'EformResultDetail',
        checkListDetail,
      );
    } else if (action === 'done') {
    }
  };

  return (
    <>
      {/* <View style={style.loading}>
        <ActivityIndicator animating={isLoading} size="large" />
      </View> */}
      <SubModal
        hideModal={hideModal}
        visible={visible}
        checkListSubDetail={checkListSubDetail}
        handleSubChange={handleSubChange}
        checkListAllSubDetail={checkListAllSubDetail}
        setCheckListAllSubDetail={setCheckListAllSubDetail}
        removeSubItem={removeSubItem}
      />
      <View style={style.container}>
        <ScrollView contentContainerStyle={{paddingBottom: 100}}>
          <CheckListHeader
            hideList={hideList}
            checkListGlobal={checkListGlobal}
            refreshHideList={refreshHideList}
          />
          {React.Children.toArray(
            checkListDetail.map((v, i) => {
              if (v.formType1 === 'SECTION') {
                return (
                  <View
                    style={[
                      style.subheader,
                      aahkTray === 'DOOR_INSPECTION' &&
                      doorSecFollow.indexOf(v.eformResultDetailGuid) > -1
                        ? {backgroundColor: '#00FF00'}
                        : {backgroundColor: '#16bbff'},
                    ]}>
                    <View
                      style={{
                        paddingLeft: 5,
                        flex: 1,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: '#fff', fontWeight: 'bold'}}>
                        {v.header1}
                      </Text>
                    </View>
                    <View
                      style={{
                        paddingRight: 5,
                        flex: 1,
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                      }}>
                      <Ionicons
                        onPress={() => {
                          refreshHideList(v.sectionGroupId);
                        }}
                        name={
                          hideList.indexOf(v.sectionGroupId) > -1
                            ? 'chevron-back-sharp'
                            : 'chevron-down-sharp'
                        }
                        style={{color: '#fff'}}
                        size={13}
                        color="gray"
                      />
                    </View>
                  </View>
                );
              } else if (v.formType1 === 'SELECT') {
                return (
                  <>
                    <View
                      style={[
                        {flexDirection: 'row', alignItems: 'center'},
                        hideList.indexOf(v.sectionGroupId) > -1
                          ? {display: 'none'}
                          : {},
                      ]}>
                      <Text style={{fontSize: 13}}>
                        {v.header1} {v.ansOption1}
                      </Text>
                      <Checkbox.Android
                        status={v.ans1 === '1' ? 'checked' : 'unchecked'}
                        onPress={() =>
                          handlechange(
                            v.eformResultDetailGuid,
                            v.ans1,
                            v.formType1,
                            v.header1,
                            checkTest,
                          )
                        }
                      />
                    </View>
                  </>
                );
              } else if (v.formType1 === 'TEXTBOX') {
                return (
                  <View>
                    <TextInput
                      value={v.ans1}
                      style={[
                        {fontSize: 13},
                        hideList.indexOf(v.sectionGroupId) > -1
                          ? {display: 'none'}
                          : {},
                      ]}
                      mode={'outlined'}
                      label={v.header1}
                      right={
                        <TextInput.Icon
                          onPress={() => {
                            eraseInput(v.eformResultDetailGuid);
                          }}
                          size={13}
                          icon="eraser"
                        />
                      }
                      onChangeText={text => {
                        handlechange(
                          v.eformResultDetailGuid,
                          text,
                          v.formType1,
                        );
                      }}
                    />
                  </View>
                );
              } else if (v.formType1 === 'DROPDOWN') {
                let options = [];
                if (v.ansOption1) {
                  let option = [];
                  if (v.ansOption1.indexOf('|') > -1) {
                    option = v.ansOption1.split('|');
                  }
                  for (const item of option) {
                    options.push({label: item, value: item});
                  }
                }

                let placeholder = {
                  label: 'Select an item...',
                  value: '',
                  color: '#9EA0A4',
                };

                return (
                  <View
                    style={[
                      {paddingVertical: 5},
                      hideList.indexOf(v.sectionGroupId) > -1
                        ? {display: 'none'}
                        : {},
                      ,
                      v.ansOption2 ? {flexDirection: 'row'} : {},
                    ]}>
                    <Text style={style.dropdownText}>{v.header1}</Text>
                    <RNPickerSelect
                      placeholder={placeholder}
                      style={
                        v.ansOption2
                          ? {
                              ...pickerFollowSelectStyles,
                              iconContainer: {
                                top: 10,
                                right: 12,
                              },
                            }
                          : {
                              ...pickerSelectStyles,
                              iconContainer: {
                                top: 10,
                                right: 12,
                              },
                            }
                      }
                      value={v.ans1}
                      onValueChange={value =>
                        handlechange(
                          v.eformResultDetailGuid,
                          value,
                          v.formType1,
                        )
                      }
                      items={options}
                      Icon={() => {
                        return (
                          <Ionicons
                            name="md-arrow-down"
                            style={{marginTop: 2}}
                            size={18}
                            color="gray"
                          />
                        );
                      }}
                    />
                    {v.ansOption2 ? (
                      <Button
                        style={{
                          borderRadius: 6,
                          padding: 2.5,
                          marginLeft: 6,
                          backgroundColor: !(
                            isFollow.indexOf(v.eformResultDetailGuid) > -1
                          )
                            ? '#16bbff'
                            : '#00FF00',
                        }}
                        mode="contained"
                        onPress={() => showModal(v.eformResultDetailGuid)}>
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>
                          {v.ansOption2}
                        </Text>
                      </Button>
                    ) : (
                      <></>
                    )}
                  </View>
                );
              } else if (v.formType1 === 'CALENDAR') {
                return (
                  <View
                    style={
                      hideList.indexOf(v.sectionGroupId) > -1
                        ? {display: 'none'}
                        : {}
                    }>
                    <View>
                      <TextInput
                        value={
                          v.ans1
                            ? new Date(v.ans1).toString()
                            : new Date().toString()
                        }
                        editable={false}
                        style={{backgroundColor: '#fff', fontSize: 13}}
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
                        onChange={date =>
                          onChange(date, v.eformResultDetailGuid, v.formType1)
                        }
                      />
                    )}
                  </View>
                );
              } else {
                return (
                  <View
                    style={
                      hideList.indexOf(v.sectionGroupId) > -1
                        ? {display: 'none'}
                        : {}
                    }>
                    <Text>
                      {v.header1} {v.formType1}
                    </Text>
                  </View>
                );
              }
            }),
          )}
        </ScrollView>
        <FABGroup
          open={open}
          routeToScreen={routeToScreen}
          handleSubmit={handleSubmit}
          hideList={hideList}
          refreshHideList={refreshHideList}
          setFABOpen={setFABOpen}
          onSubmit={onSubmit}
          action={action}
        />
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  fabStyle: {
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
    marginTop: 5,
  },
  subheader: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 6,
    elevation: 2,
    height: 40,
    marginTop: 8,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: '#fff',
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const pickerFollowSelectStyles = StyleSheet.create({
  inputIOS: {
    width: 280,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: '#fff',
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    width: 280,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default CheckListScreen;
