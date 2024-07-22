import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  RefreshControl,
  View,
} from 'react-native';
import TopBar from './components/TopBar';
import FloatingNavigionBottomBar from './components/FloatingNavigationBottomBar';
import {useQuery} from 'react-query';
import {getFeeds, getThreeDhistory, getTwoDDaliy} from '../server/api';
import {IMAGE} from '../config/image';
import {COLOR} from '../config/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import GoogleLoginView from './components/GoogleLogin';
import {useToken} from '../context/TookenProvider';
import axios from 'axios';
import {timeExchanger} from '../tools/timeexchanger';
import {PostItem} from './FeedComponents/Post';
import { useLike } from '../context/LikeProvider';
import { SearchViewModal } from './FeedComponents/SearchViewModal';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Feed = ({navigation}) => {
  const {gtoken, setGToken} = useToken();
  const [loading, setLoading] = useState(true);
  const [showNavibar, setShowNavibar] = React.useState(true);

  const [showSearchView, setShowSearchView] = useState(false);


  let lastScrollY = useRef(0);

  const handleScroll = event => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    if (currentScrollY > lastScrollY.current) {
      // Scrolling down
      setShowNavibar(false);
    } else {
      // Scrolling up
      setShowNavibar(true);
    }
    lastScrollY.current = currentScrollY;
  };

  const feeds_data = useQuery('feeds', getFeeds);
  const {likes, RefetchLikes, LikeCountbyPostId, isUserLiked,likes_data} = useLike();

  useLayoutEffect(() => {
    feeds_data?.refetch();
  }, []);

  useEffect(() => {
    if (feeds_data?.isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [feeds_data]);

  const feeds = useMemo(() => {
    return feeds_data?.data?.data;
  }, [feeds_data]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ImageBackground
        source={IMAGE.background}
        resizeMode="cover"
        style={{
          flex: 1,
        }}>
        <TopBar navigation={navigation} showOrigin={false} customViewStyle={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 2,
          paddingHorizontal: 10,
          minHeight: 50,
          width:'100%',

        }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            
            style={{
              padding:5,
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Icon name="arrow-back" size={25} color="#fff" />
          </TouchableOpacity>
          <Text allowFontScaling={false}
            style={{
              fontFamily: 'Inter-Bold',
              fontSize: 20,
              color: 'white',
              textAlign: 'center',
            }}>
            Feed
          </Text>
          <View style={{
            marginLeft:'auto',
          }}>
            <TouchableOpacity onPress={() => {
              setShowSearchView(true);
            }
            }>
              <Icon name="search" size={30} color="#fff" />

            </TouchableOpacity>

          </View>
        </TopBar>

        <SearchViewModal onClose={() => setShowSearchView(false)} visible={showSearchView} />

        {gtoken ? (
          <>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={feeds_data.isLoading}
                  onRefresh={() => {
                    feeds_data.refetch();
                    likes_data.refetch();
                  }}
                />
              }
              data={feeds}
              renderItem={({item}) => <PostItem item={item} />}
              keyExtractor={item => item.id}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              initialNumToRender={5}
            />
          </>
        ) : (
          <GoogleLoginView />
        )}

        <FloatingNavigionBottomBar
          navigation={navigation}
          screen="news"
          show={showNavibar}
        />
      </ImageBackground>
    </View>
  );
};

export default Feed;
