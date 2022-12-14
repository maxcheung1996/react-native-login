import React, {useContext} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {Button, ActivityIndicator, MD2Colors} from 'react-native-paper';
import { GlobalContext } from '../context/GlobalContext';
import DropDownPicker from 'react-native-dropdown-picker';
import {useState} from 'react';

const SettingScreen = () => {
  const {userInfo, isLoading, logout} = useContext(AuthContext);
  const {contractNo, setContractNo} = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [contract, setContract] = useState('');
  const [contractList, setContractList] = useState([
    {label: 'T20M102', value: 'T20M102'},
    {label: 'TM12341', value: 'TM12346'},
    {label: 'GM22332', value: 'GM22337'},
    {label: 'KL92353', value: 'KL92358'},
    {label: 'VP94134', value: 'VP94139'},
    {label: 'DF09425', value: 'DF09421'},
  ]);

  return (
    <View style={style.container}>
      <ImageBackground
        source={require('../images/app_bg.jpg')}
        resizeMode="cover"
        style={style.image}>
        <ActivityIndicator animating={isLoading} color={MD2Colors.purpleA700} />
        <Text style={style.welcome}>Welcome {userInfo.fullname}</Text>
        <Text>This is Setting Screen.</Text>
        <DropDownPicker
          //style={style.dropDownPicker}
          style={{marginTop: 20}}
          searchable={true}
          searchPlaceholder="Search Contract..."
          itemKey="value"
          mode="BADGE"
          theme="LIGHT"
          open={open}
          autoScroll={true}
          items={contractList}
          setOpen={setOpen}
          setItems={setContractList}
          value={contractNo}
          setValue={setContractNo}
          multiple={false}
          placeholder={'Select a Contract'}
        />
        <Button
          disabled={isLoading}
          style={{marginTop: 20}}
          icon="logout"
          mode="elevated"
          onPress={() => {
            logout();
          }}>
          Logout
        </Button>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default SettingScreen;
