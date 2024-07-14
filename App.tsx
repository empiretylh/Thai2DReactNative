import React from 'react';
import { Text, View } from 'react-native';
import { COLOR } from './src/config/theme';
import Container from './src/screen/Container';
import { TokenProvider } from './src/context/TookenProvider';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
export default function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyDG6B7gqXQZYwufXXzBzOcAInTXBmQT0uA",
    authDomain: "thai2dproject.firebaseapp.com",
    projectId: "thai2dproject",
    messagingSenderId: "658645331835",
    appId: "1:658645331835:android:b5bcaf7f1ba4603a7b97de",
     measurementId: "G-4JQZ7ZVQYV",
    databaseURL: 'https://thai2dproject-default-rtdb.firebaseio.com/',
    storageBucket: 'thai2dproject.appspot.com',
  };
 

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }else{
    firebase.app();
  }

  return (

    <TokenProvider>
      <Container />
    </TokenProvider>

  )
}