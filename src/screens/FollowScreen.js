import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Avatar, IconButton, Card, Text} from 'react-native-paper';
import {GlobalContext} from '../context/GlobalContext';
import {EformResultSubDetails} from '../database/schema/EformResultSubDetails';
import {realmRead, realmDelete, realmCreate} from '../database/service/crud';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {convertDateString, handleSubChange} from '../helper';
import {AuthContext} from '../context/AuthContext';
import SubModal from '../components/SubModal';

const FollowScreen = ({navigation}) => {
  const {currCheckListDetail, eformResultGuid} = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [sectionList, setSectionList] = useState([]);
  const [section, setSection] = useState(null);
  const [followList, setFollowList] = useState([]);
  const [checkListAllSubDetail, setCheckListAllSubDetail] = useState([]);
  const {userInfo} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [checkListSubDetail, setCheckListSubDetail] = useState([]);

  const showModal = eformResultDetailGuid => {
    let tmp_eformResultDetailGuid = [];
    tmp_eformResultDetailGuid = checkListAllSubDetail.filter((v, i) => {
      return v.eformResultDetailGuid === eformResultDetailGuid;
    });
    setCheckListSubDetail(tmp_eformResultDetailGuid);
    setVisible(true);
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
    setVisible(false);
  };

  useEffect(() => {
    getSectionList();
  }, []);

  const getSectionList = async () => {
    let checkListAllSubDetail = await realmRead(
      EformResultSubDetails,
      'EformResultSubDetails',
      `eformResultGuid == '${eformResultGuid}'`,
    );
    setCheckListAllSubDetail(checkListAllSubDetail);
    let tmp = [];
    for (const detail of currCheckListDetail) {
      if (detail.formType1 === 'SECTION')
        tmp.push({
          label: detail.header1,
          value: detail.eformResultDetailGuid,
          icon: () => (
            <Avatar.Icon
              backgroundColor="lightgrey"
              color="black"
              style={{marginLeft: 8}}
              size={23}
              icon={() => (
                <MaterialIcons
                  color={'#black'}
                  backgroundColor={'red'}
                  name="construction"
                  size={15}
                />
              )}
            />
          ),
        });
    }

    let tmp_followList = [];
    for (const allSubDetail of checkListAllSubDetail) {
      if (allSubDetail.subAns1 || allSubDetail.subAns2) {
        if (tmp_followList.length === 0) {
          tmp_followList = [];
        }
        if (
          !(
            JSON.stringify(followList).indexOf(
              allSubDetail.eformResultDetailGuid,
            ) > -1
          )
        ) {
          // console.log(JSON.stringify(followList));
          // console.log(allSubDetail.eformResultDetailGuid);
          tmp_followList.push([allSubDetail]);
        }
      }
    }
    console.log('tmp_followList11: ', tmp_followList.length);
    setFollowList(tmp_followList);
    setSectionList(tmp);
  };

  const addToFollowList = section => {
    if (section) {
      if (JSON.stringify(followList).indexOf(section) > -1) {
        return;
      } else {
        let tmp_followList = [...followList];
        let tmp_section = checkListAllSubDetail.filter((v, i) => {
          return v.eformResultDetailGuid === section;
        });
        tmp_followList.push(tmp_section);
        console.log(tmp_followList);
        setFollowList(tmp_followList);
      }
    }
  };

  const removeItem = eformResultDetailGuid => {
    let tmp_followList = [...followList];
    let new_followList = [];
    for (const item of tmp_followList) {
      if (
        item.filter((v, i) => {
          return v.eformResultDetailGuid !== eformResultDetailGuid;
        }).length > 0
      )
        new_followList.push(
          item.filter((v, i) => {
            return v.eformResultDetailGuid !== eformResultDetailGuid;
          }),
        );
    }
    setFollowList(new_followList);
  };

  return (
    <>
      <SubModal
        hideModal={hideModal}
        visible={visible}
        checkListSubDetail={checkListSubDetail}
        handleSubChange={handleSubChange}
        checkListAllSubDetail={checkListAllSubDetail}
        setCheckListAllSubDetail={setCheckListAllSubDetail}
      />
      <View style={style.container}>
        <View style={style.subheader}>
          <View
            style={{
              paddingLeft: 5,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>跟進項目</Text>
          </View>
        </View>
        <View style={style.dropDownPickerView}>
          <DropDownPicker
            style={style.dropDownPicker}
            searchable={true}
            searchPlaceholder="Search Follow Item..."
            itemKey="value"
            mode="BADGE"
            theme="LIGHT"
            open={open}
            autoScroll={true}
            items={sectionList}
            setOpen={setOpen}
            setItems={setSectionList}
            value={section}
            setValue={setSection}
            multiple={false}
            placeholder={'Please select a follow item'}
          />
          <IconButton
            icon="plus-circle"
            style={style.dropDownPicker}
            iconColor={'#16bbff'}
            size={25}
            onPress={() => addToFollowList(section)}
          />
        </View>
        <FlatList
          data={followList}
          renderItem={item =>
            renderItem(item.item, userInfo, removeItem, showModal)
          }
        />
      </View>
    </>
  );
};

const renderItem = (item, userInfo, removeItem, showModal) => {
  const LeftContent = props => (
    <Avatar.Icon
      {...props}
      icon={() => (
        <MaterialIcons color={'#fff'} name="construction" size={22} />
      )}
    />
  );

  return (
    <Card
      style={style.card}
      onPress={() => showModal(item[0].eformResultDetailGuid)}>
      <Card.Title
        title={item.length > 0 ? item[0].sectionTitle : ''}
        subtitle={item.length > 0 ? item[0].sectionSubtitle : ''}
        left={LeftContent}
        right={() => (
          <Card.Actions>
            <IconButton
              backgroundColor={'#fff'}
              icon={'trash-can'}
              iconColor={'red'}
              size={20}
              onPress={() => removeItem(item[0].eformResultDetailGuid)}
            />
          </Card.Actions>
        )}
      />
      <Card.Content>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text
              style={{
                alignSelf: 'flex-start',
                color: 'grey',
                fontWeight: 'bold',
                fontSize: 12,
              }}>
              建立者: {userInfo.fullname}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                alignSelf: 'flex-end',
                color: 'grey',
                fontWeight: 'bold',
                fontSize: 12,
              }}>
              最後更新:{' '}
              {item.length > 0
                ? convertDateString(item[0].updatedTimestamp)
                : ''}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
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

export default FollowScreen;
