import React from 'react';

import firebase from '@react-native-firebase/app';
import firestore, {onSnapshot} from '@react-native-firebase/firestore';
import axios from 'axios';
export const setUserPresence = isOnline => {
  return axios.post('/api/isonline/', {
    active: isOnline,
  });
};

export const CountActiveUsers = async (setData) => {
  const data = await axios.get('/api/isonline/').then(res=>
    setData(res.data?.count || 1)
  );

};
