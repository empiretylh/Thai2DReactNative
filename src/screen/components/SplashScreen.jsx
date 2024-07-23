import React from 'react'
import { ActivityIndicator, Image, StatusBar, Text, View } from 'react-native'
import { COLOR } from '../../config/theme';
import { IMAGE } from '../../config/image';
import Icons from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';



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
            <Text allowFontScaling={false} style={{
                color:'white',
                fontSize:20,
                fontWeight:'bold',
                fontFamily:'Inter-Bold',
            }}>
                ခဏစောင့်ပေးပါ...
                </Text>
        </View>
    )
}

export default SplashScreen;