import React from "react";
import {View, Text, StatusBar} from 'react-native';
import { COLOR } from "../config/theme";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


 const SplashScreen = ()=>{
    return (
        <View style={{
            flex:1,
            backgroundColor:COLOR.primaryColor,
        }}>
            <StatusBar backgroundColor={COLOR.primaryColor}/>
            
        </View>
    )
}

export default SplashScreen;