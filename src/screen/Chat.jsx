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
  getUsers,
} from '../server/api';
import {IMAGE} from '../config/image';
import {COLOR} from '../config/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import GoogleLoginView from './components/GoogleLogin';
import {useToken} from '../context/TookenProvider';
import firebase from '@react-native-firebase/app';
import firestore, {onSnapshot} from '@react-native-firebase/firestore';
import {GiftedChat} from 'react-native-gifted-chat';
import {SCREEN} from '../config/screen';
import {CountActiveUsers, setUserPresence} from '../context/UserActiveProvider';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { ADUNIT } from '../config/adconfig';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';



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
      <Text allowFontScaling={false} style={{color: '#f21b13', fontSize: wp('4%'), fontFamily: 'Inter-Bold'}}>
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
const TwoDResultView = ({result = [], livenumber}) => {
  const twelevePm = result && result?.[result?.length];

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
              <Text allowFontScaling={false}
                style={{
                  fontFamily: 'Inter-Bold',
                  fontSize: wp('4%'),
                  color: 'white',
                  fontFamily: 'Inter-Bold',
                }}>
                <Text allowFontScaling={false}>Live : </Text>
                <Text allowFontScaling={false}>
                  {livenumber == '--' ? result[3].twod || 0 : livenumber}
                </Text>
              </Text>
              <NumberDisplaySet
                number={
                  livenumber == '--' ? result[3]?.set || 0 : twelevePm?.set
                }
              />
              <NumberDisplayVal
                number={
                  livenumber == '--' ? result[3]?.value || 0 : twelevePm?.value
                }
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const MESSAGE_LIMIT = 50;
const Chat = ({navigation}) => {
  const twodData = useQuery('twod', getTwoDDaliy);
  const userprofile = useQuery('user_profile', getUsers);
  const {gtoken, onSetGToken} = useToken();

  const profiledata = useMemo(() => {
    if (userprofile?.data) {
      return userprofile?.data?.data;
    }
    return null;
  }, [userprofile?.data]);

  const Data = useMemo(() => {
    if (twodData?.data) {
      console.log(twodData?.data?.data);
      return twodData?.data?.data;
    }
    return null;
  }, [twodData?.data]);

  // Firestore cursor is not supported in query.onSnapshot so maintaining two chat list
  // oldChats -> chat list via cursor, recentChats -> chat list via live listener
  const [oldChats, setOldChats] = useState([]);
  const [recentChats, setRecentChats] = useState([]);

  // if true, show a loader at the top of chat list
  const [moreChatsAvailable, setMoreChatsAvailable] = useState(true);

  const [inputMessage, setInputMessage] = useState('');

  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    const query = firestore().collection('Users').where('isOnline', '==', true);
    const listener = query.onSnapshot(querySnapshot => {
      let data = [];
      querySnapshot?.forEach(s => {
        data.push(s.data());
      });
      setActiveUsers(data);
    });

    return () => {
      listener();
    };
  }, []);

  useEffect(() => {
    const query = firestore()
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(MESSAGE_LIMIT);

    const listener = query.onSnapshot(querySnapshot => {
      let chats = [];
      querySnapshot?.forEach(snapshot => {
        chats.push(snapshot.data());
      });
      // merge recentChats & chats
      if (recentChats.length > 0) {
        const newRecentChats = [];
        for (let i = 0; i < chats.length; i++) {
          if (chats[i].sessionId === recentChats[0].sessionId) {
            break;
          }
          newRecentChats.push(chats[i]);
        }
        setRecentChats([...newRecentChats, ...recentChats]);
      } else {
        setRecentChats(chats);
        if (chats.length < MESSAGE_LIMIT) {
          setMoreChatsAvailable(false);
        }
      }
    });

    setUserPresence(true);

    return () => {
      // unsubscribe listener
      listener();
    };
  }, []);

  const onChatListEndReached = () => {
    if (!moreChatsAvailable) {
      return;
    }
    let startAfterTime;
    if (oldChats.length > 0) {
      startAfterTime = oldChats[oldChats.length - 1].time;
    } else if (recentChats.length > 0) {
      startAfterTime = recentChats[recentChats.length - 1].time;
    } else {
      setMoreChatsAvailable(false);
      return;
    }
    // query data using cursor
    firestore()
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .startAfter(startAfterTime)
      .limit(MESSAGE_LIMIT)
      .get()
      .then(querySnapshot => {
        let chats = [];
        querySnapshot?.forEach(snapshot => {
          chats.push(snapshot.data());
        });
        if (chats.length == 0) {
          setMoreChatsAvailable(false);
        } else {
          setOldChats([...oldChats, ...chats]);
        }
      });
  };

  const postMessage = message => {
    firestore()
      .collection('messages')
      .add({
        _id: new Date().getTime(),
        createdAt: firestore.FieldValue.serverTimestamp(),
        text: message,
        user: {
          username: firebase?.auth().currentUser.displayName,
          email: firebase.auth().currentUser.email,
          photo:
            profiledata?.photo ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNJEbNBW7WgMiqHuSO0OPtl8yxP218c-U-4Q&s',
        },
      });
  };

  const onMessageInputChange = text => {
    setInputMessage(text);
  };

  const onMessageSubmit = () => {
    if (inputMessage == '') return false;

    postMessage(inputMessage);
    setInputMessage('');
  };

  const FlatListItem = ({item, index}) => {
    return (
      <View
        style={{
          padding: 5,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
        key={index}>
        <Image
          source={{
            uri:
              item?.item?.user?.photo == null
                ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNJEbNBW7WgMiqHuSO0OPtl8yxP218c-U-4Q&s'
                : item?.item?.user?.photo,
          }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 40,
          }}
        />
        <View
          style={{
            backgroundColor:
              item?.item?.user?.email == profiledata?.email
                ? COLOR.primaryColor
                : COLOR.secondaryColor,
            padding: 5,
            paddingHorizontal: 10,
            borderRadius: 15,
          }}>
          <Text allowFontScaling={false} style={{color: COLOR.fithColor}}>
            {item?.item?.user?.username}
          </Text>

          <Text allowFontScaling={false}
            selectable
            style={{
              fontFamily: 'Inter-Bold',
              color: 'white',
              maxWidth: SCREEN.width - 100,
              fontSize: 19,
            }}>
            {item.item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
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
          padding: 5,
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
          <Text allowFontScaling={false} style={{color: 'white', fontSize: hp('3%'), fontFamily: 'Inter-Bold'}}>
            Chat
          </Text>
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
          backgroundColor: COLOR.primaryColor,
          paddingBottom: 10,
          borderBottomRightRadius: 35,
          borderBottomLeftRadius: 35,
        }}>
        <View>
        <Text allowFontScaling={false}
            style={{
              color: 'white',
              fontFamily: 'Inter-Bold',
              fontSize: wp('4%'),
              textAlign:'center'
            }}>
            {activeUsers?.length < 0 ? activeUsers?.length : '1'} Online
          </Text>

        
          <TwoDResultView result={Data?.result} livenumber={Data?.live?.twod} />
        </View>
      </View>
      <BannerAd unitId={ADUNIT.bannerunit} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />

      {gtoken ? (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          <FlatList
            inverted
            data={[...recentChats, ...oldChats]}
            renderItem={(item, index) => (
              <FlatListItem item={item} index={index} />
            )}
            keyExtractor={item => item?.id}
            onEndReached={onChatListEndReached}
            onEndReachedThreshold={0.2}
            ListFooterComponent={
              moreChatsAvailable ? <ActivityIndicator /> : null
            }
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLOR.primaryColor,
            }}>
            <TextInput
              style={{
                padding: 10,
                flex: 1,
                color: 'white',
                fontSize: hp('2%'),
              }}
              placeholder="Type a message...."
              placeholderTextColor={'white'}
              value={inputMessage}
              onChangeText={onMessageInputChange}
            />
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: COLOR.primaryColor,
              }}
              onPress={() => {
                onMessageSubmit();
              }}>
              <Text allowFontScaling={false}
                style={{
                  color: 'white',
                  fontFamily: 'Inter-Bold',
                  fontSize: hp('2'),
                }}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <GoogleLoginView />
      )}
    </View>
  );
};

export default Chat;
