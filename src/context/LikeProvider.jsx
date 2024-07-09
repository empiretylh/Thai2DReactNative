import React from 'react';
import {useQuery} from 'react-query';
import {getLike} from '../server/api';
import { useUser } from './UserProvider';
const LikeContext = React.createContext();

export const LikeProvider = ({children}) => {
  const [like, setLike] = React.useState(false);

  const {users } = useUser();

  

  const likes_data = useQuery('likes', getLike);

  React.useEffect(() => {
    likes_data?.refetch();
  }, []);

  const likes = React.useMemo(() => {
    return likes_data?.data?.data;
  }, [likes_data]);

  
  const onLike = () => {
    setLike(prev => !prev);
  };

  const RefetchLikes = () => {
    likes_data.refetch();
  }

//   return only true or false
  const isUserLiked = (post_id) => {
    let userid = users?.id;
    let userLiked = likes?.filter((like) => like.post == post_id && like.user == userid);

    return userLiked?.length > 0;

  }



  const LikeCountbyPostId = (post_id) => {

    return likes?.filter((like) => like.post == post_id).length;
  }

  return (
    <LikeContext.Provider value={{likes_data, like, onLike, likes, RefetchLikes, LikeCountbyPostId, isUserLiked}}>
      {children}
    </LikeContext.Provider>
  );
};


export  const useLike = () => {
  const context = React.useContext(LikeContext);
  if (context === undefined) {
    throw new Error('useLike must be used within a LikeProvider');
  }
  return context;
}
