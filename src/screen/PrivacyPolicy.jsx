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
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


const PrivacyPolicy = ({navigation}) => {
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
          <Text allowFontScaling={false}
            style={{
              fontFamily: 'Inter-Bold',
              fontSize: wp('4%'),
              color: 'white',
              textAlign: 'center',
            }}>
            Privacy Policy
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
            <Text allowFontScaling={false}
              style={{
                color: 'black',
                fontSize: wp('4%'),
                fontFamily: 'Inter-Regular',
              }}>
              <Text allowFontScaling={false}
                style={{
                  fontFamily: 'Inter-Bold',
                }}>
                Privacy Policy {'\n'}
              </Text>
              This privacy policy applies to the 2D MM VIP app (hereby referred
              to as "Application") for mobile devices that was created by Thura
              Lin Htut (hereby referred to as "Service Provider") as a Free
              service. This service is intended for use "AS IS".
              {'\n\n'}
              Information Collection and Use The Application collects
              information when you download and use it. This information may
              include information such as {'\n'}
              Your device's Internet Protocol address (e.g. IP address) The
              pages of the Application that you visit, the time and date of your
              visit, the time spent on those pages The time spent on the
              Application The operating system you use on your mobile device The
              Application does not gather precise information about the location
              of your mobile device. The Service Provider may use the
              information you provided to contact you from time to time to
              provide you with important information, required notices and
              marketing promotions.
              {'\n\n'}For a better experience, while using the Application, the
              Service Provider may require you to provide us with certain
              personally identifiable information, including but not limited to
              royalvip2d3d@gmail.com. The information that the Service Provider
              request will be retained by them and used as described in this
              privacy policy.
              {'\n\n'}
              <Text allowFontScaling={false}
                style={{
                  fontFamily: 'Inter-Bold',
                }}>
                Third Party Access
              </Text>
              {'\n'}
              Only aggregated, anonymized data is periodically transmitted to
              external services to aid the Service Provider in improving the
              Application and their service. The Service Provider may share your
              information with third parties in the ways that are described in
              this privacy statement.{'\n\n'}Please note that the Application
              utilizes third-party services that have their own Privacy Policy
              about handling data. Below are the links to the Privacy Policy of
              the third-party service providers used by the Application: Google
              Play Services AdMob Google Analytics for Firebase Firebase
              Crashlytics The Service Provider may disclose User Provided and
              Automatically Collected Information: as required by law, such as
              to comply with a subpoena, or similar legal process; when they
              believe in good faith that disclosure is necessary to protect
              their rights, protect your safety or the safety of others,
              investigate fraud, or respond to a government request; with their
              trusted services providers who work on their behalf, do not have
              an independent use of the information we disclose to them, and
              have agreed to adhere to the rules set forth in this privacy
              statement.
              {'\n\n'}
              <Text allowFontScaling={false}
                style={{
                  fontFamily: 'Inter-Bold',
                }}>
                Opt-Out Rights
              </Text>
              {'\n'}
              You can stop all collection of information by the Application
              easily by uninstalling it. You may use the standard uninstall
              processes as may be available as part of your mobile device or via
              the mobile application marketplace or network.
              {'\n\n'}
              <Text allowFontScaling={false}
                style={{
                  fontFamily: 'Inter-Bold',
                }}>
                Data Retention Policy
              </Text>
              {'\n'}
              The Service Provider will retain User Provided data for as long as
              you use the Application and for a reasonable time thereafter. If
              you'd like them to delete User Provided Data that you have
              provided via the Application, please contact them at
              royalvip2d3d@gmail.com and they will respond in a reasonable time.
              {'\n\n'}
              <Text allowFontScaling={false}
                style={{
                  fontFamily: 'Inter-Bold',
                }}>
                Children
              </Text>
              {'\n'}
              The Service Provider does not use the Application to knowingly
              solicit data from or market to children under the age of 13.
              {'\n\n'}
              {'\n'}
              The Application does not address anyone under the age of 13. The
              Service Provider does not knowingly collect personally
              identifiable information from children under 13 years of age. In
              the case the Service Provider discover that a child under 13 has
              provided personal information, the Service Provider will
              immediately delete this from their servers. If you are a parent or
              guardian and you are aware that your child has provided us with
              personal information, please contact the Service Provider
              <Text allowFontScaling={false} style={{color: 'blue'}} selectable>
                (royalvip2d3d@gmail.com)
              </Text>
              so that they will be able to take the necessary actions.
              {'\n\n'}
              <Text allowFontScaling={false}
                style={{
                  fontFamily: 'Inter-Bold',
                }}>
                Security
              </Text>
              {'\n'}The Service Provider is concerned about safeguarding the
              confidentiality of your information. The Service Provider provides
              physical, electronic, and procedural safeguards to protect
              information the Service Provider processes and maintains.
              {'\n\n'}
              <Text allowFontScaling={false}
                style={{
                  fontFamily: 'Inter-Bold',
                }}>
                Changes
              </Text>
              {'\n'}
              This Privacy Policy may be updated from time to time for any
              reason. The Service Provider will notify you of any changes to the
              Privacy Policy by updating this page with the new Privacy Policy.
              You are advised to consult this Privacy Policy regularly for any
              changes, as continued use is deemed approval of all changes.
              {'\n\n'}
              This privacy policy is effective as of 2027-12-22
              {'\n\n'}
              <Text allowFontScaling={false}
                style={{
                  fontFamily: 'Inter-Bold',
                }}>
                Your Consent
              </Text>
              {'\n'}
              By using the Application, you are consenting to the processing of
              your information as set forth in this Privacy Policy now and as
              amended by us.
              {'\n\n'}
              <Text allowFontScaling={false}
                style={{
                  fontFamily: 'Inter-Bold',
                }}>
                Contact Us
              </Text>
              {'\n'}
              If you have any questions regarding privacy while using the
              Application, or have questions about the practices, please contact
              the Service Provider via email at{' '}
              <Text allowFontScaling={false} style={{color: 'blue'}} selectable>
                (royalvip2d3d@gmail.com)
              </Text>
              .
            </Text>
          </View>
        </ScrollView>

        <FloatingNavigionBottomBar navigation={navigation} screen="profile" />
      </ImageBackground>
    </View>
  );
};

export default PrivacyPolicy;
