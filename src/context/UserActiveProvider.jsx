import React from 'react';

import firebase from '@react-native-firebase/app';
import firestore, {onSnapshot} from '@react-native-firebase/firestore';

export const setUserPresence = isOnline => {
  firestore().collection('Users').doc(firebase.auth().currentUser.uid).set(
    {
      isOnline: isOnline,
    },
    {
      merge: true,
    },
  );
};

export const CountActiveUsers = async () => {
  const snapshot = await firestore()
    .collection('Users')
    .where('isOnline', '==', true)
    .get();

  const activeUsers = snapshot?.docs?.map(doc => doc.data());
  return activeUsers;
};
