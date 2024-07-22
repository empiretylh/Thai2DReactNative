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
import TopBar from './components/TopBar';
import FloatingNavigionBottomBar from './components/FloatingNavigationBottomBar';
import {useQuery} from 'react-query';
import {
  getAdImages,
  getLiveTwoDServerUpdate,
  getTwoDDaliy,
} from '../server/api';
import {IMAGE} from '../config/image';
import {COLOR} from '../config/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {SCREEN} from '../config/screen';
import TopView from './GiftScreen/TopView';
import {ADUNIT} from '../config/adconfig';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
const GiftView = ({navigation}) => {
  const ad_images = useQuery('adimages', getAdImages);

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
        <View style={{flexDirection: 'row', alignItems: 'center'}}></View>

        <TopView ad_images={ad_images} />
        <ScrollView
          style={{
            marginBottom: 80,
          }}
          refreshControl={
            <RefreshControl
              refreshing={ad_images?.isLoading}
              onRefresh={() => {
                ad_images.refetch();
              }}
            />
          }>
          <BannerAd
            unitId={ADUNIT.bannerunit}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          />

          <View
            style={{
              backgroundColor: COLOR.thridColor,
              padding: 10,
              margin: 10,
              borderRadius: 18,
            }}>
            <Text allowFontScaling={false}
              style={{
                color: 'white',
                fontSize: wp('4%'),
                fontFamily: 'Inter-Bold',
              }}>
              တစ်ရက်စာ
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: COLOR.fouthColor,
                borderRadius: 15,
                padding: 10,
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              onPress={() => {
                navigation.navigate('ets');
              }}>
              <Text allowFontScaling={false}
                style={{
                  color: COLOR.primaryColor,
                  fontSize: wp('4%'),
                  fontFamily: 'Inter-Bold',
                }}>
                Estimate Thai Stock
              </Text>
              <Icon name="chevron-forward-outline" size={20} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: COLOR.fouthColor,
                borderRadius: 15,
                padding: 10,
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              onPress={() => {
                navigation.navigate({
                  name: 'gts',
                  params: {
                    giftype: 'oneday',
                  },
                });
              }}>
              <Text allowFontScaling={false}
                style={{
                  color: COLOR.primaryColor,
                  fontSize: wp('4%'),
                  fontFamily: 'Inter-Bold',
                }}>
                တစ်ရက်စာ ရွှေလက်ဆောင်
              </Text>
              <Icon name="chevron-forward-outline" size={20} color={'white'} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: COLOR.thridColor,
              padding: 10,
              margin: 10,
              marginTop: 3,
              borderRadius: 18,
            }}>
            <Text allowFontScaling={false}
              style={{
                color: 'white',
                fontSize: wp('4%'),
                fontFamily: 'Inter-Bold',
              }}>
              တစ်ပတ်စာ
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: COLOR.fouthColor,
                borderRadius: 15,
                padding: 10,
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              onPress={() => {
                navigation.navigate({
                  name: 'gts',
                  params: {
                    giftype: 'oneweek',
                  },
                });
              }}>
              <Text allowFontScaling={false}
                style={{
                  color: COLOR.primaryColor,
                  fontSize: wp('4%'),
                  fontFamily: 'Inter-Bold',
                }}>
                တစ်ပတ်စာလက်ဆောင်
              </Text>
              <Icon name="chevron-forward-outline" size={20} color={'white'} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: COLOR.thridColor,
              padding: 10,
              margin: 10,
              marginTop: 2,
              borderRadius: 18,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: COLOR.fouthColor,
                borderRadius: 15,
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate({
                  name: 'gts',
                  params: {
                    giftype: 'threedgift',
                  },
                });
              }}>
              <View style={{width: 20}} />

              <Text allowFontScaling={false}
                style={{
                  color: COLOR.primaryColor,
                  fontSize: wp('4%'),
                  fontFamily: 'Inter-Bold',
                  textAlign: 'center',
                  flex: 1,
                }}>
                3D ရွှေလက်ဆောင်
              </Text>
              <Icon name="chevron-forward-outline" size={20} color={'white'} />
            </TouchableOpacity>
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

export default GiftView;
