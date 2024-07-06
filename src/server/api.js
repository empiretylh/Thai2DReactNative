import axios from 'axios';

export const getTwoDDaliy = () => {
    return axios.get('https://api.thaistock2d.com/live')

}


export const getThreeDhistory = ()=>{
    return axios.get('https://api.2dboss.com/api/v2/v1/2dstock/threed-result')
}