import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
  Image,
  Modal as ReactModal
} from 'react-native';
import { DraggableGrid } from 'react-native-draggable-grid';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Button,
  Text,
  Portal,
  Modal,
  TextInput,
} from 'react-native-paper';
import { photos } from '../sampleTestingData';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import ImageViewer from 'react-native-image-zoom-viewer-fixed';

const TakePhotoScreen = ({ navigation }) => {
  const [photoList, setPhotoList] = useState(photos);
  const [openModel, setOpenModel] = useState(false);
  const [imageGallery, setImageGallery] = useState([]);
  const [openDescModel, setOpenDescModel] = useState(false);
  const [currKey, setCurrKey] = useState('');
  const [currBase64, setCurrBase64] = useState('');
  const containerStyle = { backgroundColor: 'white', padding: 20 };
  const showModal = () => setOpenDescModel(true);
  const hideModal = () => setOpenDescModel(false);

  const deletePhoto = key => {
    reOrderSort(photoList);
    let deepCloneObjs = [...photoList];
    deepCloneObjs = deepCloneObjs.filter(obj => obj.key !== key);
    setPhotoList(deepCloneObjs);
  };

  const viewPhoto = key => {
    let deepCloneObjs = [...photoList];
    let newGalleryList = [];
    for (const obj of deepCloneObjs) {
      if (obj.key === key) {
        newGalleryList.push({ url: obj.base64 });
      }
    }
    for (const obj of deepCloneObjs) {
      if (obj.key !== key) {
        newGalleryList.push({ url: obj.base64 });
      }
    }
    setImageGallery(newGalleryList);
    setOpenModel(true);
    reOrderSort(photoList);
  };

  const editPhoto = (key, base64) => {
    reOrderSort(photoList);
    setCurrBase64(base64);
    setCurrKey(key);
    showModal();
  };

  const changeDescription = text => {
    console.log(text);
    console.log(currKey);
    let index = 0;
    let deepCloneObjs = [...photoList];
    for (const obj of deepCloneObjs) {
      if (obj.key === currKey) {
        deepCloneObjs[index]['desc'] = text;
      }
      index++;
    }
    setPhotoList(deepCloneObjs);
  };

  const takePhoto = async (type) => {
    let deepCloneObjs = [...photoList];
    let options = {
      quality: 1,
      mediaType: 'photo',
      includeBase64: true,
      includeExtra: true,
      saveToPhotos: true,
    };

    // You can also use as a promise without 'callback':
    const result = type === "take" ? await launchCamera(options) : await launchImageLibrary(options);
    deepCloneObjs.push({
      name: result.assets[0].fileName,
      key: uuid.v4(),
      sort: (deepCloneObjs.length + 1).toString(),
      desc: '',
      base64: 'data:image/gif;base64,' + result.assets[0].base64,
    });
    setPhotoList(deepCloneObjs);
  };

  const reOrderSort = objs => {
    let deepCloneObjs = [...objs];
    let count = 1;
    let index = 0;
    deepCloneObjs.forEach(function () {
      deepCloneObjs[index]['sort'] = count;
      index++;
      count++;
    });
    return deepCloneObjs;
  };

  const renderItem = item => {
    return (
      <View style={styles.item} key={item.key}>
        <ImageBackground
          source={{
            uri: item.base64,
          }}
          imageStyle={{ borderRadius: 6 }}
          style={{ height: 104, width: 104 }}>
          <TouchableHighlight onPress={() => deletePhoto(item.key)}>
            <Ionicons style={styles.close} name="ios-close-circle" size={25} />
          </TouchableHighlight>
          <TouchableHighlight onPress={() => viewPhoto(item.key)}>
            <Ionicons style={styles.view} name="eye" size={23} />
          </TouchableHighlight>
          <TouchableHighlight onPress={() => editPhoto(item.key, item.base64)}>
            <Ionicons style={styles.edit} name="pencil" size={22} />
          </TouchableHighlight>
        </ImageBackground>
        <Text variant="bodySmall">{item.desc}</Text>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <ReactModal visible={openModel} transparent={true}>
        <ImageViewer
          renderArrowLeft={() => <Ionicons style={{ marginLeft: 6 }} name="arrow-back-circle-sharp" color="grey" size={30} />}
          renderArrowRight={() => <Ionicons style={{ marginRight: 6 }} name="arrow-forward-circle" color="grey" size={30} />}
          backgroundColor="white"
          enableSwipeDown={true}
          enablePreload={true}
          onCancel={() => {
            setOpenModel(false);
          }}
          imageUrls={imageGallery}
        />
      </ReactModal>
      <Portal>
        <Modal
          visible={openDescModel}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Image
            style={{ width: 200, height: 200, alignSelf: 'center' }}
            source={{
              uri: currBase64,
            }}
          />
          <Text>Please enter the description for this photo.</Text>
          <TextInput
            label="description..."
            right={<TextInput.Icon icon="pencil" />}
            onChangeText={text => changeDescription(text)}
          />
        </Modal>
      </Portal>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button
          style={{ marginBottom: 20, width: '100%' }}
          icon="camera"
          mode="elevated"
          onPress={() => takePhoto("take")}>
          Take Photos
        </Button>
        <Text>    </Text>
        <Button
          style={{ marginBottom: 20, width: '100%' }}
          icon="image-album"
          mode="elevated"
          onPress={() => takePhoto("pick")}>
          Pick Photos
        </Button></View>
      <DraggableGrid
        numColumns={3}
        renderItem={renderItem}
        data={photoList}
        onDragRelease={data => {
          setPhotoList(data); // need reset the props data sort after drag release
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
    position: 'absolute',
    top: -14,
    left: 96,
    width: 25,
    height: 25,
    color: 'tomato',
  },
  view: {
    position: 'absolute',
    top: 86,
    left: 96.5,
    width: 25,
    height: 25,
    color: '#00FF00',
  },
  edit: {
    position: 'absolute',
    top: 86,
    left: 45,
    width: 25,
    height: 25,
    color: '#FFA500',
  },
});

export default TakePhotoScreen;
