import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground, TouchableHighlight, TouchableOpacity} from 'react-native';
import {DraggableGrid} from 'react-native-draggable-grid';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native-paper'

const TakePhotoScreen = () => {
  const [photoList, setPhotoList] = useState({
    data:[
      {name:'1',key:'one', sort: 1},
      {name:'2',key:'two', sort: 2},
      {name:'3',key:'three', sort: 3},
      {name:'4',key:'four', sort: 4},
      {name:'5',key:'five', sort: 5},
      {name:'6',key:'six', sort: 6},
      {name:'7',key:'seven', sort: 7},
      {name:'8',key:'eight', sort: 8},
      {name:'9',key:'night', sort: 9},
    ],
  });

  const deletePhoto = (key) => {
    alert("delete photo " + key);
    reOrderSort(photoList.data);
  }

  const reOrderSort = (objs) => {
    let deepCloneObjs = [...objs];
    let count = 1;
    let index = 0;
    deepCloneObjs.forEach(function () {
        console.log(deepCloneObjs[index]["sort"]);
        deepCloneObjs[index]["sort"] = count;
        index++;
        count++;
    });
    return deepCloneObjs;
  }

  const renderItem = item => {
    return (
      <View style={styles.item} key={item.key}>
        <TouchableOpacity onPress={() => {alert("view photo")}}>
        <ImageBackground
          source={{
            uri: 'https://picsum.photos/200',
          }}
          imageStyle={{ borderRadius: 6}}
          style={{height: 104, width: 104}}
          onPress={() => {alert("view image")}}
          >
          <TouchableHighlight onPress={() => deletePhoto(item.name)}>
            <Ionicons style={styles.close} name="ios-close-circle" size={25} />
          </TouchableHighlight>
        </ImageBackground></TouchableOpacity>
        <Text variant="bodySmall">Image Description</Text>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <DraggableGrid
        numColumns={3}
        renderItem={renderItem}
        data={photoList.data}
        onDragRelease={data => {
           setPhotoList({data}); // need reset the props data sort after drag release
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 100,
    backgroundColor: 'blue',
  },
  wrapper: {
    paddingTop: 100,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    margin: 0,
    position: "absolute",
    top: -14,
    left: 95,
    width: 25,
    height: 25,
    color: "tomato"
  }
});

export default TakePhotoScreen;
