import React from 'react';
import { Text, View } from 'react-native';
import { COLOR } from './src/config/theme';
import Container from './src/screen/Container';
import { TokenProvider } from './src/context/TookenProvider';
export default function App() {
  return (

    <TokenProvider>
      <Container />
    </TokenProvider>

  )
}