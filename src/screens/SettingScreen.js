import React, {useContext} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {Button, ActivityIndicator, MD2Colors} from 'react-native-paper';
import {GlobalContext} from '../context/GlobalContext';
import DropDownPicker from 'react-native-dropdown-picker';
import {useState} from 'react';

const SettingScreen = () => {
  const {userInfo, isLoading, logout} = useContext(AuthContext);
  const {contractNo, setContractNo, lang, setLang} = useContext(GlobalContext);
  const [openContract, setOpenContract] = useState(false);
  const [contractList, setContractList] = useState([
    {label: 'T20M102', value: 'T20M102'},
    {label: 'TM12341', value: 'TM12346'},
    {label: 'GM22332', value: 'GM22337'},
    {label: 'KL92353', value: 'KL92358'},
    {label: 'VP94134', value: 'VP94139'},
    {label: 'DF09425', value: 'DF09421'},
  ]);
  const [openLang, setOpenLang] = useState(false);
  const [langList, setLangList] = useState([
    {label: 'EN', value: 'en'},
    {label: '繁', value: 'zh'}
  ]);

  return (
    <View style={style.container}>
      <ImageBackground
        source={require('../images/app_bg.jpg')}
        resizeMode="cover"
        style={style.image}>
        <ActivityIndicator animating={isLoading} color={MD2Colors.purpleA700} />
        <Text style={style.welcome}>{lang == 'en' ? "Welcome " : lang == 'zh' ? "歡迎" : "Welcome "}{userInfo.fullname}</Text>
        <View>
          <Text style={style.welcome}>{lang == 'en' ? "Contract:" : lang == 'zh' ? "合約: " : "Contract:"}</Text>
          <DropDownPicker
            containerStyle={{width: '70%', zIndex: 100}}
            //style={style.dropDownPicker}
            searchable={true}
            searchPlaceholder="Search Contract..."
            itemKey="value"
            mode="BADGE"
            theme="LIGHT"
            open={openContract}
            autoScroll={true}
            items={contractList}
            setOpen={setOpenContract}
            setItems={setContractList}
            value={contractNo}
            setValue={setContractNo}
            multiple={false}
            placeholder={'Select a Contract'}
          />
        </View>
        <View>
          <Text style={style.welcome}>{lang == 'en' ? "Language:" : lang == 'zh' ? "語言: " : "Language:"}</Text>
          <DropDownPicker
            containerStyle={{width: '70%', zIndex: 99}}
            //style={style.dropDownPicker}
            searchable={true}
            searchPlaceholder="Search Lang..."
            itemKey="value"
            mode="BADGE"
            theme="LIGHT"
            open={openLang}
            autoScroll={true}
            items={langList}
            setOpen={setOpenLang}
            setItems={setLangList}
            value={lang}
            setValue={setLang}
            multiple={false}
            placeholder={'Select a Lang'}
          />
        </View>
        {userInfo.token ? (
          <Button
            disabled={isLoading}
            style={{marginTop: 20}}
            icon="logout"
            mode="elevated"
            onPress={() => {
              logout();
            }}>
            {lang == 'en' ? "Logout:" : lang == 'zh' ? "登出" : "Logout:"}
          </Button>
        ) : (
          ''
        )}
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
