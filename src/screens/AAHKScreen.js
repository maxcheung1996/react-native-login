import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {
  ActivityIndicator,
  MD2Colors,
  List,
  Avatar,
  Button,
} from 'react-native-paper';
import {GlobalContext} from '../context/GlobalContext';
import CustomList from '../components/CustomList';
import {ScrollView} from 'react-native-gesture-handler';

import {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  FlatList,
} from 'react-native';
import {ColorSpace} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AAHKScreen = ({navigation}) => {
  // const {isLoading} = useContext(AuthContext);
  const {setAAHKTray, setAAhkTrayName} = useContext(GlobalContext);
  const routeToScreen = (
    state,
    screen,
    setState,
    aahkTrayName,
    setAAhkTrayName,
  ) => {
    setState(state);
    setAAhkTrayName(aahkTrayName);
    navigation.push(screen);
  };

  const trayList = [
    {
      id: 1,
      color: '#FF4500',
      name: 'Door',
      title: 'Door',
      icon: 'door',
      category: 'DOOR_INSPECTION',
      tags: ['tag 1', 'tag 2', 'tag 3'],
    },
    {
      id: 2,
      color: '#87CEEB',
      name: 'Ceiling',
      title: 'Ceiling',
      icon: 'view-grid-outline',
      category: 'CEILING_INSPECTION',
      tags: ['tag 1', 'tag 2', 'tag 3'],
    },
    {
      id: 3,
      color: '#4682B4',
      name: 'Roof',
      title: 'Roof',
      icon: 'home-roof',
      category: 'ROOF_INSPECTION',
      tags: ['tag 1', 'tag 2', 'tag 3'],
    },
    {
      id: 4,
      color: '#6A5ACD',
      name: 'Fixed Link Bridge',
      title: 'Fixed Link Bridge',
      icon: 'bridge',
      category: 'FLB_INSPECTION',
      tags: ['tag 1', 'tag 2', 'tag 3'],
    },
    {
      id: 5,
      color: '#FF69B4',
      name: 'Floor',
      title: 'Floor',
      icon: 'floor-plan',
      category: 'FLOOR_INSPECTION',
      tags: ['tag 1', 'tag 2', 'tag 3'],
    },
    {
      id: 6,
      color: '#00BFFF',
      name: 'Children Play Area / TV Lounge',
      title: 'Children Play Area / TV Lounge',
      icon: 'human-male-female-child',
      category: 'CHILD_INSPECTION',
      tags: ['tag 1', 'tag 2', 'tag 3'],
    },
    {
      id: 7,
      color: '#00FFFF',
      name: 'Smoking Lounge',
      title: 'Smoking Lounge',
      icon: 'smoking',
      category: 'SMOKING_INSPECTION',
      tags: ['tag 1', 'tag 2', 'tag 3'],
    },
  ];

  const cardClickEventListener = item => {
    routeToScreen(
      item.category,
      'Building',
      setAAHKTray,
      item.title,
      setAAhkTrayName,
    );
  };

  const tagClickEventListener = tagName => {
    Alert.alert(tagName);
  };

  const renderTags = item => {
    return item.tags.map((tag, key) => {
      return (
        <TouchableOpacity
          key={key}
          style={styles.btnColor}
          onPress={() => {
            tagClickEventListener(tag);
          }}>
          <Text>{tag}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    // <>
    //   <ScrollView contentContainerStyle={style.scrollViewContainer}>
    //     <ActivityIndicator animating={isLoading} color={MD2Colors.purpleA700} />
    //     {trayList.map((v, i) => {
    //       return (
    //         <CustomList
    //           key={i}
    //           title={v.title}
    //           description={''}
    //           icon={v.icon}
    //           style={style.item}
    //           onPress={() => {
    //             routeToScreen(
    //               v.category,
    //               'Building',
    //               setAAHKTray,
    //               v.title,
    //               setAAhkTrayName,
    //             );
    //           }}
    //           rightIcon={prop => (
    //             <List.Icon {...prop} icon={'arrow-right-thin'} />
    //           )}
    //         />
    //       );
    //     })}
    //   </ScrollView>
    // </>
    <>
      <View style={styles.container}>
        {/* <ActivityIndicator animating={isLoading} color={MD2Colors.purpleA700} /> */}
        <FlatList
          contentContainerStyle={{paddingBottom: 100}}
          style={styles.notificationList}
          data={trayList}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={[styles.card, {borderColor: item.color}]}
                onPress={() => {
                  cardClickEventListener(item);
                }}>
                <View style={styles.cardContent}>
                  {/* <Image style={[styles.image, styles.imageContent]} source={{uri: item.icon}} /> */}
                  <Avatar.Icon
                    size={24}
                    style={{backgroundColor: item.color}}
                    icon={item.icon}
                    color={'white'}
                  />
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                <View style={[styles.cardContent, styles.tagsContent]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    {renderTags(item)}
                  </View>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    {/* <Text style={{alignSelf: 'flex-end'}}>arrow</Text> */}
                    <Button
                      style={{alignSelf: 'flex-end'}}
                      onPress={() => {
                        cardClickEventListener(item);
                      }}
                      icon={() => (
                        <Ionicons
                          name="arrow-forward-circle-outline"
                          size={22}
                        />
                      )}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </>
  );
};

const style = StyleSheet.create({
  scrollViewContainer: {
    padding: 10,
    alignItems: 'center',
  },
  item: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 10,
    elevation: 8,
    shadowColor: '#52006A',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  formContent: {
    flexDirection: 'row',
    marginTop: 30,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  card: {
    height: null,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderTopWidth: 5,
    marginBottom: 20,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  imageContent: {
    marginTop: -40,
  },
  tagsContent: {
    marginTop: 10,
    flexWrap: 'wrap',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
    alignSelf: 'center',
  },
  btnColor: {
    padding: 6,
    borderRadius: 12,
    marginHorizontal: 3,
    backgroundColor: '#eee',
  },
});

export default AAHKScreen;
