import {Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {COLOR} from '../../config/theme';
import {IMAGE} from '../../config/image';
import Icon from 'react-native-vector-icons/Ionicons';

const TopBar = ({
  children,
  showOrigin = true,
  customViewStyle,
  navigation,
  backgroundColor,
}) => {
  return (
    <View
      style={{
        backgroundColor: backgroundColor ? backgroundColor : COLOR.primaryColor,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        paddingHorizontal: 10,
        height: 60,
      }}>
      <StatusBar
        backgroundColor={backgroundColor ? backgroundColor : COLOR.primaryColor}
      />
      {showOrigin ? (
        <>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Image
              source={IMAGE.logo}
              style={{
                width: 50,
                height: 50,
                objectFit: 'contain',
                position: 'absolute',
                top: -30,
              }}
            />
          </TouchableOpacity>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {children}
          </View>

          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              right:10,
              gap:10,
              padding:5,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('chat');
              }}
              style={{alignItems: 'center'}}>
              <Icon name="chatbubbles" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile');
              }}
              style={{alignItems: 'center'}}>
              <Icon name="person-circle" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={customViewStyle}>{children}</View>
      )}
    </View>
  );
};

export default TopBar;
