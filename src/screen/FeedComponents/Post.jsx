import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {IMAGE} from '../../config/image';
import axios from 'axios';
import {COLOR} from '../../config/theme';
import {timeExchanger} from '../../tools/timeexchanger';
import Icon from 'react-native-vector-icons/Ionicons';
import {useMutation} from 'react-query';
import {onLike} from '../../server/api';
import {useLike} from '../../context/LikeProvider';
import {SCREEN} from '../../config/screen';
import {useEffect, useState} from 'react';
import { ModalImageViewer } from './ImageViewer';
import ImageViewer from '../components/ImageViewer';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { ADUNIT } from '../../config/adconfig';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: 'black',
    marginTop: 5,
    fontFamily: 'Inter-Regular',
  },
  showMore: {
    color: 'blue',
    marginTop: 5,
    fontFamily: 'Inter-Bold',

  },
});

const ShowMoreText = ({text, numberOfLines , style}) => {
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);

  return (
    <View style={style}>
      <Text allowFontScaling={false}
        style={styles.text}
        numberOfLines={expanded ? null : numberOfLines}
        selectable
        onTextLayout={e =>
          setShowButton(e.nativeEvent.lines.length > numberOfLines)
        }>
        {text}
      </Text>
      {showButton && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text allowFontScaling={false} style={styles.showMore}>
            {expanded ? 'Show less' : 'Show more'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export const PostItem = ({item}) => {
  const {RefetchLikes, likes, LikeCountbyPostId, isUserLiked} = useLike();

  const [showImageViewer, setShowImageViewer] = useState(false);
  const [images, setImages] = useState([]);

  const Like = useMutation(onLike, {
    onSuccess: () => {
      RefetchLikes();
    },
  });

  const OnLikeCLick = post_id => {
    Like.mutate({
      post_id: post_id,
    });
  };

  const PostImage = item => {
    return (
      <TouchableOpacity onPress={()=>{
        setShowImageViewer(true)

      }}>
        
        <Image
          source={{
            uri: axios.defaults.baseURL + item?.image,
          }}
          style={{
            width: SCREEN.width - 20,
            height: SCREEN.height / 3,
            objectFit: 'cover',
          }}
        />
      </TouchableOpacity>
    );
  };


  return (
    <>
    <ModalImageViewer show={showImageViewer} setShow={setShowImageViewer} imageUrls={item.images.map((image)=>({url:axios.defaults.baseURL + image.image}))} />
      <View
        style={{
          backgroundColor: 'white',
          margin: 10,

          borderRadius: 10,
        }}>
        <View
          style={{
            padding: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Image
              defaultSource={IMAGE.logo}
              source={
                item?.user?.photo
                  ? {
                      uri: axios.defaults.baseURL + item?.user?.photo,
                    }
                  : IMAGE.logo
              }
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: COLOR.primaryColor,
                padding: 10,
              }}
            />
            <View
              style={{
                flexDirection: 'column',
              }}>
              <Text allowFontScaling={false}
                style={{
                  color: 'black',
                  fontFamily: 'Inter-Bold',
                }}>
                {item.user.username}
              </Text>
              <Text allowFontScaling={false}>{timeExchanger(item.created_at)}</Text>
            </View>
          </View>

          <ShowMoreText style={{
            marginTop:5
          }} text={item?.text || ''} numberOfLines={3} />
        </View>
        <View style={{postion: 'relative'}}>
          <FlatList
            data={item.images}
            renderItem={({item}) => PostImage(item)}
            keyExtractor={item => item.id}
            horizontal={true}
            pagingEnabled
            decelerationRate={'normal'}
            scrollEventThrottle={1}
            contentContainerStyle={{
              gap: 2,
              flexDirection: 'row',
              overflow: 'auto',
            }}
          />

          {item?.images?.length > 1 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                bottom: 10,
                right: 10,
                padding: 5,
              }}>
              <Icon name="albums-outline" size={25} color={'white'} />
              <Text allowFontScaling={false}
                style={{
                  color: 'white',
                  fontFamily: 'Inter-Bold',
                  fontSize: 15,
                  marginLeft: 5,
                }}>
                {item?.images?.length}
              </Text>
            </View>
          )}
        </View>

        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <TouchableOpacity
                onPress={() => OnLikeCLick(item.id)}
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <Icon
                  name={isUserLiked(item.id) ? 'heart' : 'heart-outline'}
                  size={30}
                  color={'red'}
                />
                <Text allowFontScaling={false} style={{color: 'black'}}>
                  {LikeCountbyPostId(item.id)}
                </Text>
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity>
              <Icon name="bookmark-outline" size={30} color={COLOR.primary} />
            </TouchableOpacity> */}
          </View>
        </View>
      </View>

      {/* Ad View */}
      <View
        style={{
          width: '100%',
          height: 50,
          backgroundColor: '#e0aeab',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        
            <BannerAd
              unitId={ADUNIT.bannerunit}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            />
      </View>
    </>
  );
};
