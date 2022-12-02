import {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../context/GlobalContext';
import {convertDateString, getFloorFrDB} from '../helper';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomList from '../components/CustomList';
import DropDownPicker from 'react-native-dropdown-picker';
import {ProgressBar, Text, Button} from 'react-native-paper';

const FloorScreen = () => {
  const {
    aahkTray,
    aahkBuilding,
    aahkWorksOrder,
    inspectorList,
    setInspectorList,
    inspector,
    setInspector,
  } = useContext(GlobalContext);
  const [floor, setFloor] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getFloorFrDB(aahkTray, aahkBuilding, aahkWorksOrder, setFloor);
  }, []);

  return (
    <>
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
                    {v.woNo} - {v.locationDesc} - {v.completeD_PERCENTAGE}%
                  </Text>
                  <ProgressBar
                    progress={v.completeD_PERCENTAGE/100}
                    color="lightgreen"
                  />
                </>
              )}
              description={`${convertDateString(
                v.startDatetime,
              )} - ${convertDateString(v.endDatetime)}`}
              icon={'stairs'}
              style={style.item}
              onPress={() => {}}
              rightIcon={prop => (
                <Button
                  icon="cloud-download-outline"
                  {...prop}
                  mode="text"
                  onPress={() => alert('Pressed')}>
                  Download
                </Button>
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
    borderColor: 'white',
  },
});

export default FloorScreen;
