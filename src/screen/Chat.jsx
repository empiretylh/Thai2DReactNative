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
import {getThreeDhistory, getTwoDDaliy} from '../server/api';
import {IMAGE} from '../config/image';
import {COLOR} from '../config/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import GoogleLoginView from './components/GoogleLogin';
import {useToken} from '../context/TookenProvider';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {GiftedChat} from 'react-native-gifted-chat';

const Chat = ({navigation}) => {
  const {gtoken, onSetGToken} = useToken();

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
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Chat
          </Text>

          <TouchableOpacity
            onPress={firbaseLogout}
            style={{
              marginLeft: 'auto',
            }}>
            <Icon name={'log-out-outline'} size={30} color="white" />
          </TouchableOpacity>
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
        <FloatingNavigionBottomBar navigation={navigation} screen="chat"  show={false}/>
      </ImageBackground>
    </View>
  );
};




export default Chat;
