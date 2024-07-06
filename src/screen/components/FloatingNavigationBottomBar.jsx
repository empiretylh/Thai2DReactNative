import { useEffect, useState } from 'react';
import { View, Text, Touchable, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLOR } from '../../config/theme';
import EncryptedStorage from 'react-native-encrypted-storage';

const style = StyleSheet.create({
    buttton: {
        flex: 1,
        justifyContent: 'center',

        alignItems: 'center',
    }
})

const FloatingNavigionBottomBar = ({navigation, screen='home'}) => {

    const [active, setActive] = useState('home');

    useEffect(()=>{
        setActive(screen)
    },[screen])


    const onHandle = (screen) => {

    }


    return (
        <View style={{

            position: 'absolute',

            bottom: 10,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',


        }} >

            <View style={{
                backgroundColor: "#fff",
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                elevation: 5,
                width: '90%',
                borderRadius: 25,
                gap:4,

            }}>
                <TouchableOpacity onPress={() =>{
                navigation.navigate('Home')
            
            }} style={{ ...style.buttton }}>
                    <Icon name={
                        active === 'home' ? "home" : "home-outline"
                    
                    } size={30} color={active === 'home' ? COLOR.primaryColor : '#2e4f24'} />
                    <Text style={{ color: active === 'home' ? COLOR.primaryColor : '#2e4f24', textAlign: 'center', fontWeight: 'bold' }}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {

                navigation.navigate('ThreeD')
            
            }} style={{ ...style.buttton }}>
                    <Icon name={
                        active === 'threed' ? "color-filter" : "color-filter-outline"
                    } size={30} color={active === 'threed' ? COLOR.primaryColor : '#2e4f24'} />
                    <Text style={{ color: active === 'threed' ? COLOR.primaryColor : '#2e4f24', textAlign: 'center', fontWeight: 'bold' }}>3D</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{
                    navigation.navigate('Chat')
                }} style={{ ...style.buttton }}>
                <Icon name={
                    active === 'chat' ? "chatbubbles" : "chatbubbles-outline"
                
                } size={30} color={active === 'chat' ? COLOR.primaryColor : '#2e4f24'} />
                <Text style={{ color: active === 'chat' ? COLOR.primaryColor : '#2e4f24', textAlign: 'center', fontWeight: 'bold' }}>Chat</Text>
            </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                navigation.navigate('History')
                }} style={{ ...style.buttton }}>
                    <Icon name={
                        active === 'history' ? "time" : "time-outline"
                    } size={30} color={active === 'history' ? COLOR.primaryColor : '#2e4f24'} />
                    <Text style={{ color: active === 'history' ? COLOR.primaryColor : '#2e4f24', textAlign: 'center', fontWeight: 'bold' }}>History</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Feed')
                }} style={{ ...style.buttton }}>
                    <Icon name={
                        active === 'news' ? "newspaper" : "newspaper-outline"
                    
                    } size={30} color={active === 'news' ? COLOR.primaryColor : '#2e4f24'} />
                    <Text style={{ color: active === 'news' ? COLOR.primaryColor : '#2e4f24', textAlign: 'center', fontWeight: 'bold' }}>Feed</Text>
                </TouchableOpacity>
              
            </View>
        </View>
    )

}

export default FloatingNavigionBottomBar;