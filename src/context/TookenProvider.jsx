import { firebase } from '@react-native-firebase/auth';
import axios from 'axios';
import React, {useContext, createContext} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
const TokenContext = createContext();

export const TokenProvider = ({children}) => {
    const [gtoken, setGToken] = React.useState(null);
    const [token, setToken] = React.useState(null);

    React.useEffect(() => {
        EncryptedStorage.getItem('gtoken').then((value) => {
            setGToken(value);
        });

        EncryptedStorage.getItem('token').then((value)=>{
            console.log("Token Value " , value)
            setToken(value);
            if(value) axios.defaults.headers.common['Authorization'] = `Token ${value}`   
        })
    }, []);

    const onSetGToken = (value)=>{
        setGToken(value)
        EncryptedStorage.setItem('gtoken', value);

    }

    const onSetToken = (value)=>{
        setToken(value);
        EncryptedStorage.setItem('token',value);
        axios.defaults.headers.common['Authorization'] = `Token ${value}`
    }

    const onLogout = ()=>{
        setToken(null);
        EncryptedStorage.removeItem('token')
        axios.defaults.headers.common['Authorization'] = null;
        firebase.auth().signOut();
    }

    return (
        <TokenContext.Provider value={{gtoken, setGToken, token, setToken, onSetGToken, onSetToken, onLogout}}>
            {children}
        </TokenContext.Provider>
    );

    }

export const useToken =()=> useContext(TokenContext);