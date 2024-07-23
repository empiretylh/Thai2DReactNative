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
import {useLoadData} from '../context/LoadDataProvider';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {ADUNIT} from '../config/adconfig';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const AboutUs = ({navigation}) => {
  const {twodDataHistory: twodData} = useLoadData();

  const Data = useMemo(() => {
    if (twodData?.data) {
      let data2: Array = twodData?.data?.data;
      let d = data2.slice(0, 10);

      return d;
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
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: 'Inter-Bold',
              fontSize: wp('4%'),
              color: 'white',
              textAlign: 'center',
            }}>
            About Us
          </Text>
        </TopBar>
        {/* <BannerAd
          unitId={ADUNIT.bannerunit}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        /> */}
        <ScrollView
          style={{
            flex: 1,
            padding: 10,
            marginBottom: 100,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 15,
            }}>
            <View
              style={{
                padding: 10,
                backgroundColor: COLOR.primaryColor,
              }}>
              <Image
                source={IMAGE.logo}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: 'contain',
                  alignSelf: 'center',
                }}
              />
            </View>
            <Text
              allowFontScaling={false}
              style={{
                color: 'black',
                fontSize: wp('4%'),
                fontFamily: 'Inter-Regular',
              }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: 'Inter-Bold',
                }}>
                About Us {'\n'}
              </Text>
              Welcome to 2D MM VIP, where innovation meets simplicity. Our
              mission is to revolutionize the way you manage and enjoy 2D
              multimedia content. With a passion for technology and a commitment
              to excellence, we strive to provide a seamless and intuitive user
              experience.
              {'\n\n'}
              At 2D MM VIP, we believe in the power of creativity and
              efficiency. Our team of dedicated developers and designers works
              tirelessly to bring you the best features and updates, ensuring
              our app evolves with your needs. We prioritize user feedback and
              continuously seek to improve and innovate, making 2D MM VIP not
              just an app, but a reliable companion in your daily life.
              {'\n\n'}
              Join us on this exciting journey and discover how 2D MM VIP can
              transform the way you create, edit, and enjoy 2D multimedia
              content. Whether you're a professional designer, an enthusiastic
              artist, or someone who simply loves engaging with 2D media, 2D MM
              VIP is designed to meet your needs.
              {'\n\n'}
              Thank you for choosing 2D MM VIP. We're here to make your
              experience extraordinary.
            </Text>
          </View>
        </ScrollView>

        <FloatingNavigionBottomBar navigation={navigation} screen="profile" />
      </ImageBackground>
    </View>
  );
};

export default AboutUs;
