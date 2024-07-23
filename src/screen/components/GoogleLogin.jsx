/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, Button, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {COLOR} from '../../config/theme';
import Icons from 'react-native-vector-icons/Ionicons';
import {useToken} from '../../context/TookenProvider';
import {useMutation} from 'react-query';
import {register} from '../../server/api';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const GoogleLoginView = ({nobound = false, reload = () => {}}) => {
  const {gtoken, onSetGToken, setToken, token, onSetToken} = useToken();

  const LoginToServer = useMutation(register, {
    onSuccess: data => {
      onSetToken(data.data.token);
    },
    onError: error => {
      console.log(error);
    },
  });

  async function onGoogleButtonPress() {
    GoogleSignin.configure({
      webClientId:
        '658645331835-n601h9l7u5nppuetint2bd20ps5s1k30.apps.googleusercontent.com',
    });
    GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(userInfo => {
              console.log(JSON.stringify(userInfo));
              let idtoken = userInfo.idToken;
              let googleCredential =
                auth.GoogleAuthProvider.credential(idtoken);

              LoginToServer.mutate({
                name: userInfo.user.name,
                email: userInfo.user.email,
                username: userInfo.user.email,
                photo: userInfo.user.photo,
                password: userInfo.user.id,
              });

              auth().signInWithCredential(googleCredential);
              onSetGToken(userInfo.idToken);
              reload();
            })
            .catch(e => {
              console.log('ERROR IS: ' + JSON.stringify(e));
            });
        }
      })
      .catch(e => {
        console.log('ERROR IS: ' + JSON.stringify(e));
      });
  }

  return (
    <View
      style={{
        flex: nobound ? 0 : 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: nobound ? 10 : 1,
        minWidth : wp('100%')
      }}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
          width: '90%',
          padding: 20,
        }}>
        <Text
          allowFontScaling={false}
          style={{
            color: 'black',
            textAlign: 'center',
            fontSize: hp('3'),
            fontFamily: 'Inter-Bold',
          }}>
          Please Sign in to Continue
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            color: COLOR.primaryColor,
            textAlign: 'center',
            fontSize: hp('2'),
            marginTop: 4,

            fontFamily: 'Inter-Bold',
          }}>
          Live Chat and New Feeds
        </Text>
        <TouchableOpacity
          onPress={onGoogleButtonPress}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
            gap: 5,
            borderColor: COLOR.primaryColor,
            borderWidth: 1,
            width: '100%',
            justifyContent:'center'
          }}>
          <Icons
            name="logo-google"
            size={wp('5%')}
            color={COLOR.primaryColor}
          />
          <Text
            allowFontScaling={false}
            style={{
              color: 'black',
              fontSize: hp('3'),
              fontFamily: 'Inter-Bold',
            }}>
            Sign in with Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GoogleLoginView;
