import {Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {COLOR} from '../../config/theme';
import {IMAGE} from '../../config/image';
import Icon from 'react-native-vector-icons/Ionicons';

const TopBar = ({children, showOrigin = true, customViewStyle, navigation , backgroundColor }) => {
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
      }}>
      <StatusBar backgroundColor={backgroundColor ? backgroundColor : COLOR.primaryColor} />
      {showOrigin ? (
        <>
        <TouchableOpacity onPress={()=>{
          navigation.navigate('Home')
        }}>
          
          <Image
            source={IMAGE.logo}
            style={{width: 70, height: 70, objectFit: 'contain'}}
          />

          
        </TouchableOpacity>
          <View style={{marginLeft: 'auto'}}>{children}</View>

          <TouchableOpacity
            onPress={()=>{
              navigation.navigate('Profile')
            }}
            style={{marginLeft: 'auto', width: 70, alignItems: 'center'}}>
            <Icon name="person-circle" size={40} color="#fff" />
          </TouchableOpacity>
        </>
      ) : (
        <View style={customViewStyle}>

        {children}
        </View>
      )}
    </View>
  );
};

export default TopBar;
