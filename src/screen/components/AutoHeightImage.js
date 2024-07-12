import React, {useState} from 'react';
import {Image, Dimensions, ActivityIndicator, View, Text} from 'react-native';
import { SCREEN } from '../../config/screen';

const SCREEN_WIDTH = Dimensions.get('window').width;

const AutoHeightImage = ({sourceUri, minusHeight = 0}) => {
  const [height, setHeight] = useState(0);

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const handleImageLoaded = event => {
    const {width, height: originalHeight} = event.nativeEvent.source;
    const calculatedHeight = (SCREEN_WIDTH * originalHeight) / width;
    setHeight(calculatedHeight);
    setIsImageLoaded(true);
  };

  return (
    <>
      {!isImageLoaded && (
        <View
          style={{
            flex: 1,
            height:SCREEN.height-100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="50" color="#0000ff" />
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            ခဏစောင့်ပါ...
          </Text>
        </View>
      ) }
        <Image
          source={{uri: sourceUri}}
          style={{width: SCREEN_WIDTH, height: height - minusHeight}}
          resizeMode="contain"
          onLoad={handleImageLoaded}
        />
      
    </>
  );
};

export default AutoHeightImage;
