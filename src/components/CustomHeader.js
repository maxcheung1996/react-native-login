import {View, StyleSheet} from 'react-native';
import NetworkBar from './NetworkBar';

export const CustomHeader = (props) => {
  return (
    <>
      <View style={styles.headerStyle}>
        <NetworkBar/>
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
            style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -6}}>
            {props.itemThree}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'white',
    height: 63,
    shadowColor: '#000',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 30,
  },
});
