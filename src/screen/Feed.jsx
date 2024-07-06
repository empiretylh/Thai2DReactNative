import React, { useMemo } from 'react'
import { ActivityIndicator, Image, ImageBackground, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import TopBar from './components/TopBar';
import FloatingNavigionBottomBar from './components/FloatingNavigationBottomBar';
import { useQuery } from 'react-query';
import { getThreeDhistory, getTwoDDaliy } from '../server/api';
import { IMAGE } from '../config/image';
import { COLOR } from '../config/theme';
import Icon from 'react-native-vector-icons/Ionicons'
import GoogleLoginView from './components/GoogleLogin';



const Feed = ({ navigation }) => {
    
    return (
        <View style={{
            flex: 1,
        }}>
            <ImageBackground
                source={IMAGE.background}
                resizeMode="cover"
                style={{
                    flex: 1,
                }}
            >
                <TopBar >
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', textAlign: 'center' }}>Feed</Text>
                </TopBar>

                <GoogleLoginView/>

              

                <FloatingNavigionBottomBar navigation={navigation} screen='news' />
            </ImageBackground>
        </View>
    );
}

export default Feed;
