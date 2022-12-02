import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {Button, ActivityIndicator, MD2Colors} from 'react-native-paper';

import {dlAllActivityDataStart, getLocalTimeStamp} from '../helper';

const StressTestScreen = () => {
  const {userInfo, isLoading} = useContext(AuthContext);
  const [downloadStartTimeStr, setDownloadStartTimeStr] = useState(null);
  const [downloadEndTimeStr, setDownloadEndTimeStr] = useState(null);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);

  const dlActivityDataByGuidWithFloor = async (
    userInfo,
    activityGuid,
    floor,
  ) => {
    setIsDownloadLoading(true);

    let start_time = getLocalTimeStamp();
    await dlAllActivityDataStart(userInfo, activityGuid, floor);
    let end_time = getLocalTimeStamp();

    setDownloadStartTimeStr(start_time);
    setDownloadEndTimeStr(end_time);
    setIsDownloadLoading(false);
    console.log(`Download Time: ${start_time} - ${end_time}`);
  };

  return (
    <View style={style.container}>
      <ImageBackground
        source={require('../images/app_bg.jpg')}
        resizeMode="cover"
        style={style.image}>
        <ActivityIndicator
          animating={isDownloadLoading}
          color={MD2Colors.purpleA700}
        />
        <ActivityIndicator animating={isLoading} color={MD2Colors.purpleA700} />
        <Text style={style.welcome}>Welcome {userInfo.fullname}</Text>
        <Text>This is Stress Test Screen.</Text>
        <Text>
          Download Time: {downloadStartTimeStr} - {downloadEndTimeStr}
        </Text>
        <Button
          disabled={isLoading}
          style={{marginTop: 20}}
          icon="download"
          mode="elevated"
          onPress={() => {
            dlActivityDataByGuidWithFloor(
              userInfo,
              'c72603a6-2891-4bee-987f-d18a3def52e5',
              'L4',
            );
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

export default StressTestScreen;
