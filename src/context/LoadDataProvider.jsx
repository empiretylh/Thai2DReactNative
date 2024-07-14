import React from 'react';
import {useQuery} from 'react-query';
import {getLike, getModernInternetData, getThreeDhistory, getTwoDDaliy, getTwoDHistory} from '../server/api';
import { useUser } from './UserProvider';
import SplashScreen from '../screen/components/SplashScreen';
const LoadDataContext = React.createContext();

export const LoadDataProvider = ({children}) => {
  const twodData = useQuery('twod', getTwoDDaliy);
  const twodDataHistory = useQuery('twodhistory', getTwoDHistory);
  const threedDataHistory = useQuery('threed', getThreeDhistory);
  const modernData = useQuery('moderninternet', getModernInternetData)

  if(twodData?.isLoading || twodDataHistory?.isLoading || threedDataHistory?.isLoading|| modernData.isLoading){
    return <SplashScreen/>
  }


  
    
  return (

    <LoadDataContext.Provider value={{twodData, twodDataHistory, threedDataHistory, modernData}}>
      {children}
    </LoadDataContext.Provider>
  );
};


export const useLoadData = () => {
  const context = React.useContext(LoadDataContext);
  if (context === undefined) {
    throw new Error('useLike must be used within a LikeProvider');
  }
  return context;
}
