import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {ActivityIndicator, MD2Colors, List, Button} from 'react-native-paper';
import {GlobalContext} from '../context/GlobalContext';
import CustomList from '../components/CustomList';

const AAHKScreen = ({navigation}) => {
  const {isLoading} = useContext(AuthContext);
  const {setAAHKTray} = useContext(GlobalContext);

  const routeToScreen = (state, screen, setState) => {
    setState(state);
    navigation.push(screen);
  };

  const trayList = [
    {
      title: 'Door',
      icon: 'door',
      category: 'DOOR_INSPECTION',
    },
    {
      title: 'Ceiling',
      icon: 'view-grid-outline',
      category: 'CEILING_INSPECTION',
    },
    {
      title: 'Roof',
      icon: 'home-roof',
      category: 'ROOF_INSPECTION',
    },
    {
      title: 'Fixed Link Bridge',
      icon: 'bridge',
      category: 'FLB_INSPECTION',
    },
    {
      title: 'Floor',
      icon: 'floor-plan',
      category: 'FLOOR_INSPECTION',
    },
    {
      title: 'Children Play Area / TV Lounge',
      icon: 'human-male-female-child',
      category: 'CHILD_INSPECTION',
    },
    {
      title: 'Smoking Lounge',
      icon: 'smoking',
      category: 'SMOKING_INSPECTION',
    },
  ];

  return (
    <>
      <View style={style.container}>
        <ActivityIndicator animating={isLoading} color={MD2Colors.purpleA700} />

        {trayList.map((v, i) => {
          return (
            <CustomList
              key={i}
              title={v.title}
              description={''}
              icon={v.icon}
              style={style.item}
              onPress={() => {
                routeToScreen(v.category, 'Building', setAAHKTray);
              }}
              rightIcon={(prop) => (
                <List.Icon {...prop} icon={"arrow-right-thin"} />
              )}
            />
          );
        })}
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
