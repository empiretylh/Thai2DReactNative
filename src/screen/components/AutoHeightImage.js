import React, { useState } from 'react';
import { Image, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const AutoHeightImage = ({ sourceUri, minusHeight=0 }) => {
  const [height, setHeight] = useState(0);

  const handleImageLoaded = (event) => {
    const { width, height: originalHeight } = event.nativeEvent.source;
    const calculatedHeight = (SCREEN_WIDTH * originalHeight) / width;
    setHeight(calculatedHeight);
  };

  return (
    <Image
      source={{ uri: sourceUri }}
      style={{ width: SCREEN_WIDTH, height: height - minusHeight }}
      resizeMode="contain"
      onLoad={handleImageLoaded}
    />
  );
};

export default AutoHeightImage;