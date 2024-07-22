import {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLOR} from '../../config/theme';
import {IMAGE} from '../../config/image';
import { InterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import { ADKEYWORD, ADUNIT } from '../../config/adconfig';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const style = StyleSheet.create({
  buttton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});



const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';


const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ADKEYWORD
});


const FloatingNavigionBottomBar = ({
  navigation,
  screen = 'home',
  show = true,
}) => {
  const [active, setActive] = useState('home');

  const position = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setActive(screen);
  }, [screen]);

  useEffect(() => {
    Animated.timing(position, {
      toValue: show ? 0 : 100, // 0 when showing, 100 when hiding
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [show]);

  const LoadAd =()=>{
    interstitial.load();
  }

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.View
        style={[
          {
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            elevation: 5,
            width: '90%',
            borderRadius: 25,
            gap: 4,
            transform: [{translateY: position}],
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={style.buttton}>
          <Image
            source={active === 'home' ? IMAGE.live_active : IMAGE.live_inactive}
            style={[
              {
                width: 30,
                height: 30,
                backgroundColor: active === 'home' ? 'red' : 'white',

                borderColor: active === 'home' ? 'red' : 'black',
                borderWidth: 1,
                padding: 3,
                borderRadius: 50,
              },
            ]}
          />

          <Text allowFontScaling={false}
            style={{
              color: active === 'home' ? COLOR.primaryColor : '#2e4f24',
              textAlign: 'center',
              fontFamily: 'Inter-Bold',
              fontSize : wp('3%')
            }}>
            Live
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('History');
            LoadAd();
          }}
          style={style.buttton}>
          <Image
            source={
              active === 'history' ? IMAGE.twodactive : IMAGE.twodinactive
            }
            style={{width: 30, height: 30}}
          />
          <Text allowFontScaling={false}
            style={{
              color: active === 'history' ? COLOR.primaryColor : '#2e4f24',
              textAlign: 'center',
              fontFamily: 'Inter-Bold',
              fontSize : wp('3%')
            }}>
            2D
          </Text>
        </TouchableOpacity>

        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              width: 90,
              position: 'relative',
              fontSize : wp('3%')
            }}
            onPress={() => {
              navigation.navigate('Gift');
              LoadAd();
            }}>
            <View
              style={{
                position: 'absolute',
              }}>
              <Image source={IMAGE.gift} style={{width: 90, height: 90}} />
              <Text allowFontScaling={false}
                style={{
                  color: active === 'history' ? COLOR.primaryColor : '#2e4f24',
                  textAlign: 'center',
                  fontFamily: 'Inter-Bold',
                  marginTop: -10,
                  fontSize : wp('3%')
                }}>
                Gift
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ThreeD');
            LoadAd();
          }}
          style={style.buttton}>
          <Image
            source={
              active === 'threed' ? IMAGE.threedactive : IMAGE.threedinactive
            }
            style={{width: 30, height: 30}}
          />
          <Text allowFontScaling={false}
            style={{
              color: active === 'threed' ? COLOR.primaryColor : '#2e4f24',
              textAlign: 'center',
              fontFamily: 'Inter-Bold',
              fontSize : wp('3%')
            }}>
            3D
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Feed');
            LoadAd();
          }}
          style={style.buttton}>
          <Icon
            name={active === 'news' ? 'newspaper' : 'newspaper-outline'}
            size={30}
            color={active === 'news' ? COLOR.primaryColor : '#2e4f24'}
          />
          <Text allowFontScaling={false}
            style={{
              color: active === 'news' ? COLOR.primaryColor : '#2e4f24',
              textAlign: 'center',
              fontFamily: 'Inter-Bold',
              fontSize : wp('3%')
            }}>
            Feed
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default FloatingNavigionBottomBar;
