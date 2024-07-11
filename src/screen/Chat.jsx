import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  FlatList,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
  View,
} from 'react-native';
import TopBar from './components/TopBar';
import FloatingNavigionBottomBar from './components/FloatingNavigationBottomBar';
import {useQuery} from 'react-query';
import {
  getLiveTwoDServerUpdate,
  getThreeDhistory,
  getTwoDDaliy,
} from '../server/api';
import {IMAGE} from '../config/image';
import {COLOR} from '../config/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import GoogleLoginView from './components/GoogleLogin';
import {useToken} from '../context/TookenProvider';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {GiftedChat} from 'react-native-gifted-chat';

const NumberDisplaySet = ({number = 0}) => {
  const numberString = number.toString();
  const mainPart = numberString.slice(0, -1); // All except last character
  const lastDigit = numberString.slice(-1); // Last character

  return (
    <Text
      style={{
        fontFamily: 'arial',
        letterSpacing: 0.5,
        fontSize: 18,
        color: 'black',
      }}>
      <Text>Set: </Text>
      <Text style={{color: 'black'}}>{mainPart}</Text>
      <Text style={{color: '#f21b13', fontSize: 20, fontWeight: 'bold'}}>
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
    <Text
      style={{
        fontFamily: 'arial',
        fontSize: 18,
        color: 'black',
      }}>
      <Text>Value : </Text>
      <Text style={{color: '#000'}}>{firstPart}</Text>
      <Text style={{color: '#f21b13', fontWeight: 'bold'}}>{selectPart}</Text>
      <Text style={{color: '#000'}}>{thridPart} </Text>
    </Text>
  );
};
const TwoDResultView = ({result = [], livenumber}) => {
  const twelevePm =
    result && result?.find(item => item.open_time == '12:01:00');
  const fourPm = result && result?.find(item => item.open_time == '16:30:00');

  return (
    <View style={{}}>
      <TouchableOpacity
        style={{
          backgroundColor: COLOR.secondaryColor,
          borderRadius: 15,
        }}>
        <View
          style={{
            paddingHorizontal: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'column', gap: 2}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Text
                style={{
                  fontFamily: 'arial',
                  fontSize: 20,
                  color: 'white',
                  fontWeight:'bold'
                }}>
                <Text>Live : </Text>
                <Text>{livenumber}</Text>
              </Text>
              <NumberDisplaySet number={twelevePm?.set} />
              <NumberDisplayVal number={twelevePm?.value} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Chat = ({navigation}) => {
  const twodData = useQuery('twod', getTwoDDaliy);

  const serverupdatedTwoD = useQuery('updatedTwoD', getLiveTwoDServerUpdate);

  const {gtoken, onSetGToken} = useToken();

  const Data = useMemo(() => {
    if (twodData?.data) {
      console.log(twodData?.data?.data);
      return twodData?.data?.data;
    }
    return null;
  }, [twodData?.data]);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );

    const {_id, createdAt, text, user} = messages[0];

    firestore()
      .collection('messages')
      .doc('chatRoomId')
      .collection('messages')
      .add({
        _id,
        createdAt: firestore.FieldValue.serverTimestamp(),
        text,
        user: firebase.auth().currentUser.email,
      });
  }, []);

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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 40,
            backgroundColor: COLOR.primaryColor,
            padding: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              padding: 5,
              alignItems: 'center',
              position: 'absolute',
              left: 10,
            }}>
            <Icon name="arrow-back" size={25} color="#fff" />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
              Chat
            </Text>
            <Text style={{color: 'white', fontSize: 15}}>25 Online</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              padding: 5,
              alignItems: 'center',
              position: 'absolute',
              right: 10,
            }}>
            <Icon name="menu" size={25} color="#fff" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 40,
            backgroundColor: COLOR.primaryColor,
            padding: 10,
            borderBottomRightRadius: 35,
            borderBottomLeftRadius: 35,
          }}>
          <View>
            <TwoDResultView
              result={Data?.result}
              livenumber={Data?.live?.twod}
            />
          </View>
        </View>

        {gtoken ? (
          <View
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: 'white',
            }}>
            <GiftedChat
              messages={messages}
              onSend={messages => onSend(messages)}
              showAvatarForEveryMessage={true}
              user={{
                _id: firebase.auth()?.currentUser?.email,
                name: firebase.auth()?.currentUser?.displayName,
                avatar: firebase.auth()?.currentUser?.photoURL,
              }}
            />
          </View>
        ) : (
          <GoogleLoginView />
        )}
        <FloatingNavigionBottomBar
          navigation={navigation}
          screen="chat"
          show={false}
        />
      </ImageBackground>
    </View>
  );
};

export default Chat;
