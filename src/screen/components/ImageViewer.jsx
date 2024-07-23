import React from 'react';
import {View, Text, Image} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


const ImageViewer = ({route}) => {
  const {image} = route.params;
  return (
    <View>
      <Image source={{uri: image}} style={{width: '100%', height: '100%'}} />
    </View>
  );
};
export default ImageViewer;
