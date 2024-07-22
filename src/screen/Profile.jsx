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
import {
  getThreeDhistory,
  getTwoDDaliy,
  getTwoDHistory,
  getUsers,
} from '../server/api';
import {IMAGE} from '../config/image';
import {COLOR} from '../config/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import GoogleLoginView from './components/GoogleLogin';
import {useToken} from '../context/TookenProvider';
import firebase from '@react-native-firebase/app';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Profile = ({navigation}) => {
  const {token, gtoken, onSetGToken, onSetToken} = useToken();
  const userprofile = useQuery('user_profile', getUsers);

  const Data = useMemo(() => {
    if (userprofile?.data) {
      return userprofile?.data?.data;
    }
    return null;
  }, [userprofile?.data]);

  const firbaseLogout = () => {
    firebase.auth().signOut();
    onSetGToken(null);
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
            Profile
          </Text>
        </TopBar>
        {token && gtoken ? (
          <View style={{alignItems:'center', justifyContent:'center'}}>
            <View
              style={{
                width: 90,
                height: 90,
                borderRadius: 50,
                backgroundColor: COLOR.secondaryColor,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: 50,
              }}>
              <Image
                source={{uri: Data?.photo}}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  alignSelf: 'center',
                }}
              />
            </View>
            <Text allowFontScaling={false}
              style={{
                textAlign: 'center',
                fontSize: wp('4%'),
                fontFamily: 'Inter-Bold',
                marginTop: 10,
                color: COLOR.primaryColor,
              }}>
              {Data?.name}
            </Text>
            <Text allowFontScaling={false}
              style={{
                textAlign: 'center',
                fontFamily: 'Inter-Bold',
                color: COLOR.primaryColor,
              }}>
              {Data?.email}
            </Text>
          </View>
        ) : (
          <GoogleLoginView nobound  reload={()=>{
            userprofile.refetch();
          }}/>
        )}

        <View
          style={{
            flexDirection: 'column',
            gap: 2,
            backgroundColor: COLOR.primaryColor,
            width: '90%',
            alignSelf: 'center',
            padding: 10,
            borderRadius: 15,
            marginTop: 10,
          }}>
          <Text allowFontScaling={false}
            style={{
              color: 'white',
              fontSize: wp('4%'),
              fontFamily: 'Inter-Bold',
            }}>
            SETTINGS
          </Text>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: COLOR.thridColor,
              padding: 10,
              borderBottomWidth: 1,
            }}
            onPress={()=>{
              navigation.navigate("PrivacyPolicy")
            }}
            >
            <Icon name="document" size={25} color={'#fff'} />
            <Text allowFontScaling={false}
              style={{
                marginLeft: 10,
                color: 'white',
                fontFamily: 'Inter-Bold',
                fontSize: 17,
              }}>
              Privacy Policy
            </Text>
            <TouchableOpacity style={{marginLeft: 'auto'}}>
              <Icon name="chevron-forward-outline" size={20} color={'white'} />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: COLOR.thridColor,
              padding: 10,
              borderBottomWidth: 1,
            }}>
            <Icon name="information-circle" size={25} color={'#fff'} />
            <Text allowFontScaling={false}
              style={{
                marginLeft: 10,
                color: 'white',
                fontFamily: 'Inter-Bold',
                fontSize: 17,
              }}>
              About Us
            </Text>
            <TouchableOpacity style={{marginLeft: 'auto'}}>
              <Icon name="chevron-forward-outline" size={20} color={'white'} />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: COLOR.thridColor,
              padding: 10,
              borderBottomWidth: 1,
            }}>
            <Icon name="git-branch" size={25} color={'#fff'} />
            <Text allowFontScaling={false}
              style={{
                marginLeft: 10,
                color: 'white',
                fontFamily: 'Inter-Bold',
                fontSize: 17,
              }}>
              Current Version
            </Text>

            <Text allowFontScaling={false} style={{marginLeft: 'auto', color: 'white'}}>1.1.0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              borderBottomColor: COLOR.thridColor,
              borderBottomWidth: 1,
            }}>
            <Icon name="star" size={25} color={'#fff'} />
            <Text allowFontScaling={false}
              style={{
                marginLeft: 10,
                color: 'white',
                fontFamily: 'Inter-Bold',
                fontSize: 17,
              }}>
              Rate this app
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
            }}
            onPress={() => {
              firbaseLogout();
            }}>
            <Icon name="log-out-outline" size={25} color={'#fff'} />
            <Text allowFontScaling={false}
              style={{
                marginLeft: 10,
                color: 'white',
                fontFamily: 'Inter-Bold',
                fontSize: 17,
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        <FloatingNavigionBottomBar navigation={navigation} screen="history" />
      </ImageBackground>
    </View>
  );
};

export default Profile;
