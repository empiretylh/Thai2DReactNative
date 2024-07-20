import React, {useEffect, useMemo} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TopBar from '../components/TopBar';
import FloatingNavigionBottomBar from '../components/FloatingNavigationBottomBar';
import {useQuery} from 'react-query';
import {
  getEtsdata,
  getLiveTwoDServerUpdate,
  getTwoDDaliy,
} from '../../server/api';
import {IMAGE} from '../../config/image';
import {COLOR} from '../../config/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {SCREEN} from '../../config/screen';
import AutoHeightImage from '../components/AutoHeightImage';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { ADUNIT } from '../../config/adconfig';


const ETS = ({navigation}) => {
  const ets_data = useQuery('ets_datad', getEtsdata);

  const data = useMemo(() => {
    if (ets_data.data) {
      return ets_data?.data?.data;
    }
  }, [ets_data?.data]);

  console.log(ets_data)

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ImageBackground
        source={IMAGE.background}
        resizeMode="cover"
        style={{
          flex: 1,
        }}>
        <TopBar
          showOrigin={false}
          customViewStyle={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              padding: 5,
              alignItems: 'center',
            }}>
            <Icon name="arrow-back" size={25} color="#fff" />
          </TouchableOpacity>

          <Text
            style={{
              color: 'white',
              fontSize: 20,
            }}>
            Estimate Thai Stock
          </Text>
        </TopBar>

        <ScrollView
          style={{flex: 1}}
          refreshControl={
            <RefreshControl
              refreshing={ets_data.isLoading}
              onRefresh={() => {
                ets_data?.refetch();
              }}
            />
          }>
          <View style={{marginTop: 10}}>
            <AutoHeightImage sourceUri={axios.defaults.baseURL + data?.image} />
          </View>

          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <BannerAd
              unitId={ADUNIT.bannerunit}
              size={BannerAdSize.LARGE_BANNER}
            />
          </View>
        </ScrollView>

        <FloatingNavigionBottomBar navigation={navigation} screen="home" />
      </ImageBackground>
    </View>
  );
};

export default ETS;
