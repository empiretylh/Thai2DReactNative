import {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLOR} from '../../config/theme';
import {IMAGE} from '../../config/image';

const style = StyleSheet.create({
  buttton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const FloatingNavigionBottomBar = ({
  navigation,
  screen = 'home',
  show = true,
}) => {
  const [active, setActive] = useState('home');

  const position = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setActive(screen);
  }, [screen]);

  useEffect(() => {
    Animated.timing(position, {
      toValue: show ? 0 : 100, // 0 when showing, 100 when hiding
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [show]);

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.View
        style={[
          {
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            elevation: 5,
            width: '90%',
            borderRadius: 25,
            gap: 4,
            transform: [{translateY: position}],
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={style.buttton}>
          <Icon
            name={active === 'home' ? 'home' : 'home-outline'}
            size={30}
            color={active === 'home' ? COLOR.primaryColor : '#2e4f24'}
          />
          <Text
            style={{
              color: active === 'home' ? COLOR.primaryColor : '#2e4f24',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ThreeD');
          }}
          style={style.buttton}>
          <Icon
            name={active === 'threed' ? 'color-filter' : 'color-filter-outline'}
            size={30}
            color={active === 'threed' ? COLOR.primaryColor : '#2e4f24'}
          />
          <Text
            style={{
              color: active === 'threed' ? COLOR.primaryColor : '#2e4f24',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            3D
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('Chat');
          }}
          style={style.buttton}>
          <Icon
            name={active === 'chat' ? 'chatbubbles' : 'chatbubbles-outline'}
            size={30}
            color={active === 'chat' ? COLOR.primaryColor : '#2e4f24'}
          />
          <Text
            style={{
              color: active === 'chat' ? COLOR.primaryColor : '#2e4f24',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Chat
          </Text>
        </TouchableOpacity> */}
        <View>
          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            width:90,
            position:'relative'
          }} onPress={() => {
            navigation.navigate('Gift');
          
          }}>
            <View style={{
                 position:'absolute',
            }}>
                
            <Image source={IMAGE.gift} style={{width: 90, height: 90,}} />
            <Text
            style={{
              color: active === 'history' ? COLOR.primaryColor : '#2e4f24',
              textAlign: 'center',
              fontWeight: 'bold',
              marginTop:-10
            }}>
            Gift
          </Text>
          
          </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('History');
          }}
          style={style.buttton}>
          <Icon
            name={active === 'history' ? 'time' : 'time-outline'}
            size={30}
            color={active === 'history' ? COLOR.primaryColor : '#2e4f24'}
          />
          <Text
            style={{
              color: active === 'history' ? COLOR.primaryColor : '#2e4f24',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Feed');
          }}
          style={style.buttton}>
          <Icon
            name={active === 'news' ? 'newspaper' : 'newspaper-outline'}
            size={30}
            color={active === 'news' ? COLOR.primaryColor : '#2e4f24'}
          />
          <Text
            style={{
              color: active === 'news' ? COLOR.primaryColor : '#2e4f24',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Feed
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default FloatingNavigionBottomBar;
