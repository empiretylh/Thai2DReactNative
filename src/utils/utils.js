import messaging from '@react-native-firebase/messaging';
import EncryptedStorage from 'react-native-encrypted-storage';
import {postFCMToken} from '../server/api';
import {getUniqueIdSync} from 'react-native-device-info';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
};

export const getFCMToken = async () => {
  let fcmtoken = await EncryptedStorage.getItem('fcmtoken');
  console.log('old fcmtoken', fcmtoken);
  if (!fcmtoken) {
    try {
      fcmtoken = await messaging().getToken();
      if (fcmtoken) {
         console.log('new token', fcmtoken);     

        EncryptedStorage.setItem('fcmtoken', fcmtoken);
        return fcmtoken;
      }
    } catch (err) {
      console.log(err, 'error in fecthing token');
    } 

  }
  return fcmtoken;
};
