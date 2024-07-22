import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TopBar from './components/TopBar';
import FloatingNavigionBottomBar from './components/FloatingNavigationBottomBar';
import {useQuery} from 'react-query';
import {getThreeDhistory, getTwoDDaliy, getTwoDHistory} from '../server/api';
import {IMAGE} from '../config/image';
import {COLOR} from '../config/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { useLoadData } from '../context/LoadDataProvider';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { ADUNIT } from '../config/adconfig';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';



const NumberDisplaySet = ({number = 0}) => {
  const numberString = number.toString();
  const mainPart = numberString.slice(0, -1); // All except last character
  const lastDigit = numberString.slice(-1); // Last character

  return (
    <Text allowFontScaling={false}
      style={{
        fontFamily: 'Inter-Bold',
        letterSpacing: 0.5,
        fontSize: wp('4%'),
        color: 'black',
      }}>
      <Text allowFontScaling={false}>Set: </Text>
      <Text allowFontScaling={false} style={{color: 'black'}}>{mainPart}</Text>
      <Text allowFontScaling={false} style={{color: '#f21b13', fontSize: 20, fontFamily: 'Inter-Bold'}}>
        {lastDigit}
      </Text>
    </Text>
  );
};

const NumberDisplayVal = ({number = 0}) => {
  const numberString = number.toString();
  const firstindex = numberString.lastIndexOf('.');
  const selectPart = numberString.slice(firstindex - 1, firstindex);
  const firstPart = numberString.slice(0, firstindex - 1);
  const thridPart = numberString.slice(firstindex, numberString.length);

  console.log(firstindex);
  console.log(selectPart);

  return (
    <Text allowFontScaling={false}
      style={{
        fontFamily: 'Inter-Bold',
        fontSize: wp('4%'),
        color: 'black',
      }}>
      <Text allowFontScaling={false}>Value : </Text>
      <Text allowFontScaling={false} style={{color: '#000'}}>{firstPart}</Text>
      <Text allowFontScaling={false} style={{color: '#f21b13', fontFamily: 'Inter-Bold'}}>{selectPart}</Text>
      <Text allowFontScaling={false} style={{color: '#000'}}>{thridPart} </Text>
    </Text>
  );
};
const TwoDResultView = ({result = []}) => {
  const twelevePm = result && result?.find(item => item.time == '12:01:00');
  const fourPm = result && result?.find(item => item.time == '16:30:00');

  console.log('hello result', result);
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: COLOR.secondaryColor,
          marginTop: 10,
          borderRadius: 15,
        }}>
        <View
          style={{
            padding: 5,
            padding: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'column', gap: 2}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Icon name="partly-sunny" size={30} color={COLOR.fithColor} />
              <Text allowFontScaling={false}
                style={{
                  fontSize: 20,
                  color: COLOR.fithColor,
                  fontFamily: 'Inter-Bold',
                }}>
                12:01 PM
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <NumberDisplaySet number={twelevePm?.set} />
              <NumberDisplayVal number={twelevePm?.value} />
            </View>
          </View>
          <Text allowFontScaling={false}
            style={{
              fontSize: 50,
              fontFamily: 'Inter-Bold',
              color: COLOR.fithColor,
              letterSpacing: 2,
            }}>
            {twelevePm?.twod}
          </Text>
        </View>
        <View
          style={{backgroundColor: COLOR.fithColor, height: 1, width: '100%'}}
        />
        <View
          style={{
            padding: 5,
            padding: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'column', gap: 2}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Icon name="moon" size={30} color={COLOR.fithColor} />
              <Text allowFontScaling={false}
                style={{
                  fontSize: 20,
                  color: COLOR.fithColor,
                  fontFamily: 'Inter-Bold',
                }}>
                4:30 PM
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <NumberDisplaySet number={fourPm?.set} />
              <NumberDisplayVal number={fourPm?.value} />
            </View>
          </View>
          <Text allowFontScaling={false}
            style={{
              fontSize: 50,
              fontFamily: 'Inter-Bold',
              color: COLOR.fithColor,
              letterSpacing: 2,
            }}>
            {fourPm?.twod}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const History = ({navigation}) => {
  const {twodDataHistory:twodData} = useLoadData();

  const Data = useMemo(() => {
    if (twodData?.data) {
      let data2:Array = twodData?.data?.data;
      let d = data2.slice(0, 10)

      return d
    }
    return null;
  }, [twodData?.data]);

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
        <TopBar navigation={navigation}>
          <Text allowFontScaling={false}
            style={{
              fontFamily: 'Inter-Bold',
              fontSize: 20,
              color: 'white',
              textAlign: 'center',
            }}>
            2D History
          </Text>
        </TopBar>
            <BannerAd unitId={ADUNIT.bannerunit} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
        <ScrollView
          style={{
            flex: 1,
            padding: 10,
            marginBottom: 100,
          }}
          refreshControl={
            <RefreshControl
              refreshing={twodData.isFetching}
              onRefresh={() => twodData.refetch()}
            />
          }>
          {twodData.isLoading && (
            <ActivityIndicator size="large" color={COLOR.primaryColor} />
          )}
          {Data?.map((item, index) => (
            <View style={{alignItems: 'center'}} key={index}>
              <Text allowFontScaling={false}
                style={{
                  fontSize: wp('4%'),
                  textAlign: 'center',
                  color: COLOR.primaryColor,
                  fontFamily: 'Inter-Bold',
                  borderBottomColor: COLOR.secondaryColor,
                  padding: 10,
                  borderBottomWidth: 1,
                  marginTop: 10,
                }}>
                {new Date(item.date).toDateString()}
              </Text>

              <TwoDResultView result={item.child} />
              <View
                style={{
                  height: 2,
                  backgroundColor: COLOR.thridColor,
                  width: '100%',
                  marginTop: 10,
                }}
              />
            </View>
          ))}
        </ScrollView>

        <FloatingNavigionBottomBar navigation={navigation} screen="history" />
      </ImageBackground>
    </View>
  );
};

export default History;
