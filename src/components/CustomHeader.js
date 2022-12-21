import {Text} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

export const CustomHeader = (props) => {
  return (
    <>
      <View style={styles.headerStyle}>
        {/* <BackArrow navigation={navigation.goBack} style={{ position: 'absolute', left: 30, bottom: 35 }} /> */}
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
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
    height: 50,
    shadowColor: '#000',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 30,
  },
});
