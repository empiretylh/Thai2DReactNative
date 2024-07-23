import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TopBar from './components/TopBar';
import FloatingNavigionBottomBar from './components/FloatingNavigationBottomBar';
import {useQuery} from 'react-query';
import {getThreeDhistory, getTwoDDaliy} from '../server/api';
import {IMAGE} from '../config/image';
import {COLOR} from '../config/theme';
import {useLoadData} from '../context/LoadDataProvider';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';



const ThreeDView = ({navigation}) => {
  const {threedDataHistory: twodData} = useLoadData();

  const Data = useMemo(() => {
    if (twodData?.data) {
      return twodData?.data?.data;
    }
    return null;
  }, [twodData?.data]);

  const TwoDResultItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={{
          backgroundColor:
            index % 2 === 0 ? COLOR.secondaryColor : COLOR.thridColor,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 5,
          borderRadius: 20,
          padding: 10,
        }}>
        <View>
          <Text allowFontScaling={false}
            style={{
              color: COLOR.fithColor,
              fontSize: 19,
              fontFamily: 'Inter-Regular',
            }}>
            Date
          </Text>
          <Text allowFontScaling={false}
            style={{
              color: COLOR.fithColor,
              fontFamily: 'Inter-Bold',
              fontSize: 19,
            }}>
            {item.datetime}
          </Text>
        </View>

        <View>
          <Text allowFontScaling={false}
            style={{
              color: COLOR.fithColor,
              fontFamily: 'Inter-Bold',
              textAlign: 'center',

              fontSize: 35,
            }}>
            {item.result}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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
              fontSize: wp('4%'),
              color: 'white',
              textAlign: 'center',
            }}>
            3D History
          </Text>
        </TopBar>

        <ScrollView
          style={{
            flex: 1,
            padding: 10,
            marginBottom: 80,
          }}>
          {Data?.data?.map((item, index) => (
            <>
              <TwoDResultItem key={index} item={item} index={index} />
            </>
          ))}
        </ScrollView>

        <FloatingNavigionBottomBar navigation={navigation} screen="threed" />
      </ImageBackground>
    </View>
  );
};

export default ThreeDView;
