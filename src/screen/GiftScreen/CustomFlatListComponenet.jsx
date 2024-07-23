import React, {useRef, useEffect} from 'react';
import {FlatList, View, StyleSheet, Animated} from 'react-native';
import {SCREEN} from '../../config/screen';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import { COLOR } from '../../config/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


const CustomFlatListComponent = ({
  data,
  renderItem,
  scrollInterval = 10000,
  onScroll,
}) => {
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  useEffect(() => {
    const interval = setInterval(() => {
      flatListRef.current?.scrollToOffset({
        offset: scrollX._value + SCREEN.width,
        animated: true,
      });
    }, scrollInterval);

    return () => clearInterval(interval);
  }, [scrollInterval, scrollX]);

  const handleViewableItemsChanged = ({viewableItems}) => {
    if (viewableItems.length > 0) {
      const currentIndex = viewableItems[0].index;
      const nextIndex = (currentIndex + 1) % data.length;

      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }, scrollInterval);
    }
  };

  return (
    <View>
     
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={e => {
          Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
            useNativeDriver: false,
          });
        }}
        pagingEnabled
        decelerationRate="normal"
        scrollEventThrottle={16}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={handleViewableItemsChanged}
      />
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomFlatListComponent;
