import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../context/GlobalContext';
import {getColorByStatus, getDoorFrDB} from '../helper';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomList from '../components/CustomList';
import {List, Searchbar, SegmentedButtons} from 'react-native-paper';

const DoorScreen = ({navigation}) => {
  const {
    activityGuid,
    floor,
    setAAHKDoor,
    eformResultGuid,
    setEformResultGuid,
  } = useContext(GlobalContext);
  const [door, setDoor] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const onChangeSearch = query => setSearchQuery(query);
  const [value, setValue] = React.useState('');

  useEffect(() => {
    getDoorFrDB(activityGuid, floor, setDoor, setFilteredData);
  }, []);

  useEffect(() => {
    //console.log('searchQuery: ', searchQuery.trim());
    let checkStatusArr = ['ISSUE', 'PROGRESS', 'COMPLETED'];
    let tempSearchResult = [];
    if (checkStatusArr.includes(searchQuery.trim())) {
      tempSearchResult = door.filter(ele =>
        ele.status.includes(searchQuery.trim()),
      );
      setValue(searchQuery);
    } else {
      tempSearchResult = door.filter(ele =>
        ele.doorNo.includes(searchQuery.trim()),
      );
    }
    setFilteredData([...tempSearchResult]);
  }, [searchQuery]);

  const routeToScreen = (
    state,
    screen,
    setState,
    eformResultGuid,
    setEformResultGuid,
  ) => {
    setState(state);
    navigation.push(screen);
    setEformResultGuid(eformResultGuid);
  };

  return (
    <>
      <View style={style.container}>
        <SegmentedButtons
          value={value}
          onValueChange={setSearchQuery}
          buttons={[
            {
              value: 'ISSUE',
              label: 'Issue',
            },
            {
              value: 'PROGRESS',
              label: 'In Progress',
            },
            {
              value: 'COMPLETED',
              label: 'Completed',
            },
          ]}
        />
      </View>
      <View style={{paddingLeft: 10,
    paddingRight: 10,paddingBottom: 5}}>
      <Searchbar
          style={style.searchBar}
          elevation="3"
          placeholderTextColor={'grey'}
          placeholder="Search..."
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <ScrollView contentContainerStyle={style.scrollView}>
        {filteredData.map((v, i) => {
          return (
            <CustomList
              leftIconColor={getColorByStatus(v.status)}
              key={i}
              title={v.doorNo}
              description={v.testResult}
              icon={'checkbox-blank-circle'}
              style={style.item}
              onPress={() => {
                routeToScreen(
                  v.doorNo,
                  'CheckList',
                  setAAHKDoor,
                  v.eformResultGuid,
                  setEformResultGuid,
                );
              }}
              rightIcon={prop => (
                <List.Icon {...prop} icon={'arrow-right-thin'} />
              )}
            />
          );
        })}
      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    alignItems: 'center',
  },
  scrollView: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 100,
    alignItems: 'center',
  },
  item: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 10,
    elevation: 8,
    shadowColor: '#52006A',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  searchBar: {
    backgroundColor: 'white',
    marginTop: 10,
  },
});

export default DoorScreen;
