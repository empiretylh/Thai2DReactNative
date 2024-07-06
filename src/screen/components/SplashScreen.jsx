import React from 'react'
import { ActivityIndicator, Image, StatusBar, Text, View } from 'react-native'
import { COLOR } from '../../config/theme';
import { IMAGE } from '../../config/image';
import Icons from 'react-native-vector-icons/Ionicons';


const SplashScreen = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: COLOR.primaryColor,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <StatusBar backgroundColor={COLOR.primaryColor} />
            <Image source={IMAGE.logo} style={{ width: 200, objectFit: 'contain' }} />
            <ActivityIndicator color={'#fff'} size={30} />
        </View>
    )
}

export default SplashScreen;