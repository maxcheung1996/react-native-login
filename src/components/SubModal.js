import React, {useContext, useEffect, useState} from 'react';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {View, StyleSheet, FlatList} from 'react-native';
import {
  Text,
  Modal,
  Portal,
  TextInput,
  Checkbox,
  ToggleButton,
  IconButton,
} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GlobalContext} from '../context/GlobalContext';

const SubModal = ({
  hideModal,
  visible,
  checkListSubDetail,
  handleSubChange,
  checkListAllSubDetail,
  setCheckListAllSubDetail,
  removeSubItem,
}) => {
  const {aahkTray} = useContext(GlobalContext);

  const containerStyle = {backgroundColor: 'white', padding: 20};
  if (checkListSubDetail.length > 0) {
    return (
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <View
            style={{
              paddingLeft: 5,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={[
                {flex: 1},
                aahkTray === 'DOOR_INSPECTION'
                  ? {alignItems: 'center'}
                  : {alignItems: 'flex-end'},
              ]}>
              <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>
                {checkListSubDetail[0].sectionSubtitle
                  ? checkListSubDetail[0].sectionSubtitle
                  : checkListSubDetail[0].sectionTitle}
              </Text>
            </View>
            {aahkTray !== 'DOOR_INSPECTION' ? (
              <View style={{flex: 1}}>
                <IconButton
                  style={{alignSelf: 'flex-end'}}
                  backgroundColor={'#fff'}
                  icon={'trash-can'}
                  iconColor={'red'}
                  size={20}
                  onPress={() => {
                    removeSubItem(checkListSubDetail[0].eformResultDetailGuid);
                    hideModal();
                  }}
                />
              </View>
            ) : (
              <></>
            )}
          </View>
          {React.Children.toArray(
            checkListSubDetail.map((v, i) => {
              if (v.subFormType1 === 'SECTION') {
                return (
                  <View style={style.subheader}>
                    <View
                      style={{
                        paddingLeft: 5,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: '#fff', fontWeight: 'bold'}}>
                        {v.subHeader1}
                      </Text>
                    </View>
                  </View>
                );
              } else if (v.subFormType1 === 'TEXTBOX') {
                return (
                  <View>
                    <TextInput
                      value={v.subAns1}
                      style={{fontSize: 13}}
                      mode={'outlined'}
                      label={v.subHeader1}
                      right={<TextInput.Icon size={13} icon="lead-pencil" />}
                      onChangeText={text => {
                        handleSubChange(
                          v.eformResultSubDetailGuid,
                          text,
                          v.subFormType1,
                          checkListAllSubDetail,
                          setCheckListAllSubDetail,
                        );
                      }}
                    />
                  </View>
                );
              } else if (v.subFormType1 === 'SELECT') {
                return (
                  <>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View style={{flex: 1}}>
                          <Text style={{fontSize: 13}}>
                            {v.subHeader1} {v.subAnsOption1}
                          </Text>
                        </View>
                        <View style={{flex: 1}}>
                          <Checkbox.Android
                            status={v.subAns1 === '1' ? 'checked' : 'unchecked'}
                            onPress={() =>
                              handleSubChange(
                                v.eformResultSubDetailGuid,
                                v.subAns1,
                                v.subFormType1,
                                checkListAllSubDetail,
                                setCheckListAllSubDetail,
                              )
                            }
                          />
                        </View>
                        {v.subAnsOption2 ? (
                          <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <ToggleButton
                              icon={() => (
                                <Text
                                  style={{color: '#fff', fontWeight: 'bold'}}>
                                  {v.subAnsOption2}
                                </Text>
                              )}
                              value={v.subAnsOption2}
                              status={
                                v.subAns2 === '1' ? 'checked' : 'unchecked'
                              }
                              onPress={() =>
                                handleSubChange(
                                  v.eformResultSubDetailGuid,
                                  v.subAns2,
                                  'TOGGLE',
                                  checkListAllSubDetail,
                                  setCheckListAllSubDetail,
                                )
                              }
                              style={
                                v.subAns2 === '1'
                                  ? {backgroundColor: '#00FF00', height: 30}
                                  : {backgroundColor: '#16bbff', height: 30}
                              }
                            />
                          </View>
                        ) : (
                          <></>
                        )}
                      </View>
                    </View>
                  </>
                );
              } else if (v.subFormType1 === 'DROPDOWN') {
                let options = [];
                if (v.subAnsOption1) {
                  let option = [];
                  if (v.subAnsOption1.indexOf('|') > -1) {
                    option = v.subAnsOption1.split('|');
                  }
                  for (const item of option) {
                    options.push({label: item, value: item});
                  }
                }

                let placeholder = {
                  label: 'Select an item...',
                  value: null,
                  color: '#9EA0A4',
                };

                return (
                  <View style={{paddingBottom: 7}}>
                    <Text style={{marginTop: 5}}>{v.subHeader1}</Text>
                    <RNPickerSelect
                      placeholder={placeholder}
                      style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                          top: 10,
                          right: 12,
                        },
                      }}
                      value={v.subAns1}
                      onValueChange={value =>
                        handleSubChange(
                          v.eformResultSubDetailGuid,
                          value,
                          v.subFormType1,
                          checkListAllSubDetail,
                          setCheckListAllSubDetail,
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
                  </View>
                );
              } else if (v.subFormType1 === 'CHECKBOX') {
                let radio_props = [
                  {label: '是', value: '是'},
                  {label: '否', value: '否'},
                ];
                return (
                  <View style={{paddingBottom: 7}}>
                    <Text style={{marginTop: 5}}>{v.subHeader1}</Text>
                    <View style={{marginTop: 2.5}}>
                      <RadioForm formHorizontal={true} animation={true}>
                        {/* To create radio buttons, loop through your array of options */}
                        {radio_props.map((obj, i) => (
                          <RadioButton labelHorizontal={true} key={i}>
                            {/*  You can set RadioButtonLabel before RadioButtonInput */}
                            <RadioButtonInput
                              obj={obj}
                              index={i}
                              isSelected={
                                obj.value === v.subAns1 ? true : false
                              }
                              onPress={() => {
                                handleSubChange(
                                  v.eformResultSubDetailGuid,
                                  obj.value,
                                  v.subFormType1,
                                  checkListAllSubDetail,
                                  setCheckListAllSubDetail,
                                );
                              }}
                              borderWidth={0.8}
                              buttonInnerColor={'#2196f3'}
                              buttonOuterColor={
                                v.subAns1 === i ? '#2196f3' : '#000'
                              }
                              buttonSize={10}
                              buttonOuterSize={15}
                              buttonStyle={{marginTop: 3}}
                              buttonWrapStyle={{marginRight: -5}}
                            />
                            <RadioButtonLabel
                              obj={obj}
                              index={i}
                              labelHorizontal={true}
                              onPress={() => {
                                handleSubChange(
                                  v.eformResultSubDetailGuid,
                                  obj.value,
                                  v.subFormType1,
                                  checkListAllSubDetail,
                                  setCheckListAllSubDetail,
                                );
                              }}
                              labelStyle={{fontSize: 13.5, color: 'black'}}
                              labelWrapStyle={{marginRight: 10}}
                            />
                          </RadioButton>
                        ))}
                      </RadioForm>
                    </View>
                  </View>
                );
              }
            }),
          )}
        </Modal>
      </Portal>
    );
  }
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  dropDownPickerView: {
    marginTop: 7,
    paddingRight: 40,
    zIndex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  dropDownPicker: {
    elevation: 8,
    shadowColor: '#52006A',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderColor: 'white',
  },
  subheader: {
    flexDirection: 'row',
    backgroundColor: '#16bbff',
    borderRadius: 6,
    elevation: 2,
    shadowColor: '#52006A',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderColor: 'white',
    height: 40,
    marginVertical: 8,
  },
  card: {
    elevation: 1,
    shadowColor: '#52006A',
    shadowOffset: {width: -2, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderColor: 'white',
    marginVertical: 8,
    borderRadius: 2,
    backgroundColor: '#fff',
  },
  subheader: {
    backgroundColor: '#16bbff',
    borderRadius: 6,
    elevation: 2,
    height: 40,
    marginTop: 8,
    flexDirection: 'row',
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

export default SubModal;
