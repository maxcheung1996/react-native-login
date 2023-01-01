import {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../context/GlobalContext';
import {
  checkIfDoorDownloaded,
  convertDateString,
  dlAllActivityDataStart,
  getFloorFrDB,
} from '../helper';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomList from '../components/CustomList';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  ProgressBar,
  Text,
  Button,
  ActivityIndicator,
  MD2Colors,
  IconButton,
  MD3Colors,
} from 'react-native-paper';
import {AuthContext} from '../context/AuthContext';

const FloorScreen = ({navigation}) => {
  const {
    isConnected,
    aahkTray,
    aahkBuilding,
    aahkWorksOrder,
    inspectorList,
    setInspectorList,
    inspector,
    setInspector,
    setActivityGuid,
    setGlobalFloor,
    activityGuid,
  } = useContext(GlobalContext);
  const [floor, setFloor] = useState([]);
  const [open, setOpen] = useState(false);
  const {userInfo} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(-1);
  const [checkDoorList, setCheckDoorList] = useState([]);

  useEffect(() => {
    getFloorFrDB(aahkTray, aahkBuilding, aahkWorksOrder, setFloor).then(
      resp => {
        checkIfDoorDownloaded(resp, activityGuid, setCheckDoorList);
      },
    );
  }, []);

  const routeToScreen = (
    floorState,
    activityState,
    screen,
    setFloorState,
    setActivityState,
  ) => {
    setFloorState(floorState);
    setActivityState(activityState);
    navigation.push(screen);
  };

  const dlAllActivityData = async (activityGuid, floorL, userInfo) => {
    setIsLoading(true);
    setIndex(1000);
    await dlAllActivityDataStart(userInfo, activityGuid, floorL);
    await checkIfDoorDownloaded(floor, activityGuid, setCheckDoorList);
    setIndex(-1);
    setIsLoading(false);
  };

  return (
    <>
      <ActivityIndicator
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: index,
        }}
        animating={isLoading}
        color={MD2Colors.purpleA700}
      />
      <View style={style.dropDownPickerView}>
        <DropDownPicker
          style={style.dropDownPicker}
          searchable={true}
          searchPlaceholder="Search Inspector..."
          itemKey="value"
          mode="BADGE"
          theme="LIGHT"
          open={open}
          autoScroll={true}
          items={inspectorList}
          setOpen={setOpen}
          setItems={setInspectorList}
          value={inspector}
          setValue={setInspector}
          multiple={true}
          placeholder={'Please select a Inspector'}
        />
      </View>

      <ScrollView contentContainerStyle={style.scrollView}>
        {floor.map((v, i) => {
          return (
            <CustomList
              key={i}
              title={() => (
                <>
                  <Text>
                    {v.locationDesc} - {v.completeD_PERCENTAGE}%
                  </Text>
                  <ProgressBar
                    progress={v.completeD_PERCENTAGE / 100}
                    color="lightgreen"
                  />
                </>
              )}
              description={`${convertDateString(
                v.startDatetime,
              )} - ${convertDateString(v.endDatetime)}`}
              icon={'stairs'}
              style={style.item}
              onPress={() => {
                routeToScreen(
                  v.locationDesc,
                  v.activityGuid,
                  'Door',
                  setGlobalFloor,
                  setActivityGuid,
                );
              }}
              rightIcon={prop => (
                <IconButton
                  size={22}
                  iconColor={
                    !isConnected
                      ? 'red'
                      : checkDoorList.includes(v.locationDesc)
                      ? MD3Colors.primary40
                      : MD3Colors.primary80
                  }
                  icon={
                    !isConnected
                      ? 'access-point-network-off'
                      : checkDoorList.includes(v.locationDesc)
                      ? 'reload'
                      : 'cloud-download-outline'
                  }
                  onPress={
                    isConnected
                      ? async () =>
                          await dlAllActivityData(
                            v.activityGuid,
                            v.locationDesc,
                            userInfo,
                          )
                      : () => {}
                  }
                />
              )}
            />
          );
        })}
      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  dropDownPickerView: {
    padding: 10,
    zIndex: 1,
    alignItems: 'center',
  },
  scrollView: {
    padding: 10,
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
  dropDownPicker: {
    elevation: 8,
    shadowColor: '#52006A',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderColor: 'white',
  },
});

export default FloorScreen;
