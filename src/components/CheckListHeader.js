import React, {useContext} from 'react';
import {GlobalContext} from '../context/GlobalContext';
import {View, StyleSheet} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../context/AuthContext';

const CheckListHeader = ({hideList, checkListGlobal, refreshHideList}) => {
  const {aahkDoor, inspector, floor} = useContext(GlobalContext);
  const {userInfo} = useContext(AuthContext);

  return (
    <View>
      <View style={[style.subheader, {marginBottom: 5}]}>
        <View
          style={{
            paddingLeft: 5,
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>{'基本資料'}</Text>
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
              refreshHideList('HEADER');
            }}
            name={
              hideList.indexOf('HEADER') > -1
                ? 'chevron-back-sharp'
                : 'chevron-down-sharp'
            }
            style={{color: '#fff'}}
            size={13}
            color="gray"
          />
        </View>
      </View>
      <TextInput
        value={aahkDoor}
        style={[
          {fontSize: 13},
          hideList.indexOf('HEADER') > -1 ? {display: 'none'} : {},
        ]}
        mode={'outlined'}
        label={'號碼'}
        disabled={true}
        onChangeText={text => {}}
      />
      <TextInput
        value={inspector.length > 0 ? inspector.join() : userInfo.fullname}
        style={[
          {fontSize: 13},
          hideList.indexOf('HEADER') > -1 ? {display: 'none'} : {},
        ]}
        mode={'outlined'}
        label={'檢查人員姓名'}
        disabled={true}
        onChangeText={text => {}}
      />
      <TextInput
        value={
          typeof checkListGlobal[0] !== 'undefined'
            ? checkListGlobal[0].testResult
            : ''
        }
        style={[
          {fontSize: 13},
          hideList.indexOf('HEADER') > -1 ? {display: 'none'} : {},
        ]}
        mode={'outlined'}
        label={'檢查結果'}
        disabled={true}
        onChangeText={text => {}}
      />
      <TextInput
        value={floor}
        style={[
          {fontSize: 13},
          hideList.indexOf('HEADER') > -1 ? {display: 'none'} : {},
        ]}
        mode={'outlined'}
        label={'位置'}
        disabled={true}
        onChangeText={text => {}}
      />
      <TextInput
        value={userInfo.team}
        style={[
          {fontSize: 13},
          hideList.indexOf('HEADER') > -1 ? {display: 'none'} : {},
        ]}
        mode={'outlined'}
        label={'隊伍'}
        disabled={true}
        onChangeText={text => {}}
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
    backgroundColor: '#16bbff',
    borderRadius: 6,
    elevation: 2,
    height: 40,
    marginTop: 8,
  },
});

export default CheckListHeader;
