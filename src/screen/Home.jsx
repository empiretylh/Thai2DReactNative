import React, {useEffect, useMemo} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TopBar from './components/TopBar';
import FloatingNavigionBottomBar from './components/FloatingNavigationBottomBar';
import {useQuery} from 'react-query';
import {getLiveTwoDServerUpdate, getTwoDDaliy} from '../server/api';
import {IMAGE} from '../config/image';
import {COLOR} from '../config/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { useLoadData } from '../context/LoadDataProvider';

const NumberDisplaySet = ({number = 0}) => {
  const numberString = number.toString();
  const mainPart = numberString.slice(0, -1); // All except last character
  const lastDigit = numberString.slice(-1); // Last character

  return (
    <Text
      style={{
        fontFamily: 'arial',
        letterSpacing: 0.5,
        fontSize: 18,
        color: 'white',
      }}>
      <Text>Set: </Text>
      <Text style={{color: 'black'}}>{mainPart}</Text>
      <Text style={{color: '#f21b13', fontSize: 20, fontWeight: 'bold'}}>
        {lastDigit}
      </Text>
    </Text>
  );
};

const NumberDisplayVal = ({number = 0}) => {
  const numberString = number.toString();
  const firstindex = numberString.lastIndexOf('.');
  const selectPart = numberString.slice(firstindex - 1, firstindex);
  const firstPart = numberString.slice(0, firstindex - 1);
  const thridPart = numberString.slice(firstindex, numberString.length);

  console.log(firstindex);
  console.log(selectPart);

  return (
    <Text
      style={{
        fontFamily: 'arial',
        fontSize: 18,
        color: 'white',
      }}>
      <Text>Value : </Text>
      <Text style={{color: '#000'}}>{firstPart}</Text>
      <Text style={{color: '#f21b13', fontWeight: 'bold'}}>{selectPart}</Text>
      <Text style={{color: '#000'}}>{thridPart} </Text>
    </Text>
  );
};
const TwoDResultView = ({result = []}) => {
  const twelevePm =
    result && result?.find(item => item.open_time == '12:01:00');
  const fourPm = result && result?.find(item => item.open_time == '16:30:00');
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: COLOR.secondaryColor,
          marginTop: 10,
          borderRadius: 15,
        }}>
        <View
          style={{
            padding: 5,
            padding: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'column', gap: 2}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Icon name="partly-sunny" size={30} color={COLOR.fithColor} />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: COLOR.fithColor,
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                }}>
                12:01 PM
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <NumberDisplaySet number={twelevePm?.set} />
              <NumberDisplayVal number={twelevePm?.value} />
            </View>
          </View>
          <Text
            style={{
              fontSize: 50,
              fontWeight: 'bold',
              color: COLOR.fithColor,
              letterSpacing: 2,
            }}>
            {twelevePm?.twod}
          </Text>
        </View>
        <View
          style={{backgroundColor: COLOR.fithColor, height: 1, width: '100%'}}
        />
        <View
          style={{
            padding: 5,
            padding: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'column', gap: 2}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Icon name="moon" size={30} color={COLOR.fithColor} />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: COLOR.fithColor,
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                }}>
                4:30 PM
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <NumberDisplaySet number={fourPm?.set} />
              <NumberDisplayVal number={fourPm?.value} />
            </View>
          </View>
          <Text
            style={{
              fontSize: 50,
              fontWeight: 'bold',
              color: COLOR.fithColor,
              letterSpacing: 2,
            }}>
            {fourPm?.twod}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ThreeDResultView = ({result}) => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: COLOR.secondaryColor,
          marginTop: 10,
          borderRadius: 15,
          padding: 10,
        }}>
        <View style={{flexDirection: 'column', gap: 2}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <View style={{flex: 1}}></View>

            <Text
              style={{
                fontSize: 18,
                marginLeft: 'auto',
                color: COLOR.fithColor,
                flex: 1,
                textAlign: 'center',
                color: 'yellow',
              }}>
              MODERN
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: COLOR.fithColor,
                flex: 1,
                textAlign: 'center',
                color: 'yellow',
              }}>
              INTERNET
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
              }}>
              <Icon name="sunny" size={25} color={COLOR.fithColor} />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: COLOR.fithColor,
                }}>
                9:30 AM
              </Text>
            </View>

            <Text
              style={{
                fontSize: 20,
                marginLeft: 'auto',
                textAlign: 'center',
                fontWeight: 'bold',
                color: COLOR.fithColor,
                flex: 1,
              }}>
              300
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: COLOR.fithColor,
                textAlign: 'center',
                fontWeight: 'bold',
                flex: 1,
              }}>
              200
            </Text>
          </View>
          <View
            style={{
              backgroundColor: COLOR.fithColor,
              height: 1,
              width: '100%',
              marginVertical: 10,
            }}
          />

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
              }}>
              <Icon name="sunny" size={25} color={COLOR.fithColor} />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: COLOR.fithColor,
                }}>
                2:00 PM
              </Text>
            </View>

            <Text
              style={{
                fontSize: 20,
                marginLeft: 'auto',
                textAlign: 'center',
                fontWeight: 'bold',
                color: COLOR.fithColor,
                flex: 1,
              }}>
              400
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: COLOR.fithColor,
                textAlign: 'center',
                fontWeight: 'bold',
                flex: 1,
              }}>
              800
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Home = ({navigation}) => {
  const {twodData} = useLoadData();
  const serverupdatedTwoD = useQuery('updatedTwoD', getLiveTwoDServerUpdate);

  const SUData = useMemo(() => {
    if (serverupdatedTwoD?.data) {
      return serverupdatedTwoD?.data?.data;
    }
    return null;
  }, [serverupdatedTwoD?.data]);

  useEffect(() => {
    twodData?.refetch();
  }, []);

  const Data = useMemo(() => {
    if (twodData?.data) {
      console.log(twodData?.data?.data);
      return twodData?.data?.data;
    }
    return null;
  }, [twodData?.data]);

  const onRefresh = () => {
    twodData.refetch();
    serverupdatedTwoD.refetch();
  };

  const showTwodNumber = useMemo(() => {

    // compare updated time with current time and show the number
    let DataTwoDTime = new Date(Data?.live?.time);
    let SUDataTime = new Date(SUData?.update_time);

      if (DataTwoDTime < SUDataTime) {
      return SUData?.number;
    } else {
      return Data?.live?.twod;

    }
  }, [Data?.live?.twod, SUData?.number]);


  const showTwodTime = useMemo(() => {
    let DataTwoDTime = new Date(Data?.live?.time);
    let SUDataTime = new Date(SUData?.update_time);
    if (DataTwoDTime < SUDataTime) {
      return SUData?.update_time;
    } else {
      return Data?.live?.time
    }
  }, [Data?.live?.time, SUData?.time]);

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
        <TopBar navigation={navigation} />

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={twodData.isFetching}
              onRefresh={onRefresh}
            />
          }
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: 'black',
            marginTop: -15,
          }}>
          {twodData.isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Text
              style={{
                color: COLOR.primaryColor,
                fontWeight: 'bold',
                fontSize: 170,
                fontFamily: 'arial',
                textShadowColor: 'rgba(0, 0, 0, 0.5)',
                textShadowOffset: {width: -1, height: 4},
                textShadowRadius: 2,
              }}>
              {showTwodNumber}
            </Text>
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}>
            <Icon name="time-outline" size={20} />
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              Updated At {new Date(showTwodTime).toLocaleString()}
            </Text>
          </View>
        </ScrollView>

        <ScrollView style={{marginBottom: 80}}>
          {Data?.result && (
            <>
              <TwoDResultView result={Data?.result || [{}]} />
              <ThreeDResultView result={Data?.result || [{}]} />
            </>
          )}
        </ScrollView>

        <FloatingNavigionBottomBar navigation={navigation} screen="home" />
      </ImageBackground>
    </View>
  );
};

export default Home;
