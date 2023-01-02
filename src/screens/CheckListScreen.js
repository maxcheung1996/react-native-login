import {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../context/GlobalContext';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {FAB, Text, TextInput, List} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {EformResultGlobal} from '../database/schema/EformResultGlobal';
import {EformResultDetail} from '../database/schema/EformResultDetail';
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
  const [checkListGlobal, setCheckListGlobal] = useState([]);
  const [checkListDetail, setCheckListDetail] = useState([]);
  const routeToScreen = (screen) => {
    navigation.push(screen);
  };
  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    getCheckListFrDBByEFormGuid(eformResultGuid);
  }, []);

  const checkListTest = ['firstName', 'lastName', 'number'];

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
          `eformResultGuid == '${eformResultGuid}'`
      );

      setCheckListDetail(checkListDetail);

      // realm.close();
      //return checkListGlobal;
    } catch (error) {
      console.log('getDoorFrDB error: ', error);
      setCheckListGlobal(checkListGlobal);
      setCheckListDetail(checkListDetail);
      //return checkListGlobal;
    }
  };

  let currSection = '';
  let sectionArr = [];

  return (
    <View style={style.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
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
        {checkListDetail.map((v, i) => {
          
          
          if(v.sectionGroupId !== "G00"){           
            if(v.formType1 === "SECTION") {
              console.log("==:", v.header1)
              //console.log(sectionArr)
                // if(sectionArr.length > 0){
                //   return(
                //   sectionArr.map((z, zi) => {
                //     //console.log(z)
                //     return(
                //     <Text key={zi}>{z.header1}</Text>
                //     )
                //   })
                //   )
                // }
                sectionArr = [];
                currSection = v.header1; 
                console.log("push:", v.header1);
                sectionArr.push(v)                      
            } else{
              
              if(currSection === v.sectionTitle){
                sectionArr.push(v)
              } 
            }           
          }

          // return(
          //   <Text key={i}>{v.header1} {v.formType1} {v.sectionGroupId} {v.sectionTitle}</Text>
          // )
        })}
        {/* <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion> */}
      </ScrollView>
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
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    
  },
  fabStyle: {
    bottom: 45,
    right: 0,
    position: 'absolute',
  },
});

export default CheckListScreen;
