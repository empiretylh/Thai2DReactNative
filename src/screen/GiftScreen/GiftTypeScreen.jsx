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
  getGiftImage,
  getLiveTwoDServerUpdate,
  getTwoDDaliy,
} from '../../server/api';
import {IMAGE} from '../../config/image';
import {COLOR} from '../../config/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {SCREEN} from '../../config/screen';
import AutoHeightImage from '../components/AutoHeightImage';
import {ADUNIT} from '../../config/adconfig';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useToken} from '../../context/TookenProvider';
import GoogleLoginView from '../components/GoogleLogin';

const GiftTypeScreen = ({navigation, route}) => {
  const {giftype} = route.params;
  const ets_data = useQuery(
    ['gift_type_img', giftype || 'oneday'],
    getGiftImage,
  );
  const {token, gtoken} = useToken();
  const data = useMemo(() => {
    if (ets_data.data) {
      return ets_data?.data?.data;
    }
  }, [ets_data?.data]);

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
              allowFontScaling={false}
              style={{
                color: 'white',
                fontSize: wp('4%'),
                fontFamily: 'Inter-Bold',
              }}>
              {giftype == 'oneday'
                ? 'တစ်ရက်စာ ရွှေလက်ဆောင်'
                : giftype == 'oneweek'
                ? 'တစ်ပတ်စာ ရွှေလက်ဆောင်'
                : '3D ရွှေလက်ဆောင်'}
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
                minusHeight={80}
              />

              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <BannerAd
                  unitId={ADUNIT.bannerunit}
                  size={BannerAdSize.LARGE_BANNER}
                />
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      {/* ) : (
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
      )} */}
    </View>
  );
};

export default GiftTypeScreen;
