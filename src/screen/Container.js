import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
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

const client = new QueryClient();

const Stack = createNativeStackNavigator();

const Container = () => {
  return (
    <QueryClientProvider client={client}>
      <NavigationContainer>
        <UserProvider>
          <LikeProvider>
            <Stack.Navigator
              screenOptions={{headerShown: false, animation: 'none'}}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="ThreeD" component={ThreeDView} />
              <Stack.Screen name="History" component={History} />
              <Stack.Screen name="Feed" component={Feed} />
              <Stack.Screen name="Chat" component={Chat} />

              <Stack.Screen name="SplashScreen" component={SplashScreen} />
            </Stack.Navigator>
          </LikeProvider>
        </UserProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default Container;
