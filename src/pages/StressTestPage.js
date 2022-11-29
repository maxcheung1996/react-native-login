import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {Button, ActivityIndicator, MD2Colors} from 'react-native-paper';
import axios from 'axios';
import {realmCreate, realmDelete} from '../database/service/crud';
import {EformResultSubDetails} from '../database/schema/EformResultSubDetails';
import { AahkActivityDetail } from '../database/schema/AahkActivityDetail';
import { EformResultGlobal } from '../database/schema/EformResultGlobal';
import { EformResultDetail } from '../database/schema/EformResultDetail';
import { EformPhotoDetail } from '../database/schema/EformPhotoDetail';
import { getLocalTimeStamp } from '../helper';

const StressTestPage = () => {
  const {userInfo, isLoading} = useContext(AuthContext);
  const [downloadStartTimeStr, setDownloadStartTimeStr] = useState(null);
  const [downloadEndTimeStr, setDownloadEndTimeStr] = useState(null);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);

  const download40Sub = async userInfo => {

    setIsDownloadLoading(true);
    let start_time = getLocalTimeStamp();
  
    let obj;
    
    //EformResultSubDetail
    await axios
      .get(
        `https://dev.socam.com/aahkapi/api/EformResultSubDetail?iniid=C72603A6-2891-4BEE-987F-D18A3DEF52E5&floor=L4`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      )
      .then(res => {
        obj = res.data;
      })
      .catch(error => {
        console.log(`download40Sub fail: ${error}`);
      });
  
    await realmDelete(EformResultSubDetails, 'EformResultSubDetails');
    await realmCreate(EformResultSubDetails, 'EformResultSubDetails', obj);
  
    //Door
    await axios
      .get(
        `https://dev.socam.com/aahkapi/api/AahkActivityDetail?iniid=C72603A6-2891-4BEE-987F-D18A3DEF52E5&floor=L4`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      )
      .then(res => {
        obj = res.data;
      })
      .catch(error => {
        console.log(`download40Sub fail: ${error}`);
      });
  
    await realmDelete(AahkActivityDetail, 'AahkActivityDetail');
    await realmCreate(AahkActivityDetail, 'AahkActivityDetail', obj);
  
    //Gobal
    await axios
      .get(
        `https://dev.socam.com/aahkapi/api/EformResultGlobal?iniid=C72603A6-2891-4BEE-987F-D18A3DEF52E5&floor=L4`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      )
      .then(res => {
        obj = res.data;
      })
      .catch(error => {
        console.log(`download40Sub fail: ${error}`);
      });
  
    await realmDelete(EformResultGlobal, 'EformResultGlobal');
    await realmCreate(EformResultGlobal, 'EformResultGlobal', obj);
  
  
    //EformResultDetail
    await axios
      .get(
        `https://dev.socam.com/aahkapi/api/EformResultDetail?iniid=C72603A6-2891-4BEE-987F-D18A3DEF52E5&floor=L4`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      )
      .then(res => {
        obj = res.data;
      })
      .catch(error => {
        console.log(`download40Sub fail: ${error}`);
      });
  
    await realmDelete(EformResultDetail, 'EformResultDetail');
    await realmCreate(EformResultDetail, 'EformResultDetail', obj);
    
  
    //EformPhotoDetail
    await axios
      .get(
        `https://dev.socam.com/aahkapi/api/EformPhotoDetail/getphotodtl?iniid=C72603A6-2891-4BEE-987F-D18A3DEF52E5&floor=L4`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      )
      .then(res => {
        obj = res.data;
      })
      .catch(error => {
        console.log(`download40Sub fail: ${error}`);
      });
  
    await realmDelete(EformPhotoDetail, 'EformPhotoDetail');
    await realmCreate(EformPhotoDetail, 'EformPhotoDetail', obj);
  
    let end_time = getLocalTimeStamp();
  
    setDownloadStartTimeStr(start_time);
    setDownloadEndTimeStr(end_time);
    setIsDownloadLoading(false);
    console.log(`${start_time} - ${end_time}`);
  };

  return (
    <View style={style.container}>
      <ImageBackground
        source={require('../images/app_bg.jpg')}
        resizeMode="cover"
        style={style.image}>
        <ActivityIndicator animating={isDownloadLoading} color={MD2Colors.purpleA700} />
        <ActivityIndicator animating={isLoading} color={MD2Colors.purpleA700} />
        <Text style={style.welcome}>Welcome {userInfo.fullname}</Text>
        <Text>This is Stress Test Screen.</Text>
        <Text>Download Time: {downloadStartTimeStr} - {downloadEndTimeStr}</Text>
        <Button
          disabled={isLoading}
          style={{marginTop: 20}}
          icon="download"
          mode="elevated"
          onPress={() => {
            download40Sub(userInfo);
          }}>
          Stress Test 40
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
  },
});

export default StressTestPage;
