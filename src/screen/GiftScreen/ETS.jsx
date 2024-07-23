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
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {ADUNIT} from '../../config/adconfig';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useToken} from '../../context/TookenProvider';
import GoogleLoginView from '../components/GoogleLogin';

const ETS = ({navigation}) => {
  const ets_data = useQuery('ets_datad', getEtsdata);
  const {token, gtoken} = useToken();

  const data = useMemo(() => {
    if (ets_data.data) {
      return ets_data?.data?.data;
    }
  }, [ets_data?.data]);

  console.log(ets_data);

  return (
    <View
      style={{
        flex: 1,
      }}>
      {gtoken ? (
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
              allowFontScaling={false}
              style={{
                color: 'white',
                fontSize: wp('4%'),
                fontFamily: 'Inter-Bold',
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
              <AutoHeightImage
                sourceUri={axios.defaults.baseURL + data?.image}
              />
            </View>

            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <BannerAd
                unitId={ADUNIT.bannerunit}
                size={BannerAdSize.LARGE_BANNER}
              />
            </View>
          </ScrollView>

          <FloatingNavigionBottomBar navigation={navigation} screen="home" />
        </ImageBackground>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image source={IMAGE.gift} style={{
            width: wp('30'),
            height:wp('30')
          }} />
          <Text
            style={{
              fontFamily: 'NotoSansMyanmar-Bold',
              color: 'black',
              fontSize: hp(3),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            Signin ဝင်ပြီး ပေါက်ဂဏန်းများ ရယူပါ။
          </Text>
          <View>
            <GoogleLoginView nobound />
          </View>
        </View>
      )}
    </View>
  );
};

export default ETS;
