import React, {useEffect, useMemo} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import TopBar from '../components/TopBar';
import Icon from 'react-native-vector-icons/Ionicons';
import EncryptedStorage from 'react-native-encrypted-storage';
import {COLOR} from '../../config/theme';
import {useQuery} from 'react-query';
import {getSearch} from '../../server/api';
import {PostItem} from './Post';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


export const SearchViewModal = ({visible, onClose}) => {
  const [searchtext, setSearchText] = React.useState('');
  const [recentSearch, setRecentSearch] = React.useState([]);
  const searchRef = React.useRef(null);

  const [showFirstRecent, setShowFirstRecent] = React.useState(true);

  const search_data = useQuery(['search', searchtext], getSearch, {
    enabled: false,
  });

  const feeds = useMemo(() => {
    return search_data?.data?.data;
  }, [search_data]);

  const getRecentSearch = async () => {
    const recentSearch = await EncryptedStorage.getItem('recentSearch');
    if (recentSearch) {
      setRecentSearch(JSON.parse(recentSearch));
    }
  };

  const addRecentSearch = async () => {
    const recentSearch = await EncryptedStorage.getItem('recentSearch');
    if (recentSearch) {
      const recentSearchArray = JSON.parse(recentSearch);
      recentSearchArray.push(searchtext);
      await EncryptedStorage.setItem(
        'recentSearch',
        JSON.stringify(recentSearchArray),
      );
    } else {
      await EncryptedStorage.setItem(
        'recentSearch',
        JSON.stringify([searchtext]),
      );
    }
  };

  const deleteRecentSearch = async str => {
    const recentSearch = await EncryptedStorage.getItem('recentSearch');
    if (recentSearch) {
      const recentSearchArray = JSON.parse(recentSearch);
      const newRecentSearchArray = recentSearchArray.filter(
        item => item !== str,
      );
      await EncryptedStorage.setItem(
        'recentSearch',
        JSON.stringify(newRecentSearchArray),
      );

      setRecentSearch(newRecentSearchArray);
    }
  };

  const onSearch = () => {
    search_data.refetch();
    setShowFirstRecent(false);
  };

  useEffect(() => {
    if (visible) {
      searchRef.current.focus();
      getRecentSearch();
      setShowFirstRecent(true);
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <TopBar
          showOrigin={false}
          customViewStyle={{
            flexDirection: 'row',
            paddingVertical: 5,
          }}>
          <TouchableOpacity
            onPress={() => {
              onClose();
            }}
            style={{
              padding: 5,
              alignItems: 'center',
            }}>
            <Icon name="arrow-back" size={25} color="#fff" />
          </TouchableOpacity>
          <TextInput
            style={{
              flex: 1,
              backgroundColor: 'white',
              color: 'black',
              fontFamily: 'Inter-Bold',
              padding: 5,
              borderRadius: 5,
            }}
            autoFocus={true}
            fous
            ref={searchRef}
            value={searchtext}
            onChangeText={text => {
              setSearchText(text);
              setShowFirstRecent(true);
            }}
            placeholder="Search"
          />
          <TouchableOpacity
            onPress={() => {
              if (searchtext === '') return;

              addRecentSearch();
              onSearch();
            }}
            style={{
              padding: 5,
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Icon name="search" size={25} color="#fff" />
          </TouchableOpacity>
        </TopBar>
        {showFirstRecent ? (
          <FlatList
            data={recentSearch}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: COLOR.fouthColor,
                  gap: 10,
                }}
                onPress={() => {
                  setSearchText(item);
                  onSearch();
                }}>
                <Icon name="time-outline" size={25} color="#000" />
                <Text allowFontScaling={false}
                  style={{
                    color: 'black',
                    fontSize: wp('4%'),
                  }}>
                  {item}
                </Text>
                <TouchableOpacity
                  style={{
                    marginLeft: 'auto',
                  }}
                  onPress={() => {
                    deleteRecentSearch(item);
                  }}>
                  <Icon name="trash-outline" size={25} color="red" />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        ) : (
          <>
            {search_data.isFetching && (
              <ActivityIndicator size="large" color={COLOR.primaryColor} />
            )}
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={search_data.isFetching}
                  onRefresh={() => {
                    search_data.refetch();
                  }}
                />
              }
              data={feeds}
              renderItem={({item}) => <PostItem item={item} />}
              keyExtractor={item => item.id}
              // onScroll={handleScroll}
              scrollEventThrottle={16}
              initialNumToRender={5}
            />
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'black',
    marginTop: 5,
  },
  showMore: {
    color: 'blue',
    marginTop: 5,
  },
});
