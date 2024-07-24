import axios from 'axios';
// axios.defaults.baseURL = 'http://10.0.1.225:8000/'
axios.defaults.baseURL = 'https://thaimyanmar2d.pythonanywhere.com';
// axios.defaults.baseURL = 'http://192.168.43.181:8000/'
// axios.defaults.baseURL = 'http://192.168.43.113:8000/';
// http://192.168.43.113:8000/

export const getTwoDDaliy = () => {
  return axios.get('https://api.thaistock2d.com/live');
};

export const getThreeDhistory = () => {
  return axios.get('https://api.2dboss.com/api/v2/v1/2dstock/threed-result');
};

export const getTwoDHistory = () => {
  // last 10 days
  return axios.get('https://api.thaistock2d.com/2d_result');
};

export const getTwoDHistoryByDate = date => {
  // last 10 days
  return axios.get('https://api.thaistock2d.com/history?date=' + date);
};

export const getLiveTwoDServerUpdate = () => {
  return axios.get('/api/livetwod/');
};
export const getFeeds = () => {
  return axios.get('/api/feeds/');
};

export const onLike = data => {
  return axios.post('/api/like/', data);
};

export const getLike = data => {
  return axios.get('/api/like/', data);
};

export const getSearch = ({queryKey}) => {
  const [_, searchtext] = queryKey;
  return axios.get('/api/search/?search=' + searchtext);
};
export const register = data => {
  axios.defaults.headers.common = {};
  return axios.post('/auth/register/', data);
};

export const getUsers = () => {
  return axios.get('/api/profile/');
};

export const getEtsdata = data => {
  return axios.get('/api/gift/ets/');
};

export const getGiftImage = ({queryKey}) => {
  const [_, type] = queryKey;
  return axios.get('/api/gift/giftimage/?type=' + type);
};

export const getAdImages = ({queryKey}) => {
  return axios.get('/api/gift/adimages/');
};

export const getModernInternetData = () => {
  return axios.get('https://luke.2dboss.com/api/luke/twod-result-live');
};

export const postFCMToken = data => {
  console.log('Device tokden', data);
  return axios.post('/api/devicetoken/', data);
};

export const getModernInternetByAdmin = data => {
  return axios.get('api/moderninternet/', data);
};
