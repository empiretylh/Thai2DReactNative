import axios from 'axios';
axios.defaults.baseURL = 'http://10.0.1.225:8000/'
// axios.defaults.baseURL = 'http://192.168.43.113:8000'


export const getTwoDDaliy = () => {
    return axios.get('https://api.thaistock2d.com/live')

}


export const getThreeDhistory = ()=>{
    return axios.get('https://api.2dboss.com/api/v2/v1/2dstock/threed-result')
}

export const getFeeds = ()=>{
    return axios.get('/api/feeds/')
}


export const onLike = (data)=>{
    return axios.post('/api/like/',data)
}

export const getLike = (data)=>{
    return axios.get('/api/like/',data)
}

export const getSearch = ({queryKey})=>{
    const [_,searchtext] = queryKey;
    return axios.get('/api/search/?search='+searchtext);
}
export const register = (data)=>{
    axios.defaults.headers.common = {};
    return axios.post('/auth/register/',data)
}

export const getUsers = ()=>{
    return axios.get('/api/profile/')
}