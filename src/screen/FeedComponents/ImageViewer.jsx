import React, {useEffect} from 'react';
import {Modal, BackHandler, TouchableOpacity, Alert} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLOR} from '../../config/theme';

export const ModalImageViewer = ({show, setShow, imageUrls}) => {
  return (
    <Modal visible={show} transparent={true}>
      <View
        style={{
          flex: 1,
          position: 'relative',
          backgroundColor: COLOR.fithColor,
        }}>
        <TouchableOpacity
          onPress={() => setShow(false)}
          style={{position: 'absolute', zIndex: 9999, top: 20, right: 23}}>
          <Icon name="close" size={30} color="white" />
        </TouchableOpacity>
        <ImageViewer
          enableImageZoom
          imageUrls={imageUrls}
          
          onCancel={() => {
            setShow(false);
          }
        }
          onSaveToCamera={url => {
            Alert.alert('Save Success', 'Image saved successfully');
            console.log(url);
          }}
        />
      </View>
    </Modal>
  );
};
