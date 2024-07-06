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
            setToken(value);
        })
    }, []);

    const onSetGToken = (value)=>{
        EncryptedStorage.setItem('gtoken', value);

    }

    const onSetToken = (value)=>{
        EncryptedStorage.setItem('token',value);
    }

    return (
        <TokenContext.Provider value={{gtoken, setGToken, token, setToken, onSetGToken, onSetToken}}>
            {children}
        </TokenContext.Provider>
    );

    }

export const useToken =()=> useContext(TokenContext);