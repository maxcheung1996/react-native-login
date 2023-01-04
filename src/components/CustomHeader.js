import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NetworkBar from './NetworkBar';

export const CustomHeader = props => {
  return (
    <>
      <SafeAreaView edges={['top']}>
        <View style={styles.headerStyle}>
          <NetworkBar />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              {props.itemOne}
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              {props.itemTwo}
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {props.itemThree}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'white',
    height: 70,
    shadowColor: '#000',
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
    elevation: 30,
  },
});
