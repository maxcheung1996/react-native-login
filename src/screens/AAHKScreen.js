import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {ActivityIndicator, MD2Colors, List} from 'react-native-paper';
import {GlobalContext} from '../context/GlobalContext';

const AAHKScreen = ({navigation}) => {
  const {isLoading} = useContext(AuthContext);
  const {setAAHKTray} = useContext(GlobalContext);

  const routeToScreen = DOOR_INSPECTION => {
    setAAHKTray(DOOR_INSPECTION);
    navigation.push('Building');
  };

  return (
    <>
      <View style={style.container}>
        <ActivityIndicator animating={isLoading} color={MD2Colors.purpleA700} />
        <List.Item
          title="Door"
          left={props => <List.Icon {...props} icon="door" />}
          right={props => <List.Icon {...props} icon="arrow-right-thin" />}
          onPress={() => {routeToScreen('DOOR_INSPECTION')}}
          style={style.item}
          titleStyle={{}}
          descriptionStyle={{}}
          titleEllipsizeMode="clip"
          descriptionEllipsizeMode="tail"
        />
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 10,
    elevation: 10,
    shadowColor: '#52006A',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  card: {},
});

export default AAHKScreen;
