import React, {useContext} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {FAB} from 'react-native-paper';
import {GlobalContext} from '../context/GlobalContext';

const FABGroup = ({
  open,
  routeToScreen,
  handleSubmit,
  hideList,
  refreshHideList,
  setFABOpen,
}) => {
  const {lang} = useContext(GlobalContext);

  return (
    <FAB.Group
      style={[style.fabStyle, {bottom: Platform.OS === 'ios' ? 40 : 75}]}
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
          onPress: () => handleSubmit(onSubmit),
        },
        {
          icon: 'clipboard-check-multiple-outline',
          label: lang == 'en' ? 'Complete' : '完成',
          style: {backgroundColor: '#FFD801'},
          onPress: () => handleSubmit(onSubmit),
        },
        {
          icon: hideList.length > 0 ? 'chevron-left' : 'chevron-down',
          label:
            hideList.length > 0
              ? lang == 'en'
                ? 'Expand'
                : '展開'
              : lang == 'en'
              ? 'Collapse'
              : '關閉',
          style: {backgroundColor: '#eb8f34'},
          onPress: () =>
            hideList.length > 0
              ? refreshHideList('allSectionOpen')
              : refreshHideList('allSectionClose'),
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

export default FABGroup;
