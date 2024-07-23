import React, {useLayoutEffect, useMemo, useRef} from 'react';
import {View, Text, Image, FlatList, Animated, Linking, TouchableOpacity} from 'react-native';
import {COLOR} from '../../config/theme';
import {useQuery} from 'react-query';
import {getAdImages} from '../../server/api';
import {SCREEN} from '../../config/screen';
import axios from 'axios';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import CustomFlatListComponent from './CustomFlatListComponenet';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


width = SCREEN.width;

const TopView = ({ad_images}) => {
  const data = useMemo(() => {
    if (ad_images?.data?.data) {
      return ad_images?.data?.data;
    }
  }, [ad_images?.data]);

  useLayoutEffect(() => {
    ad_images?.refetch();
  }, []);

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const RenderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={()=>{
        Linking.openURL(item?.link)
      }}>
        <Image
          source={{
            uri: axios.defaults.baseURL + item.image,
          }}
          style={{
            width: SCREEN.width,
            height: 200,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        backgroundColor:'white',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
      }}>
     
      <CustomFlatListComponent 
        data={data}
        renderItem={RenderItem}
      
        />
      
    </View>
  );
};

export default TopView;
