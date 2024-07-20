import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import SplashScreen from './components/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home';
import {QueryClient, QueryClientProvider} from 'react-query';
import ThreeDView from './ThreeD';
import History from './History';
import Feed from './Feed';
import Chat from './Chat';
import {LikeProvider} from '../context/LikeProvider';
import {UserProvider} from '../context/UserProvider';
import Profile from './Profile';
import GiftView from './GiftView';
import ETS from './GiftScreen/ETS';
import GiftTypeScreen from './GiftScreen/GiftTypeScreen';
import {LoadDataProvider} from '../context/LoadDataProvider';
import {View, Text, AppState, PermissionsAndroid} from 'react-native';
import {setUserPresence} from '../context/UserActiveProvider';
import {getFCMToken, requestUserPermission} from '../utils/utils';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {postFCMToken} from '../server/api';
import {getUniqueIdSync} from 'react-native-device-info';
import EncryptedStorage from 'react-native-encrypted-storage'

const client = new QueryClient();

const Stack = createNativeStackNavigator();

const Container = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        setUserPresence(true);
      } else if (nextAppState === 'background') {
        setUserPresence(false);
      }

      setAppState(nextAppState);
    };
    
    AppState.addEventListener('change', handleAppStateChange);
  }, [appState]);

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    requestUserPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
      });
    });

    return unsubscribe;
  }, []);

  const getMessagingToken = async () => {
    let fcmtoken = await EncryptedStorage.getItem('fcmtoken');
    postFCMToken({
      unique_id: getUniqueIdSync(),
      fcm_token: fcmtoken,
    });
  };

  useEffect(() => {
    getMessagingToken();
  }, []);

  return (
    <QueryClientProvider client={client}>
      <NavigationContainer>
        <LoadDataProvider>
          <UserProvider>
            <LikeProvider>
              <Stack.Navigator
                screenOptions={{headerShown: false, animation: 'none'}}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Gift" component={GiftView} />

                <Stack.Screen name="ThreeD" component={ThreeDView} />
                <Stack.Screen name="History" component={History} />
                <Stack.Screen name="Feed" component={Feed} />
                <Stack.Screen name="Chat" component={Chat} />
                <Stack.Screen name="Profile" component={Profile} />

                {/* gift view */}
                <Stack.Screen name="ets" component={ETS} />
                <Stack.Screen name="gts" component={GiftTypeScreen} />

                <Stack.Screen name="SplashScreen" component={SplashScreen} />
              </Stack.Navigator>
            </LikeProvider>
          </UserProvider>
        </LoadDataProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default Container;
